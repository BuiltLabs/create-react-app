'use strict';

const fs = require('fs');
const path = require('path');
const glob = require('glob');
const chalk = require('chalk');
const DtsCreator = require('typed-css-modules');
const paths = require('./paths');
const libName = '[Typed-Css-Modules]';

class TypedCssModulesPlugin {
    constructor(options) {
        this.options = options;
        this.scssFilesPattern = path.join(paths.appSrc, '**/*.scss');

        // Avoid rewriting scss type definitions if there is no change.
        // This hack is used to avoid unnecessary computations.
        // https://github.com/webpack/watchpack/issues/25
        this.cache = new Map(); // map of file path to content' hash code
    }

    build(files, options) {
        return files
            .filter(file => {
                if (this.options.useCache === false || !this.cache.has(file)) {
                    return true;
                } else {
                    console.log(`${libName}: Skipped ${file}, using cache`);
                    return false;
                }
            })
            .reduce((acc, file) => {
                return new DtsCreator(options)
                    .create(file, null, false)
                    .then(content => {
                        console.log(`${libName}: Wrote ${content.outputFilePath}`);
                        this.cache.set(file, content.formatted);
                        return content.writeFile();
                    })
                    .then(content => {
                        return acc.then(array => array.concat(content.outputFilePath));
                    })
                    .catch(reason => {
                        Promise.reject(chalk.red(`${libName}: Error ${reason}`));
                    });
            }, Promise.resolve([]));
    }

    apply(compiler) {
        /**
         * While compiler.run() starts when executing `build` script, we need to
         * generate type definitions for all scss files.
         */
        compiler.plugin('before-run', (compilation, callback) => {
            glob(this.scssFilesPattern, null, (error, files) => {
                if (error) {
                    callback(`${libName}: Failed to search scss glob files: ${error}`);
                } else if (files && files.length > 0) {
                    const options = Object.assign({}, this.options, {
                        useCache: false
                    });
                    this.build(files, options).then(() => {
                        console.info('Completed creating scss module type definitions');
                        callback();
                    });
                } else {
                    console.info(`${libName}: No scss module type definition file is generated`);
                    callback();
                }
            });
        });

        /**
         * Before starting computation after watch, we generate the type definition
         * only for those SCSS files which haven't been cached, where it might be a
         * newly created file or had been invalidated.
         */
        compiler.plugin('watch-run', (compilation, callback) => {
            glob(this.scssFilesPattern, null, (error, files) => {
                if (error) {
                    callback(`${libName}: Failed to search scss glob files: ${error}`);
                } else if (files && files.length > 0) {
                    this.build(files, this.options).then(files => {
                        console.info('Completed creating scss module type definitions');

                        // As the generated .scss.d.ts files are required while compiling TS,
                        // but they have been ignored by `WatchIgnorePlugin`. As a hacky
                        // workaround to ensure they are still picked up by ts-loader's
                        // caching mechanism.
                        // https://github.com/Jimdo/typings-for-css-modules-loader/issues/48
                        files.forEach(filePath => {
                            compiler.fileTimestamps[filePath] = fs.statSync(filePath).mtime;
                        });

                        callback();
                    });
                } else {
                    console.info(`${libName}: No scss module type definition file is generated`);
                    callback();
                }
            });
        });

        /**
         * After invalidating a watch compile, the corresponding cache should also
         * be invalidated. Note that we by pass checking of whether the invalidated
         * file has CSS extension as its unnecessary.
         */
        compiler.plugin('invalid', fileName => {
            // Invalidate cache
            this.cache.delete(fileName);
        });
    }
}

module.exports = TypedCssModulesPlugin;
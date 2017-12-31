import * as React from 'react';

interface BundleProps {
    load: any;
    children?: any;
}

interface BundleState {
    // short for "module" but that's a keyword in js, so "mod" it is.
    mod?: any;
}

class Bundle extends React.Component<BundleProps, BundleState> {
    constructor(props: BundleProps) {
        super(props);
        this.state = {
            mod: null
        };
    }

    componentWillMount() {
        this.load(this.props);
    }

    componentWillReceiveProps(nextProps: BundleProps) {
        if (nextProps.load !== this.props.load) {
            this.load(nextProps);
        }
    }

    load(props: BundleProps) {
        this.setState({
            mod: null
        });

        props.load().then((mod: any) => {
            this.setState({
                // handle both es imports and cjs
                mod: mod.default ? mod.default : mod
            });
        });
    }

    render() {
        return this.state.mod ? this.props.children(this.state.mod) : null;
    }
}

export default Bundle;

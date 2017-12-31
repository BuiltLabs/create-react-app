import * as React from 'react';
import { connect } from 'react-redux';

import { fetchGithubRepos } from '../../redux/github';
import * as styles from './GitHub.scss';

interface GitHubProps {
    fetchGithubRepos: any;
    repos: any[];
}

interface GitHubState {
    userName: string;
}

export class GitHub extends React.Component<GitHubProps, GitHubState> {
    constructor(props: GitHubProps) {
        super(props);
        this.state = {
            userName: ''
        };
        this.onChange = this.onChange.bind(this);
    }

    onChange(ev: React.SyntheticEvent<HTMLInputElement>) {
        let value = ev.currentTarget.value,
            userName = this.state.userName;

        if (value !== userName) {
            this.setState({ userName: value });
            this.props.fetchGithubRepos(value);
        }
    }

    render() {
        const { repos } = this.props;

        return (
            <React.Fragment>
                <h1>Check GitHub</h1>
                User: <input onChange={ this.onChange } value={ this.state.userName } />
                {
                    repos.length > 0 && repos.map(repo => {
                        return (
                            <div className={ styles.GitHub } key={repo.id}>
                                <h3>{ repo.name }</h3>
                                <a target="_blank" href={repo.html_url}>{repo.full_name}</a><br />
                                <p>{ !!repo.description ? repo.description : '--' }</p>
                            </div>
                        );
                    })
                }
            </React.Fragment>
        );
    }
}

export default connect(
    mapStateToProps,
    { fetchGithubRepos }
)(GitHub);

function mapStateToProps(store: any) {
    return {
        repos: store.github.repos
    };
}

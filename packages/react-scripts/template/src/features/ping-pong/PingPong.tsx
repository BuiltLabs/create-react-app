import * as React from 'react';
import { connect } from 'react-redux';
import { ping } from '../../redux/ping-pong';

interface HomeProps {
    isPinging: boolean;
    ping: any;
}

export const PingPong = (props: HomeProps) => {
    return (
        <React.Fragment>
            <h1>Redux Ping-Pong</h1>
            <h4>{ (props.isPinging) ? 'PONG' : 'PING' }</h4>
            <button onClick={ () => props.ping() }>Start PING</button>
        </React.Fragment>
    );
};

export default connect(
    mapApplicationStateToProps,
    { ping } // Map Redux action creators to props list
)(PingPong);

function mapApplicationStateToProps(store: any) {
    return {
        isPinging: store.ping.isPinging
    };
}

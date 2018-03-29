/* eslint-disable import/no-named-as-default */
import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, Switch, Route, Redirect } from 'react-router-dom';
import Home from './home';
import Dashboard from './dashboard';

class App extends React.Component {
    static propTypes = {
        children: PropTypes.element
    };
    constructor(...args) {
        super(...args);
    }
    render() {
        return (
            <div>
                <div>
                    <NavLink exact to="/">Home</NavLink>
                    {`|`}
                    <NavLink to="/dashboard">dashboard</NavLink>
                </div>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/dashboard" component={Dashboard} />
                    <Redirect to="/" />
                </Switch>
            </div>
        );
    }
}

export default App;

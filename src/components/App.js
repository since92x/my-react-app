/* eslint-disable import/no-named-as-default */
import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, Switch, Route, Redirect } from 'react-router-dom';
import Home from './home';
import Dashboard from './dashboard';
import { Docs } from './docs';
import { About } from './about';

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
                    {`|`}
                    <NavLink to="/docs">docs</NavLink>
                    {`|`}
                    <NavLink to="/about">about</NavLink>
                </div>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/dashboard" component={Dashboard} />
                    <Route path="/docs" component={Docs}/>
                    <Route path="/about" component={About} />
                    <Redirect to="/" />
                </Switch>
            </div>
        );
    }
}

export default App;

import React from 'react';
import ReactDOM from 'react-dom';
import {
    Route,
    NavLink,
    Link,
    BrowserRouter as Router,
    Switch
} from 'react-router-dom'
import './index.css';
import App from './App';
import Login from './Login/Login';
import Scenario from './Scenario/Scenario';
import NotFound from './NotFound/NotFound';
import * as serviceWorker from './serviceWorker';

const routing = (
    <Router>
        <div>
            <ul>
                <li>
                    <NavLink activeClassName="active" to="/">Home</NavLink>
                </li>
                <li>
                    <NavLink activeClassName="active" to="/login">Login</NavLink>
                </li>
                <li>
                    <NavLink activeClassName="active" to="/scenario">Scenario</NavLink>
                </li>
            </ul>
            <Switch>
                <Route exact path="/" component={App} />
                <Route path="/login" component={Login} />
                <Route path="/scenario" component={Scenario} />
                <Route component={NotFound} />
            </Switch>
        </div>
    </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

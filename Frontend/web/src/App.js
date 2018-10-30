import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import Layout from './components/Layout';
import appconfig from './config/app.config.json';

class App extends Component {
    render() {
        return (
            <Switch>
                <Route exact path = '/' render = { () => (
                    // proses cek token
                    localStorage.getItem(appconfig.secure_key.token) == null || 
                    localStorage.getItem(appconfig.secure_key.token) === 'SECURE_KEY_TOKEN' ? 
                    (
                        <Route exact path = '/' component = { Login } />
                    ) : 
                    (
                        <Layout />
                    )
                ) } />
                <Layout />
            </Switch>
        )
    }
};

export default App;
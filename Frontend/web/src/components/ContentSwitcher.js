import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Redirect } from 'react-router';
import appconfig from '../config/app.config.json';

// module
import Dashboard from '../components/home/Dashboard';
import Supplier from '../components/supplier/Index';

const ContentSwitcher = () => {
    return (
        <Switch>
            <PrivateRoute path = "/dashboard" component = { Dashboard } />
            <PrivateRoute path = "/supplier" component = { Supplier } />
        </Switch>
    );
};

const PrivateRoute = ({ Component: Component, ...rest }) => (
    <Route
        {...rest}
        render = { props =>
            localStorage.getItem(appconfig.secure_key.token) != null ?
            (
                <Component {...props} />
            ) :
            (
                <Redirect 
                    to = {{ 
                        pathname: "/",
                        state: { from: props.location } 
                    }}
                />
            )
        }
    />
);

export default ContentSwitcher;
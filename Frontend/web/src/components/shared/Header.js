import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import appconfig from '../../config/app.config.json';

export default class Header extends Component {
    constructor(props){
        super(props);
        this.signOut = this.signOut.bind(this);
        this.userData = JSON.parse(localStorage.getItem(appconfig.secure_key.userdata));
        this.UserName = "";
        this.Role = "";

        if(this.userData != null || this.userData != undefined ){
            this.UserName = this.userData.UserName;
            this.Role = this.userData.Role;
        }
    }

    signOut(){
        localStorage.clear();
        //this.props.history.push('/login');
    }

    render(){
        return (
            <header className="main-header">
                <a href="#" className="logo">
                    <span className="logo-mini"><b>su</b>PRO</span>
                    <span className="logo-lg">supplier<b>PRO</b></span>
                </a>
                <nav className="navbar navbar-static-top">
                    <a href="#" className="sidebar-toggle" data-toggle="push-menu" role="button">
                        <span className="sr-only">Toggle navigation</span>
                    </a>
                    <div className="navbar-custom-menu">
                        <ul className="nav navbar-nav">
                            <li className="dropdown user user-menu">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                    <img src={require("../../content/img/avatar.png")} className="user-image" alt="User Image"/>
                                    <span className="hidden-xs">{ this.UserName }</span>
                                </a>
                                <ul className="dropdown-menu">
                                    <li className="user-header">
                                        <img src={require("../../content/img/avatar.png")} className="img-circle" alt="User Image"/>

                                        <p>
                                            { this.UserName } - { this.Role }
                                        </p>
                                    </li>
                                    <li className="user-footer">
                                        <div className="pull-right">
                                            <Link to="/" className="nav-link btn btn-danger btn-flat" onClick={this.signOut}>Sign out</Link>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
        )
    }
}
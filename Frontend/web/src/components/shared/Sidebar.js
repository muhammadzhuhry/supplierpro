import React, {Component} from 'react';

export default class Sidebar extends Component {
    render(){
        return (
            <aside className="main-sidebar">
                <section className="sidebar">
                    <ul className="sidebar-menu" data-widget="tree">
                        <li className="header">MAIN NAVIGATION</li>

                        <li>
                            <a href="/dashboard">
                                <i className="fa fa-bars"></i> <span>Dashboard</span>
                                <span className="pull-right-container">
                                </span>
                            </a>
                        </li>

                        <li>
                            <a href="/supplier">
                                <i className="fa fa-users"></i> <span>Supplier</span>
                                <span className="pull-right-container">
                                </span>
                            </a>
                        </li>

                    </ul>
                </section>
            </aside> 
        )
    }
}

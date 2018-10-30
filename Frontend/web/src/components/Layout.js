import React, { Component } from 'react';
import Header from './shared/Header';
import Sidebar from './shared/Sidebar';
import Footer from './shared/Footer';
import ContentSwitcher from './ContentSwitcher';

class Layout extends Component {
    render() {
        return (
            <body className="hold-transition skin-red fixed sidebar-mini">
                <div>
                    <Header />
                    <Sidebar />
                    <ContentSwitcher />
                    <Footer />
                    <div className="control-sidebar-bg"></div>
                </div>
            </body>
        );
    }
};

export default Layout;
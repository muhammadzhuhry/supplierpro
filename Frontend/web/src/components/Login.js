import React, { Component } from 'react';
import userapi from '../api_handlers/user';
import appconfig from '../config/app.config.json';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formdata: {
                username: '',
                password: '',
            },
            isRequest: false
        };
        this.textChanged = this.textChanged.bind(this);
        this.OnSignIn = this.OnSignIn.bind(this);
    };

    textChanged(e) {
        let tmp = this.state.formdata;
        tmp[e.target.name] = e.target.value;
        this.setState({
            formdata: tmp
        });
    };

    async OnSignIn() {
        this.setState({
            isRequest: true
        });

        console.log(this.state.formdata.username);

        let result = await userapi.login(this.state.formdata.username, this.state.formdata.password);
        
        console.log(result);
        
        if(result.status === 200) {
            console.log('Debug Login');

            localStorage.setItem(appconfig.secure_key.userdata, JSON.stringify(result.message.userdata));
            localStorage.setItem(appconfig.secure_key.token, result.message.token);
            
            console.log("userdata from secure_key : " + localStorage.getItem(appconfig.secure_key.userdata));
            console.log("token from secure_key : " + localStorage.getItem(appconfig.secure_key.token));

            // redirect ke layout atau kondisi default dari percabangan ternary di bagian App.js
            this.props.history.push('/dashboard');
        } else {
            console.log(result.message);
        }

        this.setState({
            isRequest: false
        });
    };

    render() {
        return (
          <div className="login-box">
            <div className="login-logo">
                  SupplierPro<b>APP</b>
            </div>
            <div className="login-box-body">
                  <p className="login-box-msg">Sign in to start your session</p>
                  <form method="post">
                      <div className="form-group has-feedback">
                        <input className="form-control"
                          type="username"
                          name="username"
                          id="username"
                          placeholder="masukkan username"
                          required=""
                          value={this.state.username} 
                          onChange={this.textChanged} />
                        <span className="glyphicon glyphicon-envelope form-control-feedback"></span>
                      </div>
                      <div className="form-group has-feedback">
                        <input 
                          className="form-control"
                          type="password"
                          name="password"
                          id="password"
                          placeholder="masukkan password"
                          required="" 
                          value={this.state.password} 
                          onChange={this.textChanged}
                        />
                        <span className="glyphicon glyphicon-lock form-control-feedback"></span>
                      </div>
                      <div className="row">
                        <div className="col-xs-4">
                          <button disabled={this.state.isRequest} type="button" onClick={this.OnSignIn} className="btn btn-primary btn-block btn-flat">Sign In</button>
                        </div>
                      </div>
                  </form>
            </div>
          </div>
        )
    }
};

export default Login;
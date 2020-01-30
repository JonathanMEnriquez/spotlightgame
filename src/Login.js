import React, { Component } from 'react';
import Firebase, { auth, provider } from './firebase';
import './Login.css';
import GameContext from './GameContext';
import MainButton from './MainButton';

class Login extends Component {
    state = { 
        registerMode: false
    }
    render() { 
        return ( 
            <div className="login-container">
                <h3>{this.state.registerMode ? 'Register' : 'Sign in'}</h3>
                <div className="login">
                    <label>Email: 
                        <input id="login-email" />
                    </label>
                    <label>Password: 
                        <input type="password" id="login-pwd" />
                    </label>
                    <div className="submit">
                        <MainButton actionTitle="Submit" simple={true} clickHandler={this.loginOrRegister.bind(this)} />
                    </div>
                </div>
                <p className="type-link"
                    onClick={() => this.setState({registerMode: !this.state.registerMode})}
                    >{this.state.registerMode ? 'Already Registered?' : 'New User?'}</p>
            </div>
        );
    }

    loginOrRegister() {
        const email = document.getElementById('login-email').textContent;
        const password = document.getElementById('login-pwd').textContent;
        const toRun = this.state.registerMode
            ? auth.createUserWithEmailAndPassword
            : auth.signInWithEmailAndPassword;

        console.log(email, password, toRun);
    }
}

Login.contextType = GameContext;
 
export default Login;
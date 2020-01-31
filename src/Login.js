import React, { Component } from 'react';
import './Login.css';
import GameContext from './GameContext';
import MainButton from './MainButton';
import firebase, { auth } from './firebase';

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
                {/* <p className="type-link"
                    onClick={() => this.setState({registerMode: !this.state.registerMode})}
                    >{this.state.registerMode ? 'Already Registered?' : 'New User?'}</p> */}
            </div>
        );
    }

    loginOrRegister() {
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-pwd').value;
        // const toRun = this.state.registerMode
        //     ? auth.createUserWithEmailAndPassword
        //     : auth.signInWithEmailAndPassword;

        auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
            .then(async () => {
                const res = await auth.signInWithEmailAndPassword(email, password);

                if (res.user) {
                    this.props.setUser(res.user);
                }
            });
    }
}

Login.contextType = GameContext;
 
export default Login;
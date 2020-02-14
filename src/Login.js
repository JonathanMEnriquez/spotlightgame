import React from 'react';
import './Login.css';
import MainButton from './MainButton';
import firebase, { auth } from './firebase';

const Login = (props) => {
    const { setUser } = props;

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            login();
        }
    }

    const login = () => {
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-pwd').value;

        auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
            .then(async () => {
                const res = await auth.signInWithEmailAndPassword(email, password);

                if (res.user) {
                    setUser(res.user);
                } else {
                    document.getElementById('login-pwd').value = '';
                }
            })
            .fail(err => console.error('Failed to login - ', err));
    }

    return ( 
        <div className="login-container">
            <h3>Sign in</h3>
            <div className="login">
                <label>Email: 
                    <input id="login-email" />
                </label>
                <label>Password: 
                    <input type="password" id="login-pwd" onKeyUp={handleKeyPress.bind(this)} />
                </label>
                <div className="submit">
                    <MainButton actionTitle="Submit" simple={true} clickHandler={login.bind(this)} />
                </div>
            </div>
        </div>
    );
}
 
export default Login;
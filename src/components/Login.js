import React from 'react';
import { GoogleOutlined, FacebookOutlined } from '@ant-design/icons';
import "firebase/app";

import { auth } from '../firebase';
import firebase from 'firebase/app';

const Login = () => {
    return (
        <div id='login-page'>
            <div id='login-card'>
                <h2>Welcome to Let's chat!</h2>
                <div className='login-button google'
                  onClick={() => auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())}>
                    <GoogleOutlined/> Sign in with your Google account

                </div>
                <div className='login-button facebook'
                 onClick={() => auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider())}>
                    <FacebookOutlined/> Sign in with your Facebook account 

                </div>

            </div>

        </div>
    )

}

export default Login;
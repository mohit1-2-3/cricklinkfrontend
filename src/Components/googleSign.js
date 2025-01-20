import React, { useContext, useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { ProfileContext } from './SignUp';

function GoogleSign() {
    const { setProfile } = useContext(ProfileContext);

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => {
            console.log(codeResponse);
            Userdata(codeResponse);
        },
        onError: (error) => console.log('Login Failed:', error),
    });

    const Userdata = (userData) => {
        if (userData) {
            axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${userData.access_token}`, {
                headers: {
                    Authorization: `Bearer ${userData.access_token}`,
                    Accept: 'application/json'
                }
            })
                .then((res) => {
                    setProfile(res.data);
                    console.log(res.data);
                })
                .catch((err) => console.log(err));
        }
    };

    return (
        <button id='rp' className='btn btn-primary btn-floating mx-1' onClick={login}>
            <i className="fa-brands fa-google" style={{ backgroundColor: 'transparent' }} ></i>
        </button>
    );
}

export default GoogleSign;
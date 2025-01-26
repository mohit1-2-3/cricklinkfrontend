// import React, { useContext, useState } from 'react';
// import { useGoogleLogin } from '@react-oauth/google';
// import axios from 'axios';
// import { ProfileContext } from './SignUp';

// function GoogleSign() {
//     const { setProfile } = useContext(ProfileContext);

//     const login = useGoogleLogin({
//         onSuccess: (codeResponse) => {
//             console.log(codeResponse);
//             Userdata(codeResponse);
//         },
//         onError: (error) => console.log('Login Failed:', error),
//     });

//     const Userdata = (userData) => {
//         if (userData) {
//             axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${userData.access_token}`, {
//                 headers: {
//                     Authorization: `Bearer ${userData.access_token}`,
//                     Accept: 'application/json'
//                 }
//             })
//                 .then((res) => {
//                     setProfile(res.data);
//                     console.log(res.data);
//                 })
//                 .catch((err) => console.log(err));
//         }
//     };

//     return (
//         <button id='rp' className='btn btn-primary btn-floating mx-1' onClick={login}>
//             <i className="fa-brands fa-google" style={{ backgroundColor: 'transparent' }} ></i>
//         </button>
//     );
// }

// export default GoogleSign;

// Google.js

import { GoogleLogin } from "@react-oauth/google"
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import url from "../URL/url.js";


function GoogleDetails() {

  const details = async(data)=>{
    console.log("----------ram");
      const {email,name,sub} = data
      console.log("------------jai");
      const loginInfo = {
        email,password:sub
      }
      console.log("------------------shree");
      console.log(loginInfo);
      const response = await axios.post(url.player.signin, loginInfo)
      console.log(response.data)
  }

  return (
    <GoogleLogin
      onSuccess={(response) => {
        const data = jwtDecode(response.credential)
        console.log("????????????????????????",data);
        details(data)
        // toast.success("Sign Up Successful");
      }}
      onError={() => {
        console.log("Login fail")
      }} />
  );
}

export default GoogleDetails;



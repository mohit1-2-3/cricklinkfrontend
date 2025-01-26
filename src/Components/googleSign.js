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

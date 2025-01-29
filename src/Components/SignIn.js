
import { useNavigate, Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setUser } from "../redux-config/UserSlice";
import url from "../URL/url.js";
import "../App.css";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = { email, password };
      // console.log('Form Data:', formData);
      const response = await axios.post(url.player.signin, formData);
      console.log("======================================================");
      console.log("Sign In Response:", response.data);
      console.log("======================================================");
      console.log("Sign In Response:", response.data.user.role);
      dispatch(setUser(response.data));

      //dispatch(setUser(response.data));
      toast.success("Sign In Successful");
      setTimeout(() => {
        if (
          response.data.user.role == "player" ||
          response.data.user.role == "captain"
        ) {
          navigate("/PlayerMyProfile");
        } else if (response.data.user.role == "organizer") {
          console.log("sign successful");
          navigate("/OrganizerProfile");
        }
      }, 1000);
    } catch (error) {
      console.log("Error during Sign In:", error);
      toast.error("Sign In Failed");
    }
  };

  return (
    <>
      <ToastContainer />
      
      <div className="container-fluid p-5 bg-light" id="container1">
        <div
          className="mx-auto d-flex justify-content-center align-items-center"
          id="mainDiv bg-light"
        >
          <div className="col-md-10 col-lg-8 col-xl-4">
            <img
              //   src="https://images.unsplash.com/photo-1593766827228-8737b4534aa6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGNyaWNrZXR8ZW58MHx8MHx8fDA%3D"
              src="https://plus.unsplash.com/premium_photo-1722351690065-210079a0a82c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y3JpY2tldCUyMHBsYXllcnxlbnwwfHwwfHx8MA%3D%3D"
              style={{height:"450px",width:"450px"}}
              className="img-fluid"
              alt="Sample image"
              id="signImg"
            />
          </div>
          <div className="col-md-6 col-lg-6 col-xl-4 offset-xl-1 mt-6 mb-3 ms-4">
          <form onSubmit={handleSubmit}>
              <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                <p
                  className="lead fw-normal ms-5 me-3"
                  style={{ color: "black" }}
                >
                  Sign In with
                </p>
                <button
                  type="button"
                  className="btn btn-primary btn-floating mx-1"
                >
                  <i
                    className="fa-brands fa-google text-center"
                    style={{ color: "#ffffff",height:"5px",width:"14px" }}
                  ></i>
                </button>
              </div>
              <div className="divider d-flex align-items-center">
                <p
                  className="text-center fw-bold mx-3 mb-0"
                  style={{ color: "black" }}
                >
                  Or
                </p>
              </div>
              <div className="form-outline mb-2">
                <label
                  className="form-label"
                  htmlFor="form3Example3"
                  style={{ color: "black" }}
                >
                  Email address
                </label>
                <input
                  type="email"
                  id="form3Example3"
                  className="form-control form-control-lg"
                  placeholder="Enter a valid email address"
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
              <div className="form-outline mb-2">
                <label
                  className="form-label"
                  htmlFor="form3Example4"
                  style={{ color: "black" }}
                >
                  Password
                </label>
                <input
                  type="password"
                  id="form3Example4"
                  className="form-control form-control-lg"
                  placeholder="Enter password"
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <div className="form-check mb-0">
                  <input
                    className="form-check-input me-2"
                    type="checkbox"
                    value=""
                    id="form2Example3"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="form2Example3"
                    style={{ color: "black" }}
                  >
                    Remember me
                  </label>
                </div>
              </div>
              <Link to="/forgotpassword">Forgot Password?</Link>
              <div className="text-center text-lg-start ps-5 mt-4 pt-2 ms-15">
                <button
                  type="submit"
                  className="btn btn-primary ms-2 btn-sm"
                  style={{
                    border: "2px solid black",
                    borderRadius:"15px",
                    paddingLeft: "2rem",
                    paddingRight: "2rem",
                    height:"40px",
                    width:"110px",
                    
    
                  }}
                >
                  SUBMIT
                </button>
                <p
                  className="small fw-bold mt-2 pt-1 mb-0"
                  style={{ color: "black" }}
                >
                  Don't have an account?{" "}
                  <Link to="/signUp" className="link-danger">
                    Register
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
  <div className="mx-auto text-center text-black mb-3 mb-md-0" style={{ fontSize: '18px' }}>
    Copyright © 2020. All rights reserved.
        </div>
        <div>
        <div className="d-flex justify-content-center align-items-center">
          <Link to="#!" className="text-white me-4">
            <i className="fab fa-facebook-f"></i>
          </Link>
          <Link to="#!" className="text-white me-4">
            <i className="fab fa-twitter"></i>
          </Link>
          <Link to="#!" className="text-white me-4">
            <i className="fab fa-google"></i>
          </Link>
          <Link to="#!" className="text-white">
            <i className="fab fa-linkedin-in"></i>
          </Link>
        </div>
        </div>
        </div>
    </>
  );
}
 ///////////
 <div className="offcanvas-body ps-5">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                {/*  sidebar content here */}
                <li className="nav-item">
                  <HashLink
                    className="nav-link active"
                    aria-current="page"
                    to="/#banner"
                    style={{color:"black",fontSize:"20px"}}
                  >
                    Home
                  </HashLink>
                </li>
                <li className="nav-item">
                  <HashLink className="nav-link" to="/About">
                    About
                  </HashLink>
                </li>
                <li className="nav-item">
                  <HashLink className="nav-link" to="/#playerContainer">
                    Players
                  </HashLink>
                </li>
                <li className="nav-item">
                  <HashLink className="nav-link" to="/UpcomingTournamentsCards">
                    Tournament{" "}
                  </HashLink>
                </li>
                <li className="nav-item">
                  <HashLink className="nav-link" to="/TeamPage">
                    Teams{" "}
                  </HashLink>
                </li>
                <li className="nav-item">
                  <HashLink className="nav-link" to="/ContactUs">
                    Contact Us{" "}
                  </HashLink>
                </li>
              </ul>
            </div>
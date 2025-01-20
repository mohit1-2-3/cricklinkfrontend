import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setUser } from '../redux-config/UserSlice'; 
import url from '../URL/url.js';
import '../App.css';

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const formData = { email, password };
            // console.log('Form Data:', formData);
            const response = await axios.post(url.player.signin, formData);
             console.log("======================================================");
             console.log('Sign In Response:', response.data);
             console.log("======================================================");
             console.log('Sign In Response:', response.data.user.role);
             dispatch(setUser(response.data))


            //dispatch(setUser(response.data));
             toast.success('Sign In Successful');
           setTimeout(() => {
            if(response.data.user.role=="player"){
                navigate('/PlayerMyProfile');
            }
            else if(response.data.user.role=="organizer"){
                      console.log("nothing is here");
                      navigate('/OrganizerProfile');
            }
            
           }, 1000);
        } catch (error) {
            console.log('Error during Sign In:', error);
             toast.error('Sign In Failed');
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="container-fluid p-5" id="container1">
                <div className="mx-auto d-flex justify-content-center align-items-center" id="mainDiv">
                    <div className="col-md-9 col-lg-6 col-xl-5">
                        <img
                            src="https://images.unsplash.com/photo-1593766827228-8737b4534aa6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGNyaWNrZXR8ZW58MHx8MHx8fDA%3D"
                            className="img-fluid"
                            alt="Sample image"
                            id="signImg"
                        />
                    </div>
                    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1 mt-3 mb-3">
                        <form onSubmit={handleSubmit}>
                            <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                                <p className="lead fw-normal ms-5 me-3">Sign In with</p>
                                <button type="button" className="btn btn-primary btn-floating mx-1">
                                    <i className="fa-brands fa-google" style={{ color: "#ffffff" }}></i>
                                </button>
                            </div>
                            <div className="divider d-flex align-items-center">
                                <p className="text-center fw-bold mx-3 mb-0">Or</p>
                            </div>
                            <div className="form-outline mb-2">
                                <label className="form-label" htmlFor="form3Example3">Email address</label>
                                <input
                                    type="email"
                                    id="form3Example3"
                                    className="form-control form-control-lg"
                                    placeholder="Enter a valid email address"
                                    onChange={(event) => setEmail(event.target.value)}
                                />
                            </div>
                            <div className="form-outline mb-2">
                                <label className="form-label" htmlFor="form3Example4">Password</label>
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
                                    <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                                    <label className="form-check-label" htmlFor="form2Example3">Remember me</label>
                                </div>
                            </div>
                            <Link to="/forgotpassword">Forgot Password?</Link>
                            <div className="text-center text-lg-start ps-5 mt-4 pt-2">
                                <button
                                    type="submit"
                                    className="btn btn-primary ms-4 btn-lg"
                                    style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                                >
                                    SUBMIT
                                </button>
                                <p className="small fw-bold mt-2 pt-1 mb-0">
                                    Don't have an account? <Link to="/signUp" className="link-danger">Register</Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
                <div className="text-white mb-3 mb-md-0">
                    Copyright © 2020. All rights reserved.
                </div>
                <div>
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
        </>
    );
}

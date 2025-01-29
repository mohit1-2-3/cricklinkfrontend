
import React, { createContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import GoogleSign from "./googleSign.js";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import url from "../URL/url.js";
import "../App.css";

export const ProfileContext = createContext();

export default function SignUpForm() {
  const [currentPage, setCurrentPage] = useState(1);
  const [profile, setProfile] = useState(null);
  const [categories, setCategories] = useState([]);
  const [subCategory, setSubCategory] = useState([]);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    contact: "",
    role: "",
  });

  useEffect(() => {
    //         axios.get(url?.category?.all)
    // axios.get(url.category?.all)
    //     .then(response => {
    //         setCategories(response.data.data);
    //     })
    //     .catch(error => {
    //         console.log(error);
    //     });
  }, []);

  const fetchSubCategory = (category_id) => {
    axios
      .post(url.subCategory.byCategory, { category_id })
      .then((response) => {
        setSubCategory(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const nextStep = () => setCurrentPage(currentPage + 1);
  const prevStep = () => setCurrentPage(currentPage - 1);

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleAlert = (iconStatus, title) => {
    Swal.fire({
      title,
      text: "SignUp",
      icon: iconStatus,
      timer: 3000,
    });
  };

  // const handleSubmit = async (e) => {
  //     e.preventDefault();

  //     const updatedFormData = profile ?
  //         { ...formData, name: profile.name, email: profile.email, password: profile.password, contactNumber: profile.contactNumber } :
  //         { ...formData, image: 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=740&t=st=1714302356~exp=1714302956~hmac=fd9dff0844f6c6523ff9dff44704f7708e403b18006e19a90d0c407bf9c61a2483' };

  //     try {
  //         console.log('formData', updatedFormData);
  //         const response = await axios.post(url.player.signup, updatedFormData);
  //         console.log(response);
  //         handleAlert('success', 'Successfully signed up');
  //     } catch (error) {
  //         handleAlert('error', 'Signup failed');
  //         console.log(error);
  //     }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedFormData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      contact: formData.contact,
      role: formData.user,
    };

    try {
      console.log("Hellooooooo.......");
      console.log("HRitik>>> data:", updatedFormData);
      const response = await axios.post(url.player.signup, updatedFormData);
      console.log("API Response:", response.data);
      handleAlert("success", "Successfully signed up");

      if (response.data.user.role == "Player") {
        navigate("/PlayerMyProfile");
      } else if (response.data.user.role == "organizer") {
        console.log("sign successful");
        navigate("/OrganizerProfile");
      }
    } catch (error) {
      console.error(
        "API Error:",
        error.response ? error.response.data : error.message
      );
      handleAlert("error", "Signup failed");
    }
  };

  return (
    <>
      <div className="container-fluid p-5 bg-light" id="container1">
        <div className="row justify-content-center align-items-center ">
          <div className="col-lg-8 ">
            <div className="border rounded p-4 ">
              <div className="row justify-content-center align-items-center mb-4 ">
                <div className="col-lg-6 text-center mb-lg-0 mb-3 bg-light ">
                  <img
                    // src="https://img.freepik.com/free-photo/miniature-figure-cricket-player-action-match-thailand-bangladesh_1057-35771.jpg?t=st=1712748729~exp=1712752329~hmac=4ce6f8e5f51c2bda97ddf8bf3e9d6b21cbb396c81af111dc47912dd1fdc1fd54&w=740"

                    src="https://img.freepik.com/premium-photo/group-cricket-players-with-word-trophy-bottom_1109006-90076.jpg?w=740"
                    style={{width:"400px",height:"400px"}}
          
                  className="img-fluid" />
                </div>
                <div className="col-lg-6">
                  <div>
                    {currentPage === 1 && (
                      <div>
                        <div className="d-flex flex-row align-items-center justify-content-center mb-3 ">
                          <p
                            className="lead fw-normal mb-0 me-3"
                            style={{ color: "black" }}
                          >
                            Create Account With
                          </p>

                          <ProfileContext.Provider
                            value={{ profile, setProfile }}
                          >
                            <GoogleSign />
                          </ProfileContext.Provider>
                        </div>
                        <div className="divider d-flex align-items-center">
                          <p
                            className="text-center fw-bold mx-3"
                            style={{ color: "black" }}
                          >
                            Or
                          </p>
                        </div>
                        <div className="form-outline">
                          <label
                            className="form-label"
                            htmlFor="form3Example3"
                            style={{ color: "black" }}
                          >
                            Name
                          </label>
                          <input
                            type="name"
                            placeholder="Enter Your Name"
                            onChange={(e) =>
                              handleChange(e.target.name, e.target.value)
                            }
                            name="name"
                            value={(profile && profile.name) || formData.name}
                            className="form-control form-control-md"
                          />
                        </div>
                        <div className="form-outline">
                          <label
                            className="form-label"
                            htmlFor="form3Example3"
                            style={{ color: "black" }}
                          >
                            Email
                          </label>
                          <input
                            type="email"
                            placeholder="Enter email address"
                            onChange={(e) =>
                              handleChange(e.target.name, e.target.value)
                            }
                            name="email"
                            value={(profile && profile.email) || formData.email}
                            className="form-control form-control-md"
                          />
                        </div>
                        <div className="form-outline">
                          <label
                            className="form-label"
                            htmlFor="form3Example4"
                            style={{ color: "black" }}
                          >
                            Password
                          </label>
                          <input
                            onChange={(e) =>
                              handleChange(e.target.name, e.target.value)
                            }
                            type="password"
                            name="password"
                            value={formData.password}
                            className="form-control form-control-md"
                            placeholder="Enter password"
                          />
                        </div>
                        <div className="form-outline">
                          <label
                            className="form-label"
                            htmlFor="form3Example4"
                            style={{ color: "black" }}
                          >
                            Contact Number
                          </label>
                          <input
                            type="tel"
                            placeholder="Enter contact number"
                            onChange={(e) =>
                              handleChange(e.target.name, e.target.value)
                            }
                            name="contact"
                            value={
                              (profile && profile.contact) || formData.contact
                            }
                            className="form-control form-control-md"
                          />
                        </div>
                        <div className="form-outline">
                          <label
                            className="form-label"
                            htmlFor="form3Example4"
                            style={{ color: "black" }}
                          >
                            User
                          </label>
                          <select
                            className="form-select"
                            name="user"
                            value={formData.user}
                            onChange={(e) =>
                              handleChange(e.target.name, e.target.value)
                            }
                            aria-label="Default select example"
                          >
                            <option style={{ color: "#000000" }} selected>
                              Select Option
                            </option>
                            <option style={{ color: "#000000" }} value="player">
                              Player
                            </option>
                            <option
                              style={{ color: "#000000" }}
                              value="organizer"
                            >
                              Organizer
                            </option>
                            {/* <option style={{ color: '#000000' }} value="captain">Captain</option> */}
                          </select>
                        </div>
                        <button
                          className="btn btn-outline-primary mt-3"
                          onClick={handleSubmit}
                        >
                          Submit
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary"
        style={{ overflow: "auto" }}
      >
        <div
          className="mx-auto text-center text-black mb-3 mb-md-0"
          style={{ fontSize: "18px" }}
        >
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
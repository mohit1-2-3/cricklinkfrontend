import React, { createContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import GoogleSign from './googleSign.js';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import url from '../URL/url.js';
import '../App.css';

export const ProfileContext = createContext();

export default function SignUpForm() {
    const [currentPage, setCurrentPage] = useState(1);
    const [profile, setProfile] = useState(null);
    const [categories, setCategories] = useState([]);
    const [subCategory, setSubCategory] = useState([]);

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        contactNumber: '',
        user: '',
    });

    useEffect(() => {
        axios.get(url.category?.all)
            .then(response => {
                setCategories(response.data.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const fetchSubCategory = (category_id) => {
        axios.post(url.subCategory.byCategory, { category_id })
            .then(response => {
                setSubCategory(response.data.data);
            })
            .catch(error => {
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
            text: 'SignUp',
            icon: iconStatus,
            timer: 3000
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
        contact: formData.contactNumber,
        role: formData.user,
    };

    try {
        console.log('HRitik>>> data:', updatedFormData);
        const response = await axios.post(url.player.signup, updatedFormData);
        console.log('API Response:', response.data);
        handleAlert('success', 'Successfully signed up');
    } catch (error) {
        console.error('API Error:', error.response ? error.response.data : error.message);
        handleAlert('error', 'Signup failed');
    }
};


    return (
        <>
            <div className="container pt-5">
                <div className="row justify-content-center align-items-center">
                    <div className="col-lg-8">
                        <div className="border rounded p-4">
                            <div className="row justify-content-center align-items-center mb-4">
                                <div className="col-lg-6 text-center mb-lg-0 mb-3">
                                    <img src="https://img.freepik.com/free-photo/miniature-figure-cricket-player-action-match-thailand-bangladesh_1057-35771.jpg?t=st=1712748729~exp=1712752329~hmac=4ce6f8e5f51c2bda97ddf8bf3e9d6b21cbb396c81af111dc47912dd1fdc1fd54&w=740"
                                        className="img-fluid" alt="Sample image" />
                                </div>
                                <div className="col-lg-6">
                                    <div>
                                        {currentPage === 1 && (
                                            <div>
                                                <div className="d-flex flex-row align-items-center justify-content-center mb-3">
                                                    <p className="lead fw-normal mb-0 me-3">Create Account</p>
                                                    <button type="button" className="btn btn-primary btn-floating mx-1">
                                                        <i className="fab fa-facebook-f"></i>
                                                    </button>
                                                    <ProfileContext.Provider value={{ profile, setProfile }}>
                                                        <GoogleSign />
                                                    </ProfileContext.Provider>
                                                </div>
                                                <div className="divider d-flex align-items-center">
                                                    <p className="text-center fw-bold mx-3">Or</p>
                                                </div>
                                                <div className="form-outline">
                                                    <label className="form-label" htmlFor="form3Example3">Name</label>
                                                    <input type="name" placeholder='Enter Your Name' onChange={(e) => handleChange(e.target.name, e.target.value)} name='name' value={(profile && profile.name) || formData.name} className="form-control form-control-md" />
                                                </div>
                                                <div className="form-outline">
                                                    <label className="form-label" htmlFor="form3Example3">Email</label>
                                                    <input type="email" placeholder='Enter email address' onChange={(e) => handleChange(e.target.name, e.target.value)} name='email' value={(profile && profile.email) || formData.email} className="form-control form-control-md" />
                                                </div>
                                                <div className="form-outline">
                                                    <label className="form-label" htmlFor="form3Example4">Password</label>
                                                    <input onChange={(e) => handleChange(e.target.name, e.target.value)} type="password" name='password' value={formData.password} className="form-control form-control-md"
                                                        placeholder="Enter password" />
                                                </div>
                                                <div className="form-outline">
                                                    <label className="form-label" htmlFor="form3Example4">Contact Number</label>
                                                    <input 
                                                        type="tel" 
                                                        placeholder='Enter contact number' 
                                                        onChange={(e) => handleChange(e.target.name, e.target.value)} 
                                                        name='contactNumber' 
                                                        value={(profile && profile.contactNumber) || formData.contactNumber} 
                                                        className="form-control form-control-md" 
                                                    />
                                                </div>
                                                <div className="form-outline">
                                                    <label className="form-label" htmlFor="form3Example4">User</label>
                                                    <select className="form-select" name='user' value={formData.user} onChange={(e) => handleChange(e.target.name, e.target.value)} aria-label="Default select example">
                                                        <option style={{ color: '#000000' }} selected>Select Option</option>
                                                        <option style={{ color: '#000000' }} value="player">Player</option>
                                                        <option style={{ color: '#000000' }} value="organizer">Organizer</option>
                                                    </select>
                                                </div>
                                                <button className="btn btn-outline-primary mt-3" onClick={handleSubmit}>Submit</button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}


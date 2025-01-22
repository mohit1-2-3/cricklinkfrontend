import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import url from "../../URL/url.js";
import Swal from "sweetalert2";

export default function OrganizerMyProfile() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [organizerProfile, setOrganizerProfile] = useState({});
    console.log("Organizer data : " + state.id + " @ " + state.email);

    useEffect(() => {
        getData();
    }, [state.id]);

    const getData = async () => {
        try {
            console.log("state.id : " + state.id);
            let organizer = await axios.get(url.organizer.Organizer_profile + `/${state.id}`);
            console.log(organizer.data)
            setOrganizerProfile(organizer.data);
        } catch (error) {
            console.error("Error fetching player details:", error);
            Swal.fire("Error", "Failed to load player details.", "error");
        }
    }
    if (!organizerProfile) {
        return <div>Loading...</div>; // Show a loading message until data is fetched
    }

    return (
        <div className="container-fluid p-4 text-light">
            <i
                className="btn fa-solid fa-arrow-left fa-2xl mt-4 ms-4"
                onClick={() => navigate(-1)}
                style={{ color: "#ffffff" }}
            ></i>
            <div className="text-center">
                <h2 className="text-decoration-underline">Organizer Details</h2>
            </div>
            <div className="d-flex justify-content-around mt-5 flex-wrap">
                <div
                    id="PlayerProfileImage"
                    className="col-md-4 d-flex flex-column align-items-center"
                >
                    <img
                        src={organizerProfile.profile_photo || "/assets/userIcon.jpg"} style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "30px", }}
                        width="80%"
                        height="300rem"
                        alt="Your_Photo"
                    />
                    <h3 className="mt-2 text-center" style={{ color: "#c3c3c3" }}>
                        {organizerProfile.name}
                    </h3>
                    <h4>{organizerProfile.role}</h4>
                    <div>
                        <p className="mt-3">
                            <h5>Email:</h5>
                            <input type="text" name="email" value={organizerProfile.email || "N/A"} readOnly style={{ color: "black" }} />
                        </p>
                    </div>
                </div>
                <div id="login-box" className="col-md-7">
                    <form>
                        {/* <div id="user-box">
              <label>Role</label>
              <input type="text" name="role" value={organizerProfile.role} readOnly />
            </div> */}
                        <div id="user-box">
                            <label>Contact</label>
                            <input
                                type="text"
                                name="experience"
                                value={organizerProfile.contect || "N/A"}
                                readOnly
                            />
                        </div>
                        {/* <div id="user-box">
              <label>experience</label>
              <input
                type="text"
                name="experience"
                value={organizerProfile.profile.experience || "N/A"}
                readOnly
              />
            </div> */}
                    </form>

                    <button
                        style={{
                            backgroundColor: '#4CAF50', // Green button
                            color: 'white',
                            padding: '10px 20px',
                            marginTop: '10px',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            fontSize: '16px',
                        }}
                        onClick={() => {
                            import('sweetalert').then((swal) => {
                                swal.default('Sign-in Required', 'Please sign in to send a request.', 'warning');
                            });
                        }}
                    >
                        Update Profile
                    </button>
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => navigate(`/TournamentCreation`)}
                    >
                        Create Tournament
                    </button>

                </div>
            </div>
        </div>
    );
}

import axios from "axios";
import url from "../../URL/url.js";
import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";


export const TeamRegister = () => {
    const [formData, setFormData] = useState({ team_name: "", captainEmail: "" })
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [tournament, setTournament] = useState({});
    const navigate = useNavigate();

        const id = useSelector((state) => state.User.user._id);

    const params = useParams();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value })
    };


    // const navigateToById = (id) => {
    //     console.log("tourna._id :" + id);
    //     navigate(`/tournamentById/${id}`);
    // };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            console.log("adding team : ")
            const response = await axios.patch(url.tournament.TOURNAMENT_BY_ID + `/addTeam/${params.id}`, formData);
            console.log("response : " + response.data.message);
            setSuccessMessage(response.data.message);
            setErrorMessage("");
            console.log(successMessage)
            // navigateToById(params.id)
        } catch (err) {
            if (err.response && err.response.data) {
                setErrorMessage(err.response.data.err);
            } else {
                setErrorMessage("Internal server error. Please try again later.");
            }
            console.log("Error occurred:", err.message)
        }
    };

    return (
        <>
            <div className="container pt-5">
                <div className="row justify-content-center align-items-center">
                    <div className="col-lg-6">
                        <div className="card shadow-lg border-0 rounded-3 text-dark">
                            <div className="card-body p-10">
                                <h2 className="text-center mb-4">Tournament Registration Form</h2>
                                <div className="alert-success mb-4">
                                {successMessage && <p className="alert alret-success">{successMessage}</p>}
                                {errorMessage && <p className="alert alert-danger">Sorry! {errorMessage}</p>}
                                </div>
                                <form onSubmit={handleFormSubmit} method="patch">
                                    <div className="form-group mb-3">
                                        <label style={{ color: "black", fontSize: "1rem" }}>Team Name</label>
                                        <input type="text" name="team_name" id="team_name" className="form-control" value={formData.team_name} onChange={handleInputChange} required />
                                    </div>

                                    <div className="mb-3">
                                        <label style={{ color: "black", fontSize: "1rem" }}>Captain's Name</label>
                                        <input type="text" id="captain_name" className="form-control" required />
                                    </div>

                                    <div className="mb-3">
                                        <label style={{ color: "black", fontSize: "1rem" }}>Captain Email ID</label>
                                        <input type="email" name="captainEmail" id="captain_email" className="form-control" value={formData.captainEmail} onChange={handleInputChange} required />
                                    </div>

                                    <div className="mb-3">
                                        <label style={{ color: "black", fontSize: "1rem" }}>All Player's Name</label>
                                        <input type="text" className="form-control" rows="3" />
                                    </div>

                                    <div className="d-grid gap-2 mt-4">
                                        <button type="submit" className="btn btn-success btn-lg">
                                            Register
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

}
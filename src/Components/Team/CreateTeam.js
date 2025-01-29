import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


export const CreateTeam = () => {
    const userrole = useSelector((state) => state.User.user.role);

    const [createTeam, setCreateTeam] = useState({ teamName: "", username: "" });
    const [successMessage, setSuccessMessage] = useState("");
    // const [errorMessage, setErrorMessage] = useState("");
    const [showModal, setShowModal] = useState(false); 
    const navigate = useNavigate(); 

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCreateTeam({ ...createTeam, [name]: value });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:3001/Team/createTeam", createTeam);

            setSuccessMessage(response.data.message);
            // setErrorMessage("");
            setShowModal(true); 
            

        } catch (err) {
            if (err.response && err.response.data) {
                // Show error message in an alert box
                alert(`Error: ${err.response.data.error}`);
                setCreateTeam({ teamName: "", username: "" });
            } else {
                alert("Internal server error. Please try again later.");
                setCreateTeam({ teamName: "", username: "" });
            }
        }
    };

    const handleModalClose = () => {
        setShowModal(false); 
            if(userrole==='player'){
            navigate("/PlayerMyProfile");
            }
            else{
              navigate("/OrganizerProfile");
            }
    };

    return (
        <div className="container my-5 bg-info p-3">
            <h2>Create Team</h2>
            {/* {errorMessage && <p className="alert alert-danger">Unable to create team: {errorMessage}</p>} */}
            <form onSubmit={handleFormSubmit} method="post">
                <div className="form-group">
                    <label>Team Name:</label>
                    <input
                        type="text"
                        name="teamName"
                        className="form-control"
                        value={createTeam.teamName}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Captain's Name:</label>
                    <input
                        type="text"
                        name="username"
                        className="form-control"
                        value={createTeam.username}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary mt-3 text-white">
                    Create Team
                </button>
            </form>

            {/* Modal */}
           {/* Modal */}
{showModal && (
    <div
        className="modal show"
        style={{
            display: "block",
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Background overlay color
        }}
    >
        <div className="modal-dialog">
            <div
                className="modal-content"
                style={{
                    backgroundColor: "#d4edda", // Success background color (light green)
                    border: "1px solid #c3e6cb", // Border color (slightly darker green)
                    color: "#155724", // Text color (dark green)
                }}
            >
                <div className="modal-header">
                    <h5 className="modal-title">Success</h5>
                </div>
                <div className="modal-body">
                    <p>{successMessage}</p>
                </div>
                <div className="modal-footer">
                    <button
                        type="button"
                        className="btn btn-success"
                        onClick={handleModalClose}
                    >
                        OK
                    </button>
                </div>
            </div>
        </div>
    </div>
)}

        
        </div>
    );
};
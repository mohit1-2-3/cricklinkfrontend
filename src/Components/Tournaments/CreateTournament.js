import React, { useState } from "react";
import axios from "axios";
import url from "../../URL/url.js";

export const TournamentCreation = () => {
    const [formData, setFormData] = useState({
        TournamentName: "",
        organizer_name: "",
        schedule: [],
        teams: [],
        startDate: "",
        endDate: "",
    });

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        // Basic validation (you can add more as needed)
        if (new Date(formData.startDate) > new Date(formData.endDate)) {
            setErrorMessage("End Date should be after Start Date.");
            return;
        }

        try {
            console.log("Form data:", formData); // Check the structure of the data
            const response = await axios.post(url.tournament.CREATE_TOURNAMENT, formData);

            console.log("Full response:", response.data.insert); // Check the full response structure

            // Ensure the response structure has the data we expect
            if (response.data && response.data.insert) {
                setSuccessMessage(`Tournament Created: ${response.data.insert.TournamentName}`);
                setErrorMessage(""); // Clear error messages
            } else {
                setErrorMessage("Unexpected response format");
            }
        } catch (err) {
            console.error("Error:", err);
            if (err.response && err.response.data) {
                setErrorMessage(err.response.data.message || "Error occurred while creating tournament");
            } else {
                setErrorMessage("Internal server error. Please try again later.");
            }
        }
    };

    return (
        <div className="container my-5">
            <h2 className="text-center mb-4">Create a New Tournament</h2>
            {successMessage && (
                <div className="alert alert-success text-center" role="alert">
                    {successMessage}
                </div>
            )}
            {errorMessage && (
                <div className="alert alert-danger text-center" role="alert">
                    {errorMessage}
                </div>
            )}
            <form onSubmit={handleFormSubmit}>
                <div className="form-group mb-3">
                    <label htmlFor="TournamentName" className="form-label">
                        Tournament Name:
                    </label>
                    <input
                        type="text"
                        id="TournamentName"
                        name="TournamentName"
                        className="form-control"
                        placeholder="Enter tournament name"
                        value={formData.TournamentName}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="organizer_name" className="form-label">
                        Organizer Name:
                    </label>
                    <input
                        type="text"
                        id="organizer_name"
                        name="organizer_name"
                        className="form-control"
                        placeholder="Enter organizer's name"
                        value={formData.organizer_name}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="startDate" className="form-label">
                        Start Date:
                    </label>
                    <input
                        type="date"
                        id="startDate"
                        name="startDate"
                        className="form-control"
                        value={formData.startDate}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="endDate" className="form-label">
                        End Date:
                    </label>
                    <input
                        type="date"
                        id="endDate"
                        name="endDate"
                        className="form-control"
                        value={formData.endDate}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="endDate" className="form-label">
                        Entry Fees :
                    </label>
                    <input
                        type="text"
                        id="entry_fees"
                        name="entry_fees"
                        className="form-control"
                        value={formData.entry_fees}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-success w-100 mt-4">
                    Create Tournament
                </button>
            </form>
        </div>
    );
};

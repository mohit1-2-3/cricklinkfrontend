import React, { useState } from "react";
import { useSelector } from "react-redux";

import axios from "axios";
import url from "../../URL/url.js";

export const TournamentCreation = () => {
  const id = useSelector((state) => state.User.user._id);

  const [formData, setFormData] = useState({
    TournamentName: "",
    organizerId: id,
    organizer_name: "",
    venue: "",
    schedule: [],
    teams: [],
    startDate: "",
    endDate: "",
    entry_fees: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (new Date(formData.startDate) > new Date(formData.endDate)) {
      setErrorMessage("End Date should be after Start Date.");
      return;
    }

    try {
      const response = await axios.post(url.tournament.CREATE_TOURNAMENT, formData);

      if (response.data && response.data.insert) {
        setSuccessMessage(`Tournament Created: ${response.data.insert.TournamentName}`);
        setErrorMessage("");
      } else {
        setErrorMessage("Unexpected response format");
      }
    } catch (err) {
      if (err.response && err.response.data) {
        setErrorMessage(err.response.data.message || "Error occurred while creating tournament");
      } else {
        setErrorMessage("Internal server error. Please try again later.");
      }
    }
  };

  return (
    <div className="container my-5" style={{ maxWidth: "600px" }}>
      <h2 className="text-center mb-4" style={{ color: "#0d6efd" }}>
        Create a New Tournament
      </h2>
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
      <div
        className="p-4 rounded shadow"
        style={{ backgroundColor: "#e7f3ff", border: "1px solid #bcd4f7" }}
      >
        <form onSubmit={handleFormSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="TournamentName" className="form-label" style={{ color: "#0d6efd" }}>
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
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #bcd4f7",
                borderRadius: "8px",
              }}
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="venue" className="form-label" style={{ color: "#0d6efd" }}>
              Venue:
            </label>
            <input
              type="text"
              id="venue"
              name="venue"
              className="form-control"
              placeholder="Enter venue"
              value={formData.venue}
              onChange={handleInputChange}
              required
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #bcd4f7",
                borderRadius: "8px",
              }}
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="startDate" className="form-label" style={{ color: "#0d6efd" }}>
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
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #bcd4f7",
                borderRadius: "8px",
              }}
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="endDate" className="form-label" style={{ color: "#0d6efd" }}>
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
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #bcd4f7",
                borderRadius: "8px",
              }}
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="entry_fees" className="form-label" style={{ color: "#0d6efd" }}>
              Entry Fees:
            </label>
            <input
              type="text"
              id="entry_fees"
              name="entry_fees"
              className="form-control"
              placeholder="Enter entry fees"
              value={formData.entry_fees}
              onChange={handleInputChange}
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #bcd4f7",
                borderRadius: "8px",
              }}
            />
          </div>

          <button
            type="submit"
            className="btn w-100 mt-4"
            style={{
              backgroundColor: "#0d6efd",
              color: "#ffffff",
              borderRadius: "8px",
              fontWeight: "bold",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            Create Tournament
          </button>
        </form>
      </div>
    </div>
  );
};

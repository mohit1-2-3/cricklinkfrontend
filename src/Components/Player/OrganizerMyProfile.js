import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import url from "../../URL/url.js";


export default function OrganizerMyProfile() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [organizerProfile, setOrganizerProfile] = useState(null);

  useEffect(() => {
    fetchOrganizerData();
  }, [state.id]);

  const fetchOrganizerData = async () => {
    try {
        let response = await axios.get(url.organizer.Organizer_profile + `/${state.id}`);
        setOrganizerProfile(response.data);
    } catch (error) {
      console.error("Error fetching organizer details:", error);
      Swal.fire("Error", "Failed to load organizer details.", "error");
    }
  };

  if (!organizerProfile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container-fluid p-4 text-light">
      <i
        className="btn fa-solid fa-arrow-left fa-2xl mt-4 ms-4"
        onClick={() => navigate(-1)}
        style={{ color: "#ffffff" }}
      ></i>
      <div className="text-center">
        <h2 className="text-decoration-underline" style={{ fontSize: "2rem" }}>
          Organizer Details
        </h2>
      </div>
      <div className="d-flex justify-content-around mt-5 flex-wrap">
        {/* Organizer Image and Info Section */}
        <div
          id="OrganizerProfileImage"
          className="col-md-4 d-flex flex-column align-items-center"
        >
          <img
            src={organizerProfile.profile_photo || "/assets/highlights/userIcon.png"}
            width="80%"
            height="300rem"
            alt="Organizer"
            style={{
              border: "1px solid #fff",
              objectFit: "cover",
            }}
          />
          <h4 className="mt-3 text-center" style={{ fontSize: "1.5rem", color: "#c3c3c3" }}>
            {organizerProfile.name}
          </h4>
          <div>
            <p className="mt-3" style={{ fontSize: "1.2rem" }}>
              <strong>Email: </strong>
              <label style={{ color: "white" }}>{organizerProfile.email || "N/A"}</label>
            </p>
          </div>
        </div>

        {/* Organizer Details Section */}
        <div id="login-box" className="col-md-7">
          <form>
            <div id="user-box" style={{ marginBottom: "1rem" }}>
              <label style={{ fontSize: "1.3rem" }}>Role</label>
              <input
                type="text"
                name="role"
                value={organizerProfile.role || "N/A"}
                readOnly
                className="form-control"
                style={{ fontSize: "1.2rem" }}
              />
            </div>
            <div id="user-box" style={{ marginBottom: "1rem" }}>
              <label style={{ fontSize: "1.3rem" }}>Contact</label>
              <input
                type="text"
                name="contact"
                value={organizerProfile.profile.contact || "N/A"}
                readOnly
                className="form-control"
                style={{ fontSize: "1.2rem" }}
              />
            </div>
            <div id="user-box" style={{ marginBottom: "1rem" }}>
              <label style={{ fontSize: "1.3rem" }}>Location</label>
              <input
                type="text"
                name="location"
                value={organizerProfile.profile.location || "N/A"}
                readOnly
                className="form-control"
                style={{ fontSize: "1.2rem" }}
              />
            </div>
          </form>

          {/* Action Buttons */}
          <div className="mt-4">
            <button
              style={{
                backgroundColor: "#FFA500",
                color: "white",
                padding: "12px 24px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "1.2rem",
                marginRight: "10px",
              }}
              onClick={() =>
                Swal.fire("Feature Unavailable", "Update feature is not implemented yet.", "info")
              }
            >
              Update Profile
            </button>
            <button
              style={{
                backgroundColor: "#007BFF",
                color: "white",
                padding: "12px 24px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "1.2rem",
              }}
              onClick={() => navigate("/TournamentCreation")}
            >
              Create Tournament
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

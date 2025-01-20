import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function PlayerProfile() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [playerData, setPlayerData] = useState(null);

  useEffect(() => {
    // Fetch the player details using the API
    console.log("--------------------------------------");
    console.log(state.playerId);
    console.log(state.id);
    axios
      .get(`http://localhost:3001/user/viewProfile/${state.id}`)
      .then((response) => {
        setPlayerData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching player details:", error);
        Swal.fire("Error", "Failed to load player details.", "error");
      });
  }, [state.playerId]);

  if (!playerData) {
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
        <h2 className="text-decoration-underline">Player Details</h2>
      </div>
      <div className="d-flex justify-content-around mt-5 flex-wrap">
        <div
          id="PlayerProfileImage"
          className="col-md-4 d-flex flex-column align-items-center"
        >
          <img
            src={playerData.profile_photo}
            width="80%"
            height="300rem"
            alt="Player"
          />
          <h4 className="mt-2 text-center" style={{ color: "#c3c3c3" }}>
            {playerData.name}
          </h4>
          <div>
            <p className="mt-3">
              <h5>Skills:</h5>
              {/* {Array.isArray(playerData?.profile?.skills) && playerData.profile.skills.length > 0
    ? playerData.profile.skills
    : 'N/A'} */}
              <input
                type="text"
                name="location"
                value={playerData.profile.skills || "N/A"}
                readOnly
                style={{ color: "black" }}
              />
            </p>
          </div>
        </div>
        <div id="login-box" className="col-md-7">
          <form>
            <div id="user-box">
              <label>Role</label>
              <input type="text" name="role" value={playerData.role} readOnly />
            </div>
            <div id="user-box">
              <label>Experience</label>
              <input
                type="text"
                name="experience"
                value={playerData.profile.experience || "N/A"}
                readOnly
              />
            </div>
            <div id="user-box">
              <label>Location</label>
              <input
                type="text"
                name="location"
                value={playerData.profile.location || "N/A"}
                readOnly
              />
            </div>
            {/* ==================================== */}

            

            {/* ======================================== */}
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
    Send Request
</button>

        </div>
      </div>
    </div>
  );
}

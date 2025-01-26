
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"; // Redux se token access karne ke liye
import axios from "axios";
import Swal from "sweetalert2";

export default function PlayerProfile() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [playerData, setPlayerData] = useState(null);

  // Redux state se token access karo
  const token = useSelector((state) => state.User?.token);
  const id = useSelector((state) => state.User.user._id);

  useEffect(() => {
    // Fetch the player details using the API
    console.log("--------------------------------------");
    // console.log(state.playerId);
    console.log(state.id);
    axios.get(`http://localhost:3001/user/profile/${state.id}`)
      .then((response) => {
        setPlayerData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching player details:", error);
        Swal.fire("Error", "Failed to load player details.", "error");
      });
  }, [state.id]);

  if (!playerData) {
    return <div>Loading...</div>; // Show a loading message until data is fetched
  }

  return (
    <div className="container d-flex justify-content-center align-items-center p-8 text-light" style={{ minHeight: "100vh" }}>
      <div className="bg-dark rounded shadow-lg" style={{ width: "100%", maxWidth: "800px" }}>
        {/* Back Button */}
        <i
          className="btn fa-solid fa-arrow-left fa-2xl mb-4"
          onClick={() => navigate(-1)}
          style={{ color: "#ffffff", cursor: "pointer" }}
        ></i>
  
        {/* Page Title */}
        <div className="text-center mb-4">
          <h2 className="text-decoration-underline">Player Details</h2>
        </div>
  
        {/* Player Details Section */}
        <div className="row">
          {/* Player Image and Skills */}
          <div className="col-md-4 text-center mb-4">
            {console.log(playerData)}
            {console.log(playerData?.profile_photo)
            }
           <img 
    src={playerData?.profile_photo || "/user.webp"} 
    width="100%" 
    height="300rem" 
    alt="Player"  
    style={{ objectFit: "cover", borderRadius: "10px" }}
/>
<h4 className="mt-3">{playerData?.name}</h4>
            <h3 className="mt-3">
              <strong>Skills: </strong>{playerData?.profile?.skills || "N/A"}
            </h3>
          </div>
  
          {/* Player Details Form */}
          <div className="col-md-8">
            <form>
              <div className="mb-3">
                <label>Role</label>
                <input type="text" name="role" value={playerData?.role} readOnly className="form-control bg-dark text-white"
                />
              </div>
              <div className="mb-3">
                <label>Experience</label>
                <input type="text" name="experience" value={playerData?.profile?.experience || "N/A"} readOnly className="form-control bg-dark text-white"/>
              </div>
              <div className="mb-3">
                <label>Location</label>
                <input type="text" name="location" value={playerData?.profile?.location || "N/A"} readOnly className="form-control bg-dark text-white"/>
              </div>
            </form>
  
            {/* Conditionally render Send Request button */}
            {!token && (
              <button className="btn btn-success mt-3 px-4 py-2" style={{ borderRadius: "5px" }}
                onClick={() => {
                  Swal.fire("Sign-in Required","Please sign in to send a request.","warning")}} >
                Send Request
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
  
}

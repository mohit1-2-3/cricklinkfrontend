
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"; // Redux se token access karne ke liye
import axios from "axios";
import Swal from "sweetalert2";


export default function PlayerProfile() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [playerData, setPlayerData] = useState(null);
  // const [captainData, setCaptainData] = useState(null);
  const [buttonStatus, setButtonStatus] = useState("Send Request");


  // Redux state se token access karo
  const token = useSelector((state) => state.User?.token);
  const id = useSelector((state) => state.User.user._id);
  const role = useSelector((state) => state.User.user.role)

  useEffect(() => {
    userprofile();
  }, [state.id]);

  const userprofile = async () =>{
    try{
      console.log("--------------------------------------");
      // console.log(state.playerId);
      console.log("state.id : "+state.id);
      const user = await axios.get(`http://localhost:3000/user/profile/${state.id}`)
      console.log("USER.DATA : "+user.data)
      setPlayerData(user.data);
    }catch(error){
      console.error("Error fetching player details:", error);
      Swal.fire("Error", "Failed to load player details.", "error");
    }
  }
  

  
  const sendReqToPlayer = async (playerId) => {
    try {
      console.log("current user id : " + id)
      const captain = await axios.get(`http://localhost:3000/Team/${id}`)
      if(!captain){
        alert("only captain can send request");
      }
      console.log("captain id : "+ captain.data)
   
        const requestSend = await axios.post(`http://localhost:3000/Team/reqCaptainToPlayer/${id}`, { playerId: playerId })
      
        console.log("request send suceesfully : " + requestSend?.data + " "+ requestSend.data?.notificationC.status);
        setButtonStatus("Request sent");
    } catch (error) {
        console.log("Error : " + error);
    }
}

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
            <img src={playerData?.profile_photo || "/user.webp"} width="100%" height="300rem" alt="Player" style={{ objectFit: "cover", borderRadius: "10px" }} />
            <h4 className="mt-3">{playerData?.name}</h4>
            <h3 className="mt-3">
              <strong>Skills: </strong>{playerData.profile?.skills || "N/A"}
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
                <input type="text" name="experience" value={playerData.profile?.experience || "N/A"} readOnly className="form-control bg-dark text-white" />
              </div>
              <div className="mb-3">
                <label>Location</label>
                <input type="text" name="location" value={playerData.profile?.location || "N/A"} readOnly className="form-control bg-dark text-white" />
              </div>
              </form>

            {/* Conditionally render Send Request button */}
            {!token ? (
              <button className="btn btn-success mt-3 px-4 py-2" style={{ borderRadius: "5px" }}
                onClick={() => {
                  Swal.fire("Sign-in Required", "Please sign in to send a request.", "warning")
                }} >
                Send Request
              </button>
            ) : id == state.id ? (
              <button className="btn btn-primary" style={{ mt: 4 }}
                onClick={() => navigate(`/UpdateProfileForm/${id}`)}>Update Profile</button>
            ) : (
              <button className="btn btn-success mt-3 px-4 py-2" style={{ borderRadius: "5px" }}
                onClick={() => sendReqToPlayer(state.id)} >
                {buttonStatus}
              </button>
            )}
              
          </div>
        </div>
      </div>
    </div>


  );

}

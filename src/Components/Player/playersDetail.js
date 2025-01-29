import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import TeamsPage from "../Team/TeamPage";
import { useSelector } from "react-redux";


function PlayersDetail() {
  const params = useParams(); // Get user ID from URL
  const [player, setPlayer] = useState(null);
  const id = useSelector((state) => state.User.user._id);

  useEffect(() => {
    console.log("id", params.id);
    const fetchPlayerDetails = async () => {
      try {
        // Fetch data from user collection
        const response = await axios.get(`http://localhost:3001/user/${params.id}`);
        setPlayer(response.data.user); // Ensure the correct key
      } catch (err) {
        console.error("Error fetching player details:", err);
      }
    };
    fetchPlayerDetails();
  }, [params.id]);

  if (!player) {
    return <div>Loading...</div>;
  }

  return (
    <>
   
    <div className="container mt-5 p-4" style={{ backgroundColor: "#f9f9f9",width:"700px", height:"450px", borderRadius: "10px", boxShadow: "0px 4px 8px rgba(243, 238, 238, 0.68)" }}>
      <h3 className="text-center mb-4 " style={{ fontFamily: "'Poppins', sans-serif", color: "#333" ,textDecoration:"underline"}}> Details</h3>
      <div className="d-flex align-items-center" style={{ gap: "30px" }}>
        {/* Player Photo */}
        <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <img
            src={player.profile_photo || "/user.webp"}
            alt={player.name}
            style={{
              width: "300px", // Increased width
              height: "300px", // Increased height
              borderRadius: "10px", // Slight rounded corners
              objectFit: "cover",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
            }}
          />
        </div>

        {/* Player Details */}
        <div style={{ flex: 2 }}>
          <h5 style={{ fontSize: "1.2rem", color: "#555", marginBottom: "10px" }}>Name: <span style={{ color: "#000" }}>{player.name}</span></h5>
          <h5 style={{ fontSize: "1.2rem", color: "#555", marginBottom: "10px" }}>Email: <span style={{ color: "#000" }}>{player.email || "N/A"}</span></h5>
          <h5 style={{ fontSize: "1.2rem", color: "#555", marginBottom: "10px" }}>Contact: <span style={{ color: "#000" }}>{player.contect || "N/A"}</span></h5>
          <h5 style={{ fontSize: "1.2rem", color: "#555", marginBottom: "10px" }}>Role: <span style={{ color: "#000" }}>{player.role || "N/A"}</span></h5>
          <h5 style={{ fontSize: "1.2rem", color: "#555", marginBottom: "10px" }}>Skills: <span style={{ color: "#000" }}>{player.profile?.skills|| "N/A"}</span></h5>
          <h5 style={{ fontSize: "1.2rem", color: "#555", marginBottom: "10px" }}>Experience: <span style={{ color: "#000" }}>{player.profile?.experience || "N/A"}</span></h5>
          <h5 style={{ fontSize: "1.2rem", color: "#555", marginBottom: "10px" }}>Location: <span style={{ color: "#000" }}>{player.profile?.location || "N/A"}</span></h5>
        </div>
        
      </div>
    </div>
    {/* <TeamsPage/> */}
    </>
  );
}

export default PlayersDetail;

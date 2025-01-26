import { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import axios from "axios";

function TeamDetailsPage() {
  const params = useParams(); // Get teamId from URL
  const [team, setTeam] = useState({});
  const navigate=useNavigate();

  useEffect(() => {
    const fetchTeamDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/Team/${params.id}`);
        console.log(response.data?.Team);
        setTeam(response.data?.Team);
      } catch (err) {
        console.error("Error fetching team details:", err);
      }
    };
  
   
fetchTeamDetails();
  }, [params.id]);

  const handleViewDetails = (id) => {
    console.log("Player ID passed to navigate:", id); // ID ko console mein dekh lo
    if (!id) {
      console.error("Invalid ID detected"); // Agar ID missing hai to error dikhao
      return;
    }
    navigate(`/user/profile/${id}`);
  };
 
  return (<>
    <div className="container mt-5 p-2" >
    <h3 className="text-center mb-4" style={{ fontFamily: "'Poppins', sans-serif", fontSize: "40px", color: "#ffffff", textDecoration: "underline", }}>Team Players</h3>

      <div className="row">
      {team?. players?.map((player,index)=>(
         <div key={index} className="col-md-3 p-3 ">
           <div className="col md-6 d-flex flex-column  " style={{height:"370px", boxShadow:"10px 10px 10px gray",borderRadius:"10px"}}>
            
     <img src={player.profile_photo || "/user.webp"} alt={`${player.name}'s profile`}
          style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "10px"}}/>
                <div style={{fontSize:"15px", fontWeight:"bold"}}>
                <p>Name : {player.name}</p>
                  <p>Skill : {player.profile?.skills}</p>
                  <p>Experience : {player.profile?.experience}</p>
                  <p>Location: {player.profile?.location}</p>
                
                </div>
                
                  
      <button className="btn btn-primary p-2 w-50  d-block mx-auto "  onClick={() => handleViewDetails(player._id)}>view details</button>
          </div>
          </div>
             ) )}
          </div>
      </div>
      
      </>
  );
}

export default TeamDetailsPage;

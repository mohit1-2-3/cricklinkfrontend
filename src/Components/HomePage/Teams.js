import { useEffect, useState } from "react";
import axios from "axios";

import { Link, useNavigate } from "react-router-dom";

function Teams(){
       const [teams, setTeams] = useState([]);
      const navigate = useNavigate();
    
      useEffect(() => {
        const fetchTeams = async () => {
          try {
            const response = await axios.get("http://localhost:3000/Team/viewteam");
            setTeams(response.data.Team);
            console.log("teams : "+response.data.Team);
            console.log("teams data:", JSON.stringify(response.data.Team, null, 2));
          } catch (err) {
            console.error("Error fetching teams data:", err);
          }
        };
        fetchTeams();
      }, []);
    
      const handleTeamClick = (id) => {
        navigate(`/Team/${id}`);
      };
    
    
      return (
        <div className="container text-white">
          <div className="d-flex justify-content-end mb-3">
            <button
              className="btn btn-primary"
              onClick={() => navigate("/Teams")}
            >
              View All
            </button>
          </div>
      
          <div
            className="container text-center d-flex justify-content-around flex-wrap mt-3"
            style={{ whiteSpace: "nowrap" }}
          >
            {teams.slice(0, 4).map((team, index) => (
              <div
                key={index}
                className="card bg-dark text-white shadow-sm rounded d-inline-block p-3 mx-2"
                style={{
                  minWidth: "250px",
                  minHeight: "200px",
                  display: "inline-block",
                  fontSize: "1rem",
                }}
              >
                <h6 className="text-primary">{team.teamName}</h6>
                <p>
                  <strong>Captain:</strong> {team?.captainId?.name || "Unknown"}
                </p>
                <p>
                  <strong>Total Players:</strong>{" "}
                  {team?.players.filter((player) => player !== null).length}/11
                </p>
      
                <div className="d-flex justify-content-between mt-2">
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => {
                      if (team?.players.length > 0) {
                        handleTeamClick(team._id);
                      } else {
                        alert("No players available");
                      }
                    }}
                  >
                    View
                  </button>
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => navigate("/Team/req-to-join")}
                  >
                    Join
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    

}
export default Teams;
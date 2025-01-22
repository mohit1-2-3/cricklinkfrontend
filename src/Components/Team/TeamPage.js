import { useEffect, useState } from "react";
import axios from "axios";

import { Link, useNavigate } from "react-router-dom";

function TeamsPage() {
  const [teams, setTeams] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get("http://localhost:3001/Team/viewteam");
        setTeams(response.data.Team);
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
    <>
      <div className="container mt-5">
        <h3
          className="text-center mb-4"
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "40px",
            color: "#ffffff",
            textDecoration: "underline",
          }}
        >
          Teams
        </h3>

        <div
          className="row"
          style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}
        >
          {teams.map((team, index) => (
            <div
              key={index}
              className="col-md-4 text-center team-card"
              tabIndex="0" // Makes div focusable
              style={{
                flex: "1 1 calc(30% - 20px)", // Adjusted width
                marginBottom: "20px",
                cursor: "pointer",
                outline: "none", // Removes default focus outline
              }}
            >
              <div
                style={{
                  padding: "20px",
                  borderRadius: "10px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                  backgroundColor: "gray",
                  textAlign: "center",
                  transition: "transform 0.3s ease, background-color 0.3s ease",
                }}
                className="team-card-inner"
              >
                <h2
                  style={{
                    fontFamily: "'Pacifico', cursive",
                    fontSize: "1.8rem",
                    textAlign: "center",
                  }}
                >
                  {team?.teamName}
                </h2>
              </div>

              {/* Team Details */}
              <h5
                style={{
                  fontFamily: "'Roboto', sans-serif",
                  fontSize: "1.2rem",
                  color: "white",
                  marginTop: "10px",
                }}
              >
                Captain:{" "}
                <Link
                  to={`/user/${team?.captainId?._id}`}
                  style={{ color: "white", }}
                      className="captain-link"
                >
                  {team?.captainId?.name || "N/A"}
                </Link>
              </h5>

              <h5
                style={{
                  fontFamily: "'Roboto', sans-serif",
                  fontSize: "1.2rem",
                  color: "white",
                }}
              >
                Total Players:{" "}
                <span style={{ color: "#28a745" }}>
                  {team?.players.length}/11
                </span>
              </h5>

              {/* Buttons */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "10px",
                  marginTop: "15px",
                }}
              >
                <button
                  className="btn btn-primary"
                  style={{ width: "120px" }}
                  onClick={() => navigate("/Team/req-to-join")}
                >
                  Join
                </button>
                <button
                  className="btn btn-primary"
                  style={{ width: "120px" }}
                  onClick={() => {
                    if (team?.players.length > 0) {
                      handleTeamClick(team._id);
                    } else {
                      alert("No player available");
                    }
                  }}
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CSS Styling */}
      <style jsx="true">{`
        .team-card:hover,
        .team-card:focus {
          background-color: #444; /* Change background color on hover or focus */
          transform: scale(1.05); /* Slightly increase size */
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3); /* Add a deeper shadow */
        }

        .team-card:focus {
          outline: 2px solid #6a11cb; /* Add a visible focus outline */
        }

        .team-card {
          transition: all 0.3s ease;
        }
          .captain-link {
    color: white;
    text-decoration: none; /* No underline by default */
    transition: text-decoration 0.3s ease; /* Smooth underline appearance */
  }
           .captain-link:hover {
    text-decoration: underline; /* Underline on hover */
  }
      `}</style>
    </>
  );
}

export default TeamsPage;

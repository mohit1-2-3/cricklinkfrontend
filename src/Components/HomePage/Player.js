import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Players from "./Player.css"; // Corrected import


const PlayerList = ({ filteredData }) => {
  const [playerList, setPlayerList] = useState([]);
  const containerRef = useRef(null);
  let navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/user/playerList")
      .then((response) => {
        setPlayerList(response.data.user);
      })
      .catch((err) => {
        console.error("Error fetching players:", err);
      });
  }, []);

  // Use filtered data if available; otherwise, use full player list
  const displayData = filteredData?.length ? filteredData : playerList;

  // Scroll Functions
  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="text-center" id="playerContainer">
        <h2 className="player-title">Players</h2>
      </div>

      <div className="scroll-wrapper" style={{marginLeft:"300px", marginRight:"300px"}}>
        {/* Left Scroll Button */}
        <button className="scroll-button left" onClick={scrollLeft}>
          &lt;
        </button>

        {/* Scrollable Player List */}
        <div ref={containerRef} className="scroll-container">
          {displayData.map((player, index) => {
            return (
              <div key={player._id || index} className="player-card">
                <img src={player.profile_photo} alt={player.name} className="player-image" />
                <div className="player-info">
                  <h5>{player.name}</h5>
                  <p><strong>Role:</strong> {player.role}</p>
                  <button
                    className="view-button"
                    onClick={() => navigate("/PlayerProfile", { state: { id: player._id } })}
                  >
                    View More
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Scroll Button */}
        <button className="scroll-button right" onClick={scrollRight}>
          &gt;
        </button>
      </div>
    </>
  );
};

export default PlayerList;

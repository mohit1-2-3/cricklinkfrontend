import axios from "axios";
import { useEffect, useState } from "react";
import "./homePage.css";
import { useNavigate } from "react-router-dom";

export default ({ filteredData }) => {
  const [PlayerList, setPlayerList] = useState([]);
  const [selectedPlayerId, setSelectedPlayerId] = useState({});
  useEffect(() => {
    axios
      .get("http://localhost:3001/user/playerList")
      .then((response) => {
        console.log("response.data:", response.data);
        setPlayerList(response.data.user);
      })
      .catch((err) => {
        console.error("Error fetching players:", err);
      });
  }, []);
  useEffect(()=>{},[PlayerList])

  let navigate = useNavigate();
  filteredData = filteredData.length ? filteredData : PlayerList;

  return (
    <>
      <div className="text-decoration-underline" id="playerContainer">
        <h2>PLAYERS</h2>
      </div>
      <div className="container text-center d-flex justify-content-around flex-wrap gap-5 mt-3">
        {filteredData?.slice(0, 10).map((player, index) => {
          const id = player._id;
          console.log(id);

          return (
            <div
              key={index}
              className="card col-md-2 col-sm-2 bg-dark"
              id="player"
            >
              <img
                src={player?.profile_photo||"/user.webp"}
                className="card-img-top"
                style={{ height: "8rem" }}
                alt="Player"
              />
              <div className="card-body">
                <h5
                  className="card-title text-nowrap"
                  style={{ color: "#ffffff" }}
                >
                  {player?.name}
                </h5>
                <p className="card-text text-white">
                  <strong>Email:</strong> {player?.email || "N/A"}
                  <br />
                  <strong>Contact:</strong> {player?.contact || "N/A"}
                  <br />
                  <strong>Role:</strong> {player?.role}
                </p>
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => {
                    console.log(
                      "Navigating to PlayerProfile with player:",
                      player
                    ); // Log the player data
                    setSelectedPlayerId(id);
                    navigate("/PlayerProfile", { state: { id } });
                  }}
                >
                  View More
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

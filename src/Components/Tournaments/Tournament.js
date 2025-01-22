import React, { useState, useEffect } from "react";
import axios from "axios";
import url from "../../URL/url.js";
import {useNavigate} from "react-router-dom";
import { useSelector } from "react-redux";


export const OrganizerTournament = () => {

const navigate = useNavigate();
  const [tournament, setTourna] = useState([]);
  const id = useSelector((state) => state.User.user._id);

  useEffect(() => {
    getTournamentbyId();
  }, []);

  const viewTourna = (id) => {
    navigate(`/tournamentById/${id}`)
  }

    const getTournamentbyId = async () => {
        try {
          console.log("organizer id : state.id : " + id)
          let response = await axios.get(url.tournament.TOURNAMENT_BY_ID + `/tournamentById/${id}`);
          console.log(response.data.data);
          setTourna(response.data.data);
        }
        catch (error) {
          console.log(error);
        }
      }

    return (
        <div style={{ whiteSpace: "nowrap" }}>
          {tournament.map((tourna, index) => (
            <div
              key={index}
              className="card bg-dark text-white shadow-sm border rounded d-inline-block p-3 mx-2"
              style={{ minWidth: "250px", display: "inline-block" }}
            >
              <h6 className="text-primary">{tourna.TournamentName}</h6>
              <p>
                <strong>Organizer:</strong> {tourna.organizerId?.name || "Unknown"}
              </p>
              <p>
                <strong>Start:</strong> {new Date(tourna.startDate).toLocaleDateString()}
              </p>
              <p>
                <strong>End:</strong> {new Date(tourna.endDate).toLocaleDateString()}
              </p>
              <div className="d-flex justify-content-between mt-2">
                <button
                  className="btn btn-info btn-sm"
                  onClick={() => viewTourna(tourna._id)}
                >
                  Details
                </button>
                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => viewTourna(tourna._id)}>
                  Update Schedule
                </button>
              </div>
            </div>
          ))}
        </div>
    );
};

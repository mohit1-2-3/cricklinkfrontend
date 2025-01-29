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

  const updateSchedule = (id) => {
    navigate(`/UpdateTournament/${id}`)
  }

    const getTournamentbyId = async () => {
        try {
          console.log("organizer id : state.id : " + id)
          let response = await axios.get(url.tournament.TOURNAMENT_BY_ID + `/tournamentById/${id}`);
          console.log("this is tournament response : "+response.data.data);
          setTourna(response.data.data);
        }
        catch (error) {
          console.log(error);
        }
      }

      return (
        <div className="container mt-3">
          <div className="row">
            {tournament.map((tourna, index) => (
              <div key={index} className="col-md-4 col-sm-6 mb-4">
                <div className="card bg-dark text-white shadow-sm border rounded p-3">
                  <h6 className="text-primary" style={{ fontSize: "1.25rem" }}>{tourna.TournamentName}</h6>
                  <p style={{ fontSize: "1rem" }}>
                    <strong>Organizer:</strong> {tourna.organizerId?.name || "Unknown"}
                  </p>
                  <p style={{ fontSize: "1rem" }}>
                    <strong>Start:</strong> {new Date(tourna.startDate).toLocaleDateString()}
                  </p>
                  <p style={{ fontSize: "1rem" }}>
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
                      onClick={() => updateSchedule(tourna._id)}
                    >
                      Update Schedule
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
      
};

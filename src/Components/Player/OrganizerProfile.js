import React from "react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import url from "../../URL/url.js";
// import { TournamentCreation } from "../Tournaments/CreateTournament";
import UpcomingEvent from "../HomePage/UpcomingEvents"

function LeftSidebar() {
  const navigate = useNavigate();
  const profile_photo = useSelector((state) => state.User.user.profile_photo);
  const id = useSelector((state) => state.User.user._id);
  const name = useSelector((state) => state.User.user.name);

  return (
    <div
      className="offcanvas offcanvas-start p-5 text-bg-dark"
      tabIndex="-1"
      id="leftSidebar"
      aria-labelledby="leftSidebarLabel"
    >
      <button
        type="button"
        className="btn-close btn-close-white"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
      <div className="offcanvas-header ps-5">
        {profile_photo ? (
          <img
            src={profile_photo}
            alt="User Profile"
            style={{
              borderRadius: "50%",
              width: "100px",
              height: "100px",
              cursor: "pointer",
            }}
            onClick={() => navigate("/OrganizerMyProfile", { state: { id } })}
          />
        ) : (
          <img
            src="assets/logo.png"
            alt="Default Logo"
            style={{
              borderRadius: "50%",
              width: "100px",
              height: "100px",
              cursor: "pointer",
            }}
            onClick={() => navigate("/OrganizerMyProfile", { state: { id } })}
          />
        )}
        <h4 className="mt-3 text-white">{name || "Guest User"}</h4>
      </div>
      <div className="offcanvas-body ps-5">
        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
          <li className="nav-item">
            <button
              className="nav-link active"
              onClick={() => navigate("/OrganizerMyProfile", { state: { id } })}
            >
              My Profile
            </button>
          </li>
          <li className="nav-item">
            <button className="nav-link" onClick={() => navigate("/allTournament")}>
              Tournament
            </button>
          </li>
        </ul>
      </div>
      <div className="d-flex justify-content-center align-items-center mt-auto">
        <button
          className="btn btn-danger w-75 mt-4"
          onClick={() => {
            navigate("/");
            console.log("Logged out.");
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default function OrganizerProfile({ setSearchedList }) {
  const navigate = useNavigate();
  const [tournament, setTourna] = useState([]);
  const id = useSelector((state) => state.User.user._id);

  useEffect(() => {
    getTournamentbyId();
  }, []);


  const getTournamentbyId = async () => {
    try {
      console.log("organixer id : state.id : " + id)
      let response = await axios.get(url.tournament.TOURNAMENT_BY_ID + `/tournamentById/${id}`);
      console.log(response.data.data);
      setTourna(response.data.data);
    }
    catch (error) {
      console.log(error);
    }
  }

  const viewTourna = (id) => {
    navigate(`/tournamentById/${id}`)
  }
  return (
    <>
      <nav
        className="navbar navbar-dark sticky-top p-3"
        style={{ backgroundColor: "#090129" }}
      >
        <div className="container-fluid">
          <LeftSidebar />
          <div className="col-md-1 col-2">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#leftSidebar"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
          <div className="col-md-4 col-6 offset-md-2 offset-1">
            <input
              type="text"
              onChange={(e) => setSearchedList(e.target.value)}
              placeholder="Search"
              className="form-control rounded-pill text-light"
              style={{ backgroundColor: "#272727" }}
            />
          </div>
          <div className="col-md-2 col-1 offset-2 offset-md-2 d-flex justify-content-center">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => navigate(`/UpdateProfileForm/${id}`)}
            >
              Update Profile
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => navigate("/createTournamentReq")}
            >
              Create Tournament
            </button>
          </div>
        </div>
      </nav>
      {/* Pass the organizer ID to the TournamentById component */}
      <div className="container mt-4 text-white">
        <h1 className="text-center mb-4 text-light">Your Events</h1>
        <div className="d-flex justify-content-end mb-3">
          <button
            className="btn btn-primary"
            onClick={() => navigate("/UpcomingTournamentsCards")}
          >
            View All
          </button>
        </div>
        {/* Horizontal Scrollable Section */}
        <div className="overflow-auto" style={{ whiteSpace: "nowrap" }}>
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
      </div>
      <div className="container mt-5 text-white">
        <h1 className="text-center mb-4 text-light">Tournsments</h1>
        <UpcomingEvent />
      </div>

    </>
  );
}

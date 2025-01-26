import { useEffect, useState } from "react";
import axios from "axios";
import url from "../../URL/url.js";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useSelector } from "react-redux"; // Redux se token access karne ke liye


function UpcomingEvent() {
    const [tournament, setTournament] = useState([]);
    const navigate = useNavigate();
    const token = useSelector((state) => state.User?.token);

    useEffect(() => {
        tournamentList();
    }, []);

    const tournamentList = async () => {
        try {
            let response = await axios.get(url.tournament.TOURNAMENT_LIST);
            let tournaments = response.data.tournaments.filter((tourna) => tourna.status === "active")
                .sort((first, second) => new Date(first.startDate) - new Date(second.startDate));
            console.log(tournaments);
            setTournament(tournaments);
        } catch (err) {
            console.log(err.message);
        }
    };
    const navigateToById = (id) => {
        console.log("tourna._id2 :" + id);
        navigate(`/tournamentById/${id}`);
    };

    const navigateToRegister = (id) => {
        console.log("navigating to registration");
        navigate(`/addTeam/${id}`);
    };

    return (
        <div className="container text-white">
            <div className="d-flex justify-content-end mb-3">
                <button className="btn btn-primary" onClick={() => navigate("/UpcomingTournamentsCards")}>
                    View All
                </button>
            </div>
            <div className="container text-center d-flex justify-content-around flex-wrap gap-9 mt-3" style={{ whiteSpace: "nowrap" }}>
                {tournament.slice(0, 4).map((tourna, index) => (
                    <div
                        key={index}
                        className="card bg-dark text-white shadow-sm rounded d-inline-block p-3 mx-2"
                        style={{ minWidth: "250px", minHeight: "250px", display: "inline-block", fontSize: "1rem" }}>
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
                                onClick={() => navigateToById(tourna._id)}>
                                Details
                            </button>
                            {/* Conditionally render Send Request button */}
                            {!token && ( // Agar token nahi hai toh button dikhaye
                                <button className="btn btn-success btn-sm"
                                    onClick={() => { Swal.fire("Sign-in Required", "Please sign in to send a request.", "warning") }}>
                                    Register
                                </button>
                            )}
                            {/* <button className="btn btn-success btn-sm"
                                onClick={() => navigateToRegister(tourna._id)}>
                                Register
                            </button> */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default UpcomingEvent;

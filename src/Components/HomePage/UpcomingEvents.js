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
    const role = useSelector((state) => state.User.user.role)

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
                <button className="btn btn-outline-light rounded-pill px-4 py-2" onClick={() => navigate("/UpcomingTournamentsCards")}>
                    View All
                </button>
            </div>
            <div className="container text-center d-flex justify-content-between flex-wrap gap-5 mt-3" style={{ whiteSpace: "nowrap" }}>
                {tournament.slice(0, 4).map((tourna, index) => (
                    <div
                        key={index}
                        className="card bg-dark text-white shadow-lg rounded-3 d-inline-block p-4 mx-2 my-3"
                        style={{ minWidth: "280px", maxWidth: "320px", fontSize: "1rem", transition: "transform 0.3s ease-in-out" }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                        onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                    >
                        <h6 className="text-primary mb-3" style={{ fontSize: "1.25rem", fontWeight: "600" }}>{tourna.TournamentName}</h6>
                        <p className="mb-2">
                            <strong>Organizer:</strong> {tourna.organizerId?.name || "Unknown"}
                        </p>
                        <p className="mb-2">
                            <strong>Start:</strong> {new Date(tourna.startDate).toLocaleDateString()}
                        </p>
                        <p className="mb-4">
                            <strong>End:</strong> {new Date(tourna.endDate).toLocaleDateString()}
                        </p>
                        <div className="d-flex justify-content-between">
                            <button
                                className="btn btn-info btn-sm rounded-pill"
                                onClick={() => navigateToById(tourna._id)}>
                                Details
                            </button>
                            {/* Conditionally render Send Request button */}
                            {!token ? ( // Agar token nahi hai toh ye button dikhaye
                                <button
                                    className="btn btn-success btn-sm rounded-pill"
                                    onClick={() => {
                                        Swal.fire("Sign-in Required", "Please sign in to send a request.", "warning");
                                    }}
                                >
                                    Register
                                </button>
                            ) : role === "organizer" ? (
                                null
                            ) : ( // Agar token hai toh ye button dikhaye
                                <button
                                    className="btn btn-success btn-sm rounded-pill"
                                    onClick={() => navigateToRegister(tourna._id)}
                                >
                                    Register
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default UpcomingEvent;

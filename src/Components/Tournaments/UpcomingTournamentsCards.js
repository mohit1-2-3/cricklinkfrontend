import { useEffect, useState } from "react";
import axios from "axios";
import url from "../../URL/url.js";
import { useNavigate } from "react-router-dom";

function UpcomingTournamentsCards() {
    const [activetournament, setactiveTournament] = useState([]);
    const [inactivetournament, setinactiveTournament] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        activeTournamentList();
        inactiveTournamentList();
    }, []);

    const activeTournamentList = async () => {
        try {
            let response = await axios.get(url.tournament.TOURNAMENT_LIST);
            let tournaments = response.data.tournaments.filter((tourna) => tourna.status === "active")
                .sort((first, second) => new Date(first.startDate) - new Date(second.startDate));
            console.log(tournaments);
            setactiveTournament(tournaments);
        } catch (err) {
            console.log(err.message);
        }
    };
    const inactiveTournamentList = async () => {
        try {
            let response = await axios.get(url.tournament.TOURNAMENT_LIST);
            let tournaments = response.data.tournaments.filter((tourna) => tourna.status === "inactive")
                .sort((first, second) => new Date(first.startDate) - new Date(second.startDate));
            console.log(tournaments);
            setinactiveTournament(tournaments);
        } catch (err) {
            console.log(err.message);
        }
    };
    const navigateToById = (id) => {
        console.log("tourna._id :" + id);
        navigate(`/tournamentById/${id}`);
    };

    const navigateToRegister = (id) => {
        console.log("navigating to registration");
        navigate(`/addTeam/${id}`);
    };
    return (
        <div className="container mt-4 text-white">

{/* ========================== Upcoming tournament======================== */}

            <h1 className="text-center mb-4 text-light text-decoration-underline" style={{ fontSize: '2.5rem' }}>Upcoming Events</h1>

            <div className="container text-white mt-5" id="tournamentContainer">
                {activetournament.map((tourna) => (
                    <div className="row event-row mb-5" key={tourna._id}>
                        {/* Date Section */}
                        <div className="col-2 date-section text-center mt-5">
                            <h2 style={{ fontSize: '1.8rem' }}>{new Date(tourna.startDate).toLocaleString("en", { weekday: "short" })}</h2>
                            <h2 style={{ fontSize: '2.2rem' }}>{new Date(tourna.startDate).getDate()}</h2>
                        </div>
                    
                        {/* Event Details Section */}
                        <div className="col-6">
                            <span style={{ fontSize: '1.2rem' }}>
                            {new Date(tourna.startDate).toLocaleDateString()} - {new Date(tourna.endDate).toLocaleDateString()}
                            </span>
                            
                            <h1
                                style={{ cursor: 'pointer', fontSize: '2rem' }}
                                onClick={() => navigateToById(tourna._id)}>
                                {tourna.TournamentName}
                            </h1>
                            <h4>Organizer : {tourna.organizerId.name}</h4>
                            <p style={{ fontSize: '1.1rem' }}>{tourna.address}</p>
                            <p style={{ fontSize: '1rem' }}>
                                {tourna.description || "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores nostrum laboriosam."}
                            </p>
                            <h2 style={{ fontSize: '1.5rem' }}>&#8377; {tourna.fees}</h2>
                            <button
                                className="btn btn-success btn-sm mt-2"
                                onClick={() => navigateToRegister(tourna._id)}>
                                Register
                            </button>
                            <button
                                className="btn btn-primary btn-sm mt-2" style={{ marginLeft: '80px' }}
                                onClick={() => navigateToById(tourna._id)}>
                                View
                            </button>
                            <hr></hr>
                        </div>                     
                    </div>
                    
                ))}
                
            </div>


{/* ================ Completed tournament================================ */}

            <h1 className="text-center mb-4 text-light text-decoration-underline" style={{ fontSize: '2.5rem' }}>Completed Events</h1> 
            <div className="container text-white mt-5" id="tournamentContainer">
                {inactivetournament.map((tourna) => (
                    <div className="row event-row mb-5" key={tourna._id}>
                        {/* Date Section */}
                        <div className="col-2 date-section text-center mt-5">
                            <h2 style={{ fontSize: '1.8rem' }}>{new Date(tourna.startDate).toLocaleString("en", { weekday: "short" })}</h2>
                            <h2 style={{ fontSize: '2.2rem' }}>{new Date(tourna.startDate).getDate()}</h2>
                        </div>
                    
                        {/* Event Details Section */}
                        <div className="col-6">
                            <span style={{ fontSize: '1.2rem' }}>
                            {new Date(tourna.startDate).toLocaleDateString()} - {new Date(tourna.endDate).toLocaleDateString()}
                            </span>
                            
                            <h1
                                style={{ cursor: 'pointer', fontSize: '2rem' }}
                                onClick={() => navigateToById(tourna._id)}>
                                {tourna.TournamentName}
                            </h1>
                            <h4>Organizer : {tourna.organizerId.name}</h4>
                            <p style={{ fontSize: '1.1rem' }}>{tourna.address}</p>
                          
                            <h2 style={{ fontSize: '1.5rem' }}>&#8377; {tourna.fees}</h2>
                            <button
                                className="btn btn-primary btn-sm mt-2" style={{ marginLeft: '80px' }}
                                onClick={() => navigateToById(tourna._id)}>
                                View
                            </button>
                            <hr></hr>                      

                        </div>
                    </div>
                ))}
            </div>
        </div>
        
    );
}

export default UpcomingTournamentsCards;

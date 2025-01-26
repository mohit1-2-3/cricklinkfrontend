import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import url from "../../URL/url.js";


export function UpdateSchedule() {

    const params = useParams();
    const [formData, setFormData] = useState({
        matchId: "",
        tournamentId: params.id,
        team1_name: "",
        team2_name: "",
        venue: "",
        winner: {},
        score: "",
        date: "",
    });
    const [responseMessage, setResponseMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
        console.log("form data : " + formData)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("tournament schedule updating : " + params.id)
            const response = await axios.post(url.tournament.ADD_MATCH + `/createMatches`, formData);
            console.log("response : " + response.data.message)
            matchAddToTournament(formData.matchId);
        } catch (error) {
            if (error.response) {
                setResponseMessage(error.response.data.message || "Error occurred.");
            } else {
                setResponseMessage("Network error. Please try again.");
            }
        }
    };

    const matchAddToTournament = async (matchId) => {
        try {
            console.log("match id in adding to tournament : " + matchId);
            // let matchObjId = formData.matchId;

            const findMatch = await axios.post(url.tournament.ADD_MATCH + `/findMatches`, { matchId })
            console.log("match : " + findMatch.data);
            const matchData = findMatch.data; 
            const matchObj = matchData[0];                   // Error

            if (findMatch) {
                // const matchObjId = findMatch.data._id;
                console.log("gotMatchObjId : " + matchObj);

                const response = await axios.patch(url.tournament.TOURNAMENT_BY_ID + `/updateTournament/${params.id}`, { matchObj });
                console.log("response : " + response.data);

                setResponseMessage(`match schedule : ${response.data}`);
                if (response.data && response.data.insert) {
                    setResponseMessage(`Tournament Created: ${response.data.insert.TournamentName}`);
                    setErrorMessage(""); // Clear error messages
                } else {
                    setErrorMessage("Unexpected response format");
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div style={{ padding: "20px", maxWidth: "800px", margin: "auto"}}>
            <h2>Update Tournament Schedule</h2>
            <div className="alert-success mb-4">
                {responseMessage && <p className="alert alret-success">{responseMessage}</p>}
                {errorMessage && <p className="alert alert-danger">Sorry! {errorMessage}</p>}
            </div>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "10px" }}>
                    <label htmlFor="tournamentId">Match ID:</label>
                    <input
                        type="text"
                        name="matchId"
                        value={formData.matchId}
                        onChange={handleInputChange}
                        required
                        style={{ width: "100%", padding: "8px", color:"black"}}
                    />
                </div>
                <div style={{ marginBottom: "10px" }}>
                    <label htmlFor="matchId">Team 1:</label>
                    <input
                        type="text"
                        name="team1_name"
                        value={formData.team1_name}
                        onChange={handleInputChange}
                        required
                        style={{ width: "100%", padding: "8px", color:"black" }}
                    />
                </div>
                <div style={{ marginBottom: "10px" }}>
                    <label htmlFor="matchId">Team 2 :</label>
                    <input
                        type="text"
                        name="team2_name"
                        value={formData.team2_name}
                        onChange={handleInputChange}
                        required
                        style={{ width: "100%", padding: "8px", color:"black" }}
                    />
                </div>
                <div style={{ marginBottom: "10px" }}>
                    <label htmlFor="matchId">Date :</label>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        required
                        style={{ width: "100%", padding: "8px", color:"black" }}
                    />
                </div>
                <div style={{ marginBottom: "10px" }}>
                    <label htmlFor="matchId">Venue :</label>
                    <input
                        type="text"
                        name="venue"
                        value={formData.venue}
                        onChange={handleInputChange}
                        required
                        style={{ width: "100%", padding: "8px", color:"black" }}
                    />
                </div>
                <button
                    type="submit"
                    style={{
                        backgroundColor: "#28a745",
                        color: "white",
                        padding: "10px",
                        border: "none",
                        cursor: "pointer",
                    }}>
                    Update Schedule
                </button>
            </form>
        </div>
    );
}
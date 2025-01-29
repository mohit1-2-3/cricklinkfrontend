import { useNavigate, useParams, useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import url from "../../URL/url.js";
import { useSelector } from "react-redux";
import Swal from 'sweetalert2';

const TournamentById = () => {
  const params = useParams();
  const { state } = useLocation();
  const id = useSelector((state) => state.User.user._id);
  const role = useSelector((state) => state.User.user.role);
  const token = useSelector((state) => state.User?.token);

  const [tournament, setTournament] = useState({});
  const [result, setResult] = useState({ team_name: "", matchId: "", score: null });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [status, setStatus] = useState({});
  const navigate = useNavigate();


  useEffect(() => {
    getTournamentbyId();
  }, []);

  const goToTeamRegistration = (id) => {
    navigate(`/addTeam/${id}`);
  };

  const updateTournament = (id) => {
    navigate(`/UpdateTournament/${id}`);
  };

  // const handleResult = async (matchId) => {
  //   navigate(`scheduleResult/${matchId}`);
  // };

  const getTournamentbyId = async () => {
    try {
      let response = await axios.get(url.tournament.TOURNAMENT_BY_ID + `/tournamentById/${params.id}`);
      setTournament(response.data.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setResult({ ...result, [name]: value })
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log("Submitting result for Match ID:", result.matchId);
  
      const response = await axios.patch(`http://localhost:3001/match/result/${result.matchId}`, result);
      console.log("Response from server:", response.data.message);
  
      // Success message set karein
      setSuccessMessage(response.data.message);
      setErrorMessage("");
  
      // Tournament state update karein for the specific match
      setTournament((prevTournament) => {
        const updatedSchedule = prevTournament.schedule.map((match) => {
          if (match.matchId?._id === result.matchId) {
            // Match ka result update karen
            return {
              ...match,
              result: {
                winnerId: {
                  teamName: result.team_name,
                },
              },
            };
          }
          return match;
        });
        return {
          ...prevTournament,
          schedule: updatedSchedule,
        };
      });
  
      // Status state ko false karein for the submitted match
      setStatus((prevStatus) => ({
        ...prevStatus,
        [result.matchId]: false,
      }));
  
      // Form clear karein
      setResult({ team_name: "", matchId: "", score: null });
  
    } catch (err) {
      console.error("Error occurred:", err.response?.data || err.message);
      setErrorMessage(err.response?.data?.err || "Internal server error. Please try again later.");
    }
  };


  return (
    <div style={{ backgroundColor: "white", width: "100%" }}>
      {/* Hero Section */}
      <div className="hero-section text-dark p-4 mb-4" style={{ backgroundColor: "#ffffff", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
        <h1 className="text-center" style={{ fontWeight: "bold", fontSize: "2.5rem", color: "#007BFF" }}>
          {tournament.TournamentName}
        </h1>
        <h3 className="text-muted text-center" style={{ fontSize: "1.2rem" }}>
          Organized by:{" "}
          <Link
            to="/OrganizerMyProfile"
            state={{ id: tournament.organizerId?._id }}
            style={{ color: "#007BFF", fontWeight: "bold" }}
          >
            {tournament.organizerId?.name || "N/A"}
          </Link>
        </h3>
      </div>

      <div className="row">

        {/* Left Column: Teams Section */}
        <div className="col-md-6 mb-4">
          {/* Entry Fees & Dates Section */}
          <div className="row mb-4">
            <div className="col-md-6 offset-md-3 text-center">
              <h4 className="text-primary" style={{ fontWeight: "bold", fontSize: "1.5rem" }}>Entry Fees & Dates</h4>
              <p style={{ fontSize: "1.2rem", color: "#666" }}><strong style={{ fontSize: "1.2rem", color: "#666" }}>Entry Fees:</strong> {tournament.entry_fees || "0"} rs</p>
              <p style={{ fontSize: "1.2rem", color: "#666" }}><strong style={{ fontSize: "1.2rem", color: "#666" }}>Start Date:</strong> {tournament.startDate ? new Date(tournament.startDate).toLocaleDateString() : "N/A"}</p>
              <p style={{ fontSize: "1.2rem", color: "#666" }}><strong style={{ fontSize: "1.2rem", color: "#666" }}>End Date:</strong> {tournament.endDate ? new Date(tournament.endDate).toLocaleDateString() : "N/A"}</p>
            </div>
          </div>
          <hr></hr>
          <h4 className="text-primary text-center" style={{ fontWeight: "bold", fontSize: "1.5rem" }}>Teams Participating</h4>
          <ul className="text-center" style={{ listStyleType: "none", padding: "0" }}>
            {tournament.teams?.length ? (
              tournament.teams.map((team, index) => (
                <li key={index} style={{ padding: "10px", borderBottom: "1px solid #ddd", backgroundColor: "#ffffff" }}>
                  <span style={{ fontSize: "1.2rem", color: "#333", fontWeight: "bold" }}>Team {index + 1} </span>
                  <Link to={`/Team/${team.teamId?._id}`} style={{ color: "#007BFF", fontSize: "1.2rem", fontWeight: "bold" }}>
                    {team.teamId?.teamName || "Unnamed Team"}

                  </Link>
                </li>
              ))
            ) : (
              <li className="text-muted text-center" style={{ backgroundColor: "#ffffff", fontSize: "1.2rem" }}>No teams registered yet.</li>
            )}
          </ul>
        </div>

        {/* Right Column: Schedule Section */}
        <div className="col-md-6 mb-4">
          <h4 className="text-primary text-center" style={{ fontWeight: "bold", fontSize: "1.5rem" }}>Tournament Schedule</h4>
          <ul style={{ listStyleType: "none", padding: "0" }}>
            {tournament.schedule?.length ? (
              tournament.schedule.map((match, index) => (

                <li key={index} style={{ padding: "10px", borderBottom: "1px solid #ddd", backgroundColor: "#ffffff" }}>
                  <strong style={{ fontSize: "1.2rem", color: "#333" }}>Match {index + 1}</strong><br />
                  <p style={{ fontSize: "1.1rem", color: "#333" }}>{match.matchId?.team1?.teamName || "N/A"} vs {match.matchId?.team2?.teamName || "N/A"}</p>
                  <small style={{ fontSize: "1rem", color: "#666" }}>{new Date(match.matchId?.date).toLocaleDateString()} | {match.matchId?.venue || "N/A"}</small>
                  <p className="text-dark">Winner : {match.result?.winnerId?.teamName}</p>
                  <p className="text-dark">Score : {match.result?.score}</p>

                  {successMessage && <p className="alert alret-success text-dark">{successMessage}</p>}
                  {errorMessage && <p className="alert alert-danger text-dark">Sorry! {errorMessage}</p>}

                  {status[match.matchId?._id] &&
                    <form onSubmit={handleFormSubmit} method="patch">
                      <div className="mb-1">

                        <input
                          type="hidden"
                          name="matchId"
                          id="matchId"
                          value={match.matchId?._id}
                        />


                        <label className="form-label text-dark">
                          Winning Team
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="team_name"
                          id="team_name"
                          value={result.team_name}
                          placeholder="Enter Winner Team"
                          onChange={handleInputChange} required />
                      </div>

                      <div className="mb-3">
                        <label className="form-label text-dark">
                          Score
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="score"
                          id="score"
                          value={result.score}
                          placeholder="Enter score"
                          onChange={handleInputChange} required />
                      </div>

                      <button type="submit" className="btn btn-success">
                        Submit
                      </button>
                    </form>
                  }

                  <div className="d-flex justify-content-between mt-2">
                    {!status[match.matchId?._id] && token ? (
                      <button
                        className="btn btn-outline-primary btn-sm"
                        onClick={() => {
                          setStatus((prevStatus) => ({
                            ...prevStatus,
                            [match.matchId?._id]: true,
                          }));
                          setResult((prevResult) => ({
                            ...prevResult,
                            matchId: match.matchId?._id,
                          }));
                        }}
                      >
                        Update Result
                      </button>
                    ) : null }


                  </div>
                </li>
              ))
            ) : (
              <li className="text-muted text-center" style={{ backgroundColor: "#ffffff", fontSize: "1.2rem" }}>No matches scheduled.</li>
            )}
          </ul>
        </div>
      </div>



      {/* Registration/Update Button */}
      <div className="text-center">
        <button
          className={`btn btn-lg ${!token ? "btn-warning" : "btn-success"}`}
          onClick={() => {
            if (!token) {
              Swal.fire("Sign-in Required", "Please sign in to register for the tournament.", "warning");
            } else if (id === tournament?.organizerId?._id) {
              updateTournament(tournament._id);
            } else if (tournament.status !== "inactive") {
              goToTeamRegistration(tournament._id);
            }
          }}
          style={{
            padding: "12px 30px",
            fontSize: "1.1rem",
            borderRadius: "5px",
            fontWeight: "bold",
            marginTop: "20px",
          }}
        >
          {id === tournament?.organizerId?._id ? "Update Tournament" : "Register"}
        </button>
      </div>
    </div>
  );
};

export default TournamentById;


//=====================================================================


// import { useNavigate, useParams, useLocation, Link } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import url from "../../URL/url.js";
// import { useSelector } from "react-redux";
// import Swal from 'sweetalert2';

// const TournamentById = () => {
//   const params = useParams();
//   const { state } = useLocation();
//   const id = useSelector((state) => state.User.user._id);
//   const role = useSelector((state) => state.User.user.role);
//   const token = useSelector((state) => state.User?.token);

//   const [tournament, setTournament] = useState({});
//   const [result, setResult] = useState({ team_name: "", matchId: "", score: null });
//   const [successMessage, setSuccessMessage] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [status, setStatus] = useState({});
//   const navigate = useNavigate();

//   useEffect(() => {
//     getTournamentbyId();
//   }, []);

//   const goToTeamRegistration = (id) => {
//     navigate(`/addTeam/${id}`);
//   };

//   const updateTournament = (id) => {
//     navigate(`/UpdateTournament/${id}`);
//   };

//   const getTournamentbyId = async () => {
//     try {
//       let response = await axios.get(url.tournament.TOURNAMENT_BY_ID + `/tournamentById/${params.id}`);
//       setTournament(response.data.data[0]);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setResult({ ...result, [name]: value });
//   };

//   const handleFormSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       console.log("Submitting result for Match ID:", result.matchId);
//       const response = await axios.patch(`http://localhost:3001/match/result/${result.matchId}`, result);
//       setSuccessMessage(response.data.message);
//       setErrorMessage("");
//       setTournament((prevTournament) => {
//         const updatedSchedule = prevTournament.schedule.map((match) => {
//           if (match.matchId?._id === result.matchId) {
//             return {
//               ...match,
//               result: { winnerId: { teamName: result.team_name } },
//             };
//           }
//           return match;
//         });
//         return { ...prevTournament, schedule: updatedSchedule };
//       });
//       setStatus((prevStatus) => ({ ...prevStatus, [result.matchId]: false }));
//       setResult({ team_name: "", matchId: "", score: null });
//     } catch (err) {
//       setErrorMessage(err.response?.data?.err || "Internal server error. Please try again later.");
//     }
//   };

//   return (
//     <div className="container py-4" style={{ backgroundColor: "#f8f9fa" }}>
//       <div className="card shadow-sm p-4 mb-4">
//         <h1 className="text-primary text-center">{tournament.TournamentName}</h1>
//         <h3 className="text-muted text-center">
//           Organized by: <Link to="/OrganizerMyProfile" state={{ id: tournament.organizerId?._id }}>{tournament.organizerId?.name || "N/A"}</Link>
//         </h3>
//       </div>

//       <div className="row">
//         <div className="col-md-6 mb-4">
//           <div className="card p-4">
//             <h4 className="text-primary">Entry Fees & Dates</h4>
//             <p style={{color:"black"}}><strong style={{color:"black"}}>Entry Fees:</strong> {tournament.entry_fees || "0"} rs</p>
//             <p style={{color:"black"}}><strong style={{color:"black"}}>Start Date:</strong> {tournament.startDate ? new Date(tournament.startDate).toLocaleDateString() : "N/A"}</p>
//             <p style={{color:"black"}}><strong style={{color:"black"}}>End Date:</strong> {tournament.endDate ? new Date(tournament.endDate).toLocaleDateString() : "N/A"}</p>
//           </div>
//           <div className="card p-4 mt-4">
//             <h4 className="text-primary">Teams Participating</h4>
//             <ul className="list-group">
//               {tournament.teams?.length ? (
//                 tournament.teams.map((team, index) => (
//                   <li key={index} className="list-group-item">
//                     Team {index + 1} - <Link to={`/Team/${team.teamId?._id}`} className="text-primary">{team.teamId?.teamName || "Unnamed Team"}</Link>
//                   </li>
//                 ))
//               ) : (
//                 <li className="list-group-item text-muted" style={{color:"black"}}>No teams registered yet.</li>
//               )}
//             </ul>
//           </div>
//         </div>
//         <div className="col-md-6 mb-4">
//           <div className="card p-4">
//             <h4 className="text-primary">Tournament Schedule</h4>
//             <ul className="list-group">
//               {tournament.schedule?.length ? (
//                 tournament.schedule.map((match, index) => (
//                   <li key={index} className="list-group-item" style={{color:"black"}}>
//                     <strong style={{color:"black"}}>Match {index + 1}:</strong> {match.matchId?.team1?.teamName || "N/A"} vs {match.matchId?.team2?.teamName || "N/A"}<br />
//                     <small style={{color:"black"}}>{new Date(match.matchId?.date).toLocaleDateString()} | {match.matchId?.venue || "N/A"}</small>
//                     <p style={{color:"black"}}>Winner: {match.result?.winnerId?.teamName}</p>
//                     <p style={{color:"black"}}>Score: {match.result?.score}</p>
//                   </li>
//                 ))
//               ) : (
//                 <li className="list-group-item text-muted">No matches scheduled.</li>
//               )}
//             </ul>
//           </div>
//         </div>
//       </div>

//       <div className="text-center">
//         <button className={`btn ${!token ? "btn-warning" : "btn-success"} btn-lg mt-3`} onClick={() => {
//           if (!token) {
//             Swal.fire("Sign-in Required", "Please sign in to register for the tournament.", "warning");
//           } else if (id === tournament?.organizerId?._id) {
//             updateTournament(tournament._id);
//           } else if (tournament.status !== "inactive") {
//             goToTeamRegistration(tournament._id);
//           }
//         }}>
//           {id === tournament?.organizerId?._id ? "Update Tournament" : "Register"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default TournamentById;

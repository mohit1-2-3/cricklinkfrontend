import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import url from "../../URL/url.js";

// const ParticularTournament = () => {
//     const params = useParams();
//     const [tournament, setTournament] = useState({});
//     const navigate = useNavigate();

//     useEffect(() => {
//         getTournamentbyId();
//     }, []);

//     const goToTeamRegistration = (id) => {
//         navigate(`/addTeam/${id}`)
//     }
//     const getTournamentbyId = async () => {
//         try {
//           console.log("tournament by id...."+params.id)
//           console.log(url.tournament.TOURNAMENT_BY_ID);
//             let response = await axios.get(url.tournament.TOURNAMENT_BY_ID + `/tournamentById/${params.id}`);
//             console.log("data : "+response.data)
//             console.log(response.data);
//             setTournament(response.data.data);
//         }
//         catch (error) {
//             console.log(error);
//         }
//     }

//     // return(
//     // <>
//     //      <div className="container mt-8">
//     //             <div className="row">
//     //                 <div className="col-md p-2">
//     //                     <div className="d-flex flex-column" style={{ boxShadow: "10px 10px 10px grey", height: "300px" }}>
//     //                         <h2>Tournament Name : {tournament.TournamentName}</h2>
//     //                         <p>Organizer Name : {tournament.organizerId?.name}</p>
                            
//     //                         <strong>Schedule : </strong>
//     //                         <ul>{tournament.schedule?.map((data, index)=>(
//     //                             <div key={index}>
//     //                             <li>Team 1 : {data.matchId?.team1?.teamName}</li>
//     //                             <li>Team 2 : {data.matchId?.team2?.teamName}</li>
//     //                             <li>date : {data.matchId?.date}</li>
//     //                             </div>
//     //                             ))}
//     //                             </ul>
//     //                         <p>Start Date : {tournament.startDate}</p>
//     //                         <p>End Date : {tournament.endDate}</p>
//     //                         <button className="btn btn-success" onClick={()=>goToTeamRegistration(tournament._id)}>Register</button>
//     //                     </div>
//     //                 </div>
//     //             </div>
//     //         </div>
//     // </>
//     // );

//     return (
//         <div className="container mt-5">
//           <div className="card bg-dark text-white shadow-lg border-0 rounded">
//             <div className="card-header bg-dark text-center">
//               <h2>{tournament.TournamentName}</h2>
//               <p>Organized By : <h4>{tournament.organizerId?.name || "N/A"}</h4></p>
//             </div>
//             <div className="card-body">
//               <h4 className="text-warning">Teams</h4>
//               <ul className="list-group mb-4">
//                 {tournament.teams?.length ? (
//                   tournament.teams.map((team, index) => (
//                     <li key={index} className="list-group-item bg-secondary text-white">
//                       🟢 {team.teamId?.teamName || "Unnamed Team"}
//                     </li>
//                   ))
//                 ) : (
//                   <li className="list-group-item text-muted">No teams participated.</li>
//                 )}
//               </ul>
      
//               <h4 className="text-warning">Schedule</h4>
//               <ul className="list-group">
//                 {tournament.schedule?.length ? (
//                   tournament.schedule.map((match, index) => (
//                     <li key={index} className="list-group-item bg-secondary text-white">
//                       <strong>Match {index + 1}:</strong> {match.matchId?.team1?.teamName || "N/A"} vs{" "}
//                       {match.matchId?.team2?.teamName || "N/A"}<br />
//                       {new Date(match.matchId?.date).toLocaleDateString()} | {match.matchId?.venue || "N/A"}
//                     </li>
//                   ))
//                 ) : (
//                   <li className="list-group-item text-muted">No matches scheduled.</li>
//                 )}
//               </ul>
      
//               <div className="mt-3 text-center">
//                 <p><strong>Start:</strong> {new Date(tournament.startDate).toLocaleDateString()}</p>
//                 <p><strong>End:</strong> {new Date(tournament.endDate).toLocaleDateString()}</p>

//                 <button className="btn btn-warning" onClick={() => goToTeamRegistration(tournament._id)}>
//                   Register for Tournament
//                 </button>
//                 <button className="btn btn-primary">{tournament.status}</button>
//               </div>
//             </div>
//           </div>
//         </div>
//       );
      
      
// }

// export default ParticularTournament;



const TournamentById = () => {
    const params = useParams();
    const { state } = useLocation();
    console.log("id : "+params.id)
    const [tournament, setTournament] = useState({});
    const [tournamentTeams, setTournamentTeams] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        getTournamentbyId();
    }, [params.id]);

    const goToTeamRegistration = (id) => {
        navigate(`/addTeam/${id}`)
    }
    const getTournamentbyId = async () => {
        try {
            let response = await axios.get(url.tournament.TOURNAMENT_BY_ID + `/tournamentById/${params.id}`);
            console.log(response.data.data[0]);
            setTournament(response.data.data[0]);
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="container mt-5">
          <div className="card bg-dark text-white shadow-lg border-0 rounded">
            <div className="card-header bg-dark text-center">
              <h2>{tournament.TournamentName}</h2>
              <p>Organized By : <h4>{tournament.organizerId?.name || "N/A"}</h4></p>
            </div>
            <div className="card-body">
              <h4 className="text-warning">Teams</h4>
              <ul className="list-group mb-4">
                {tournament.teams?.length ? (
                  tournament.teams.map((team, index) => (
                    <li key={index} className="list-group-item bg-secondary text-white">
                      🟢 {team.teamId?.teamName || "Unnamed Team"}
                    </li>
                  ))
                ) : (
                  <li className="list-group-item text-muted">No teams participated.</li>
                )}
              </ul>
      
              <h4 className="text-warning">Schedule</h4>
              <ul className="list-group">
                {tournament.schedule?.length ? (
                  tournament.schedule.map((match, index) => (
                    <li key={index} className="list-group-item bg-secondary text-white">
                      <strong>Match {index + 1}:</strong> {match.matchId?.team1?.teamName || "N/A"} vs{" "}
                      {match.matchId?.team2?.teamName || "N/A"}<br />
                      {new Date(match.matchId?.date).toLocaleDateString()} | {match.matchId?.venue || "N/A"}
                    </li>
                  ))
                ) : (
                  <li className="list-group-item text-muted">No matches scheduled.</li>
                )}
              </ul>
      
              <div className="mt-3 text-center">
                <p><strong>Start:</strong> {new Date(tournament.startDate).toLocaleDateString()}</p>
                <p><strong>End:</strong> {new Date(tournament.endDate).toLocaleDateString()}</p>

                <button className="btn btn-warning" onClick={() => goToTeamRegistration(tournament._id)}>
                  Register for Tournament
                </button>
                <button className="btn btn-primary">{tournament.status}</button>
              </div>
            </div>
          </div>
        </div>
      );
      
      
}

export default TournamentById;
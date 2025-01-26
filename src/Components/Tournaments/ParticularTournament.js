import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import url from "../../URL/url.js";
import { useSelector } from "react-redux";
import Swal from 'sweetalert2';


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
  const params = useParams();   // tournament id
  const { state } = useLocation();
  console.log("id : " + params.id);
  const id = useSelector((state) => state.User.user._id);
  const role = useSelector((state) => state.User.user.role);
  const token = useSelector((state) => state.User?.token);

  const [tournament, setTournament] = useState({});
  const [tournamentTeams, setTournamentTeams] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getTournamentbyId();
  }, []);

  const goToTeamRegistration = (id) => {
    navigate(`/addTeam/${id}`)
  }

  const updateTournament = (id) => {

  }
  const getTournamentbyId = async () => {
    try {
      let response = await axios.get(url.tournament.TOURNAMENT_BY_ID + `/tournamentById/${params.id}`);
      console.log("RESPONSE : "+ response.data?.data[0]);
      setTournament(response.data.data[0]);
      console.log("tournament detail : ", tournament.organizerId?._id);
      console.log("Organizer id 2 : " + tournament.organizerId?._id)
      console.log("selector id : " + id);
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

          <div className="mt-3 text-center" style={{ fontSize: "1rem" }}>
            <p><strong></strong> {tournament.venue}</p>
            <p><strong>Entry Fees:</strong> {tournament.entry_fees}</p>

            <p><strong>Start:</strong> {new Date(tournament.startDate).toLocaleDateString()}</p>
            <p><strong>End:</strong> {new Date(tournament.endDate).toLocaleDateString()}</p>


            <div className="col-md-2 col-1 offset-2 offset-md-2 d-flex justify-content-center">
              <button className="btn btn-primary">{tournament.status}</button>


              {!token ? ( // Agar token nahi hai toh ye button dikhaye
                <button className="btn btn-success btn-sm"
                  onClick={() => {
                    Swal.fire("Sign-in Required", "Please sign in to send a request.", "warning");
                  }}>
                  Register
                </button>
              ) : id === tournament?.organizerId?._id ? (
                <button
                  className="btn btn-info"
                  onClick={() => updateTournament(tournament._id)} >
                  Update Tournament
                </button>
              ) : tournament.status=="inactive" ?(
                null):( // Agar token hai toh ye button dikhaye
                <button className="btn btn-success btn-sm"
                  onClick={() => goToTeamRegistration(tournament._id)}>
                  Register
                </button>
              )}
            {/* <h2>User id : {id}</h2>
            <h2>organizer id : {tournament.organizerId}</h2> */}
              {/* 
              // {id == tournament.organizerId ? (
              //   <button
              //     className="btn btn-info"
              //     onClick={() => updateTournament(tournament._id)} >
              //     Update Tournament
              //   </button>
              // ) : (
              //   <button className="btn btn-warning" onClick={() => goToTeamRegistration(tournament._id)}>
              //     Register for Tournament
              //   </button>
              // )
              // } */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );


}

export default TournamentById;
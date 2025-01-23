// import { useEffect, useState } from "react";
// import axios from "axios";
// import url from "../../URL/url.js";
// import { useNavigate } from "react-router-dom";

// function Matches() {
//     const [match, setMatch] = useState([]);
//     const navigate = useNavigate();

//     useEffect(() => {
//         MatchList();
//     }, []);

//     const MatchList = async () => {
//         try {
//             let response = await axios.get(url.match.MATCH_LIST)
//                 .sort((first, second) => new Date(first.startDate) - new Date(second.startDate));
//             console.log(response.data);
//             setMatch(response.data);
//         } catch (err) {
//             console.log(err.message);
//         }
//     };

//     return (
//         <div className="container mt-4 text-white">
//             <h1 className="text-center mb-4 text-light">Upcoming Events</h1>
//             <div className="d-flex justify-content-end mb-3">
//                 <button className="btn btn-primary" onClick={() => navigate("/UpcomingTournamentsCards")}>
//                     View All
//                 </button>
//             </div>
//             <div className="d-flex overflow">

//                 {match.map((mat, index) => (
//                     <div
//                         key={index}
//                         className="card bg-dark text-white shadow-sm border rounded p-3 mx-2"
//                         style={{ minWidth: "250px" }}>
//                     <p>
//                             <strong>participating temas:</strong> {mat.team1.teamName || "Unknown"} -  {mat.team2.teamName || "Unknown"}
//                         </p>
//                         <p>
//                             <strong>Date:</strong> {new Date(mat.date).toLocaleDateString()}
//                         </p>
//                         <p>
//                             <strong>Venue:</strong> {mat.venue || "Unknown"} -  {mat.team2.teamName || "Unknown"}
//                         </p>
//                         <p>
//                             <strong>Result:</strong>{mat.result.winnerId.teamName}
//                         </p>
//                         <p>
//                             <strong>Score:</strong>{mat.result.score}
//                         </p>
                        
//                         <div className="d-flex justify-content-between mt-2">
//                             <button
//                                 className="btn btn-info btn-sm"
//                                 onClick={() => navigateToById(tourna._id)}>
//                                 Details
//                             </button>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );


// }
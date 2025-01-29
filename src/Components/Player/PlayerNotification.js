// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// import { useSelector } from "react-redux";

// export const PlayerNotifications = () => {
//     const [notifications, setNotifications] = useState([]);
//     const [message, setMessage] = useState("");
//     const userId = useSelector((state) => state.User.user._id);
//     const [teams, setTeams] = useState([]);
//     const navigate = useNavigate();

//     useEffect(() => {
//         getNotifications();
//     }, []);

//     const getNotifications = async () => {
//         try {
//             let response = await axios.get(`http://localhost:3001/Team/notification/${userId}`);
//                 console.log("============================================", response.data);
//             setNotifications(response.data.message);
//             console.log("==================?????", response.data.message)
//         } catch (error) {
//             console.log("Error in getting notifications " + error);
//         }
//     }
//     useEffect(() => {
//         fetchTeams();
//     }, []);

//     const fetchTeams = async () => {
//         try {
//             const response = await axios.get("http://localhost:3001/Team/viewteam");
//             setTeams(response.data.Team);
//         } catch (error) {
//             console.log("Error fetching teams: ", error);
//         }
//     };

//     const ReqAccepted = async (userId, senderId) => {
//         try {
//             const team = teams.find((team) => team?.captainId._id === userId);
//             const teamId = team ? team._id : null;

//             if (!teamId) {
//                 setMessage("Team not found for the given captain.");
//                 return;
//             }

//             const status = "accepted";
//             const response = await axios.put("http://localhost:3001/Team/req-res", {
//                 status,
//                 playerId: senderId,
//                 teamId,

//             });
//             if (response.status === 200) {
//                 setMessage("Request accepted");
//                 alert("Request accepted!");

//                 // Update the notification status in the frontend
//                 setNotifications((prevNotifications) =>
//                     prevNotifications?.map((notice) => {
//                         console.log("Sender ID:", notice?.senderId);
//                         console.log("Receiver ID:", notice?.receiverId);

//                         if (notice?.senderId?._id === senderId && notice?.receiverId?._id === userId) {
//                             return { ...notice, status: "accepted" };  // Status ko update kar rahe hain
//                         }
//                         //  if (notice?.receiverId?._id === userId) {
//                         //      return { ...notice, status: "accepted" };  // Update captain's status
//                         //  }
//                         return notice;  // Agar match nahi hota, toh original notification return kar rahe hain
//                     })
//                 );
//             }
//         } catch (error) {
//             console.log("Error in accepting request: ", error);
//         }
//     };

//     const ReqRejected = async (userId, senderId) => {
//         try {
//             const team = teams.find((team) => team?.captainId._id === userId);
//             const teamId = team ? team._id : null;

//             console.log("ttttttttttt", teamId);


//             if (!teamId) {
//                 setMessage("Team not found for the given captain.");
//                 return;
//             }

//             const status = "rejected";
//             const response = await axios.put("http://localhost:3001/Team/req-res", {
//                 status,
//                 playerId: senderId,
//                 teamId,

//             });
//             if (response.status === 200) {
//                 setMessage("Request rejected");
//                 alert("Request rejected!");

//                 // Update the notification status in the frontend
//                 setNotifications((prevNotifications) =>
//                     prevNotifications?.map((notice) => {
//                         console.log("Sender ID:", notice?.senderId);
//                         console.log("Receiver ID:", notice?.receiverId);

//                         if (notice?.senderId?._id === senderId && notice?.receiverId?._id === userId) {
//                             return { ...notice, status: "rejected" };  // Status ko update kar rahe hain
//                         }
//                         // if (notice?.receiverId?._id === userId) {
//                         //     return { ...notice, status: "rejected" };  // Update captain's status
//                         // }
//                         return notice;  // Agar match nahi hota, toh original notification return kar rahe hain
//                     })
//                 );
//             }
//         } catch (error) {
//             console.log("Error in rejecting request: ", error);
//         }
//     }

//     return (
//         <div className="container mt-5">
//             <h2 className="text-center mb-4 text-light">Your Notifications</h2>
//             {message && (
//                 <div className="alert alert-success text-center" role="alert">
//                     {message}
//                 </div>
//             )}
//             <div>
//                 {notifications?.length === 0 ? (
//                     <div className="text-center mt-4">
//                         <div className="alert alert-info" role="alert">
//                             No notifications available at the moment.
//                         </div>
//                     </div>
//                 ) : (
//                     <div className="row">
//                         {notifications?.map((notice, index) => {
//                             const team = teams.find((team) => team?.captainId._id === userId);
//                             const isCaptain = team ? true : false;

//                             return (
//                                 <div key={notice?._id || notice?.senderId?._id} className="col-md-4 mb-4">
//                                     <div
//                                         className="card shadow-sm"
//                                         style={{ backgroundColor: "black", borderLeft: "4px solid #007bff" }}
//                                     >
//                                         <div className="card-body">
//                                             <h5 className="card-title text-primary">Notification Type: {notice?.type}</h5>
//                                             {notice.senderId && <p className="mb-1" style={{ fontSize: "1rem" }}><strong>Sender:</strong> {notice?.senderId?.name}</p>}
//                                             {notice.receiverId && <p className="mb-1" style={{ fontSize: "1rem" }}><strong>Receiver:</strong> {notice?.receiverId?.name}</p>}
//                                             <p className="card-text"><strong>Message:</strong> {notice?.message}</p>
//                                             <p className="card-text text-muted"><strong>Status:</strong> {notice?.status}</p>

//                                             {/* Buttons only for captain */}
//                                             {isCaptain && notice?.status === "pending" && (
//                                                 <div className="d-flex justify-content-end">
//                                                     <button
//                                                         className="btn btn-success btn-sm me-2"
//                                                         onClick={() => ReqAccepted(userId, notice?.senderId?._id)}
//                                                     >
//                                                         Accept
//                                                     </button>
//                                                     <button
//                                                         className="btn btn-danger btn-sm"
//                                                         onClick={() => ReqRejected(userId, notice?.senderId?._id)}
//                                                     >
//                                                         Reject
//                                                     </button>
//                                                 </div>
//                                             )}
//                                         </div>
//                                     </div>
//                                 </div>
//                             );
//                         })}

//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }
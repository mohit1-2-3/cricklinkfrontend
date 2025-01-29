// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// import url from "../../URL/url.js";
// import { useSelector } from "react-redux";


// export const PlayerNotifications = () => {
//     // const { state } = useLocation();
//     const navigate = useNavigate();
//     const id = useSelector((state) => state.User.user._id);
//     const [notifications, setNotifications] = useState([]);
//     const [status, setStatus] = useState("pending");
//     const [message, setMessage] = useState("");
    
//     const [teamId, setTeamId] = useState("");
//     const [playerId, setPlayerId] = useState("");
//     let params = useParams();
//     let accept = "Accept";
//     let reject = "Reject";


//     useEffect(() => {
//         getNotifications();
//     }, []);

//     const getNotifications = async () => {
//         try {
//             let response = await axios.get(`http://localhost:3001/user/notification/${id}`);
//             console.log(response.data);
//             setNotifications(response.data.message);
//             setTeamId(response.data.teamId);
//             setPlayerId(response.data.setPlayerId)
//         } catch (error) {
//             console.log("Error in getting notifications " + error);
//         }
//     }

//     const ReqRejected = async () => {
//         console.log("request rejected!")
//         reject = "Rejected";
//         accept = "";
//         setStatus("declined");
//     }

//     const ReqAccepted = async ( statusR, playerId, teamId) => {
//         try {
//             console.log("Team Id : "+ teamId + " Player Id : "+ playerId)
//             // const status = "accepted";
           
//             // const playerId = params.userId;

//             const response = await axios.put(`http://localhost:3001/Team/req-res2`, { statusR, playerId, teamId });
//             console.log("response : ", response.data);
//             setStatus("accepted");
//             console.log("joined team")
//             accept = "Accepted";
//             reject = "";
//             setMessage("request "+accept)
//         } catch (error) {
//             console.log("error in joining team : " + error)
//         }
//     }
//     return (
//         <div className="container mt-5">
//           <h2 className="text-center mb-4 text-light" style={{ fontSize: "2rem" }}>
//             Your Notifications
//           </h2>
//           {message && (
//             <div
//               className="alert alert-success text-center"
//               role="alert"
//               style={{ fontSize: "1.2rem" }}
//             >
//               {message}
//             </div>
//           )}
//           {notifications?.length === 0 ? (
//             <div className="text-center mt-4">
//               <div
//                 className="alert alert-info"
//                 role="alert"
//                 style={{ fontSize: "1.2rem" }}
//               >
//                 No notifications available at the moment.
//               </div>
//             </div>
//           ) : (
//             <div className="mt-3">
//               {notifications.map((notice, index) => (
//                 <div
//                   key={index}
//                   className="mb-3 p-3 rounded shadow-sm"
//                   style={{
//                     backgroundColor: "#121212",
//                     color: "#fff",
//                     border: "1px solid #444",
//                   }}
//                 >
//                   <h5
//                     className="mb-2 text-info"
//                     style={{ fontSize: "1.5rem", fontWeight: "bold" }}
//                   >
//                     Notification: {notice.type}
//                   </h5>
//                   <p className="mb-1" style={{ fontSize: "1.3rem" }}>
//                     <strong>Sent By:</strong> {notice.senderId?.name || "You"}
//                   </p>
//                   <p className="mb-1" style={{ fontSize: "1.3rem" }}>
//                     <strong>Received By:</strong> {notice.receiverId?.name || "You"}
//                   </p>
//                   <p className="mb-2" style={{ fontSize: "1.3rem" }}>
//                     <strong>Message:</strong> {notice.message}
//                   </p>
//                   <p
//                     className="text-muted"
//                     style={{ fontSize: "1.2rem", fontStyle: "italic" }}
//                   >
//                     <strong>Status:</strong> {notice.status}
//                   </p>
//                   {/* <div className="d-flex justify-content-end mt-2">
//                     <button
//                       className="btn btn-success btn-sm me-2"
//                       style={{ fontSize: "1.2rem" }}
//                       onClick={() =>
//                         ReqAccepted("accepted", notice.receiverId, notice.teamId)
//                       }
//                     >
//                       Accept
//                     </button>
//                     <button
//                       className="btn btn-danger btn-sm"
//                       style={{ fontSize: "1.2rem" }}
//                       onClick={() => ReqRejected("rejected", notice.teamId)}
//                     >
//                       Reject
//                     </button>
//                   </div> */}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       );
      
// }
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

export const PlayerNotifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [message, setMessage] = useState("");
    const userId = useSelector((state) => state.User.user._id);
    const [teams, setTeams] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getNotifications();
    }, []);

    const getNotifications = async () => {
        try {
            let response = await axios.get(`http://localhost:3001/Team/notification/${userId}`);
            console.log("============================================", response.data);
            setNotifications(response.data.message);
            console.log("==================?????", response.data.message)
        } catch (error) {
            console.log("Error in getting notifications " + error);
        }
    }
    useEffect(() => {
        fetchTeams();
    }, []);

    const fetchTeams = async () => {
        try {
            const response = await axios.get("http://localhost:3001/Team/viewteam"); 
            setTeams(response.data.Team);
        } catch (error) {
            console.log("Error fetching teams: ", error);
        }
    };

    const ReqAccepted = async (userId, senderId) => {
        try {
            const team = teams.find((team) => team?.captainId._id === userId);
            const teamId = team ? team._id : null;

            if (!teamId) {
                setMessage("Team not found for the given captain.");
                return;
            }

            const status = "accepted";
            const response = await axios.put("http://localhost:3001/Team/req-res", {
                status,
                playerId: senderId,
                teamId,

            });
            if (response.status === 200) {
                setMessage("Request accepted");
                alert("Request accepted!");

                // Update the notification status in the frontend
                setNotifications((prevNotifications) => 
                    prevNotifications?.map((notice) => {
                        console.log("Sender ID:", notice?.senderId);
                        console.log("Receiver ID:", notice?.receiverId);

                        if (notice?.senderId?._id === senderId && notice?.receiverId?._id === userId) {
                            return { ...notice, status: "accepted" };  // Status ko update kar rahe hain
                         }
                       
                        return notice;  
                    })
                );
            }
        } catch (error) {
            console.log("Error in accepting request: ", error);
        }
    };

    const ReqRejected = async (userId, senderId) => {
        try {
            const team = teams.find((team) => team?.captainId._id === userId);
            const teamId = team ? team._id : null;

            console.log("ttttttttttt", teamId);


            if (!teamId) {
                setMessage("Team not found for the given captain.");
                return;
            }

            const status = "rejected";
            const response = await axios.put("http://localhost:3000/Team/req-res", {
                status,
                playerId: senderId,
                teamId,

            });
            if (response.status === 200) {
                setMessage("Request rejected");
                alert("Request rejected!");

        
                setNotifications((prevNotifications) => 
                    prevNotifications?.map((notice) => {
                        console.log("Sender ID:", notice?.senderId);
                        console.log("Receiver ID:", notice?.receiverId);
                        
                        if (notice?.senderId?._id === senderId && notice?.receiverId?._id === userId) {
                            return { ...notice, status: "rejected" };  // Status ko update kar rahe hain
                        }
                       
                        return notice;  
                    })
                );
            }
        } catch (error) {
            console.log("Error in rejecting request: ", error);
        }
    }

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4 text-light">Your Notifications</h2>
            {message && (
                <div className="alert alert-success text-center" role="alert">
                    {message}
                </div>
            )}
            <div>
                {notifications?.length === 0 ? (
                    <div className="text-center mt-4">
                        <div className="alert alert-info" role="alert">
                            No notifications available at the moment.
                        </div>
                    </div>
                ) : (
                    <div className="row">
                       {notifications?.map((notice, index) => {
    const team = teams.find((team) => team?.captainId._id === userId);
    const isCaptain = team ? true : false;

    return (
        <div key={notice?._id || notice?.senderId?._id} className="col-md-4 mb-4">
            <div
                className="card shadow-sm"
                style={{ backgroundColor: "black", borderLeft: "4px solid #007bff" }}
            >
                <div className="card-body">
                    <h5 className="card-title text-primary">Notification Type: {notice?.type}</h5>
                    {notice.senderId && <p className="mb-1" style={{ fontSize: "1rem" }}><strong>Sender:</strong> {notice?.senderId?.name}</p>}
                    {notice.receiverId && <p className="mb-1" style={{ fontSize: "1rem" }}><strong>Receiver:</strong> {notice?.receiverId?.name}</p>}
                    <p className="card-text"><strong>Message:</strong> {notice?.message}</p>
                    <p className="card-text text-muted"><strong>Status:</strong> {notice?.status}</p>

                    {/* Buttons only for captain */}
                    {isCaptain && notice?.status === "pending" && (
                        <div className="d-flex justify-content-end">
                            <button
                                className="btn btn-success btn-sm me-2"
                                onClick={() => ReqAccepted(userId, notice?.senderId?._id)}
                            >
                                Accept
                            </button>
                            <button
                                className="btn btn-danger btn-sm"
                                onClick={() => ReqRejected(userId, notice?.senderId?._id)}
                            >
                                Reject
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
})}

                    </div>
                )}
            </div>
        </div>
    );
}
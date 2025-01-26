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
//             let response = await axios.get(`http://localhost:3000/user/notification/${id}`);
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

//             const response = await axios.put(`http://localhost:3000/Team/req-res2`, { statusR, playerId, teamId });
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
            let response = await axios.get(`http://localhost:3000/Team/notification/${userId}`);
            console.log(response.data);
            setNotifications(response.data.message);
        } catch (error) {
            console.log("Error in getting notifications " + error);
        }
    }
    useEffect(() => {
        fetchTeams();
    }, []);
    
    const fetchTeams = async () => {
        try {
            const response = await axios.get("http://localhost:3000/Team/viewteam"); // API से सभी टीमों का डेटा फेच करें
            setTeams(response.data.Team); // टीम डेटा को स्टेट में सेव करें
        } catch (error) {
            console.log("Error fetching teams: ", error);
        }
    };

    const ReqRejected = async (notificationId) => {
        try {
            console.log("Request rejected!");
            const status = "rejected";
            const response = await axios.put("http://localhost:3000/Team/req-res", { status, playerId: userId, notificationId });
            console.log("response: ", response.data);
            setMessage("Request rejected");
            getNotifications(); // Refresh the notifications list
        } catch (error) {
            console.log("Error in rejecting request: " + error);
        }
    }
    
    
    // const ReqAccepted = async (notificationId, teamId) => {
    //     try {
    //         console.log("Request accepted!");
    //         const status = "accepted";
    //         const response = await axios.put("http://localhost:3001/Team/req-res", { status, playerId: userId, teamId, notificationId });
    //         console.log("response: ", response.data);
    //         setMessage("Request accepted");
    //         getNotifications(); // Refresh the notifications list
    //     } catch (error) {
    //         console.log("Error in accepting request: " + error);
    //     }
    // }

    const ReqAccepted = async (notificationId,userId ,senderId) => {
        try {
            // कप्तान के नाम से टीम का teamId निकालें

            console.log("notification id : "+notificationId);
            console.log("user id : "+userId)
            console.log("team Id : "+teams)
            const team = teams.find((team) => team?.captainId._id === userId);
            const teamId = team ? team._id : null;
    console.log("===========",team)
            if (!teamId) {
                setMessage("Team not found for the given captain.");
                return;
            }
    
            console.log("Request accepted!");
            const status = "accepted";
            const response = await axios.put("http://localhost:3000/Team/req-res", {
                status,
                playerId:senderId,
                teamId,
                notificationId,
            });
            console.log("response: ", response.data);
            setMessage("Request accepted");
            getNotifications(); // Notifications को रिफ्रेश करें
        } catch (error) {
            console.log("Error in accepting request: " + error);
        }
    };
    
   

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
                    <div className="list-group">
                        {notifications?.map((notice, index) => (
                            <div 
                                key={index} 
                                className="list-group-item list-group-item-action mb-3 shadow-sm p-3 rounded"
                                style={{ backgroundColor: "black", borderLeft: "4px solid #007bff" }}
                            >
                                <h5 className="mb-2 text-primary">Notification Type: {notice.type}</h5>
                                {notice.senderId && <p className="mb-1" style={{ fontSize: "1rem" }}><strong>Sender:</strong> {notice.senderId.name}</p>}
                                {notice.receiverId && <p className="mb-1" style={{ fontSize: "1rem" }}><strong>Receiver:</strong> {notice.receiverId.name}</p>}
                                <p className="mb-2" style={{ fontSize: "1rem" }}><strong>Message:</strong> {notice.message}</p>
                                <p className="text-muted" style={{ fontSize: "1rem" }}><strong>Status:</strong> {notice.status}</p>
                                <div className="d-flex justify-content-end">
                                    <button style={{ fontSize: "1rem" }}
                                        className="btn btn-success btn-sm me-2" 
                                        onClick={() => ReqAccepted(notice?._id, userId,notice?.senderId)}   
                                        // notification Id, loogedIn user, 
                                    >
                                        Accept
                                    </button>
                                    <button style={{ fontSize: "1rem" }}
                                        className="btn btn-danger btn-sm" 
                                        onClick={() => ReqRejected(notice?._id)}
                                    >
                                        Reject
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
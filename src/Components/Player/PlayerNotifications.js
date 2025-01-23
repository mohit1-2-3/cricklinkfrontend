import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import url from "../../URL/url.js";
import { useSelector } from "react-redux";


export const PlayerNotifications = () => {
    // const { state } = useLocation();
    const navigate = useNavigate();
    const id = useSelector((state) => state.User.user._id);
    const [notifications, setNotifications] = useState([]);
    const [status, setStatus] = useState("pending");
    const [message, setMessage] = useState("");
    
    const [teamId, setTeamId] = useState("");
    const [playerId, setPlayerId] = useState("");
    let params = useParams();
    let accept = "Accept";
    let reject = "Reject";


    useEffect(() => {
        getNotifications();
    }, []);

    const getNotifications = async () => {
        try {
            let response = await axios.get(`http://localhost:3000/user/notification/${id}`);
            console.log(response.data);
            setNotifications(response.data.message);
            setTeamId(response.data.teamId);
            setPlayerId(response.data.setPlayerId)
        } catch (error) {
            console.log("Error in getting notifications " + error);
        }
    }

    const ReqRejected = async () => {
        console.log("request rejected!")
        reject = "Rejected";
        accept = "";
        setStatus("declined");
    }

    const ReqAccepted = async ( statusR, playerId, teamId) => {
        try {
            console.log("Team Id : "+ teamId + " Player Id : "+ playerId)
            // const status = "accepted";
           
            // const playerId = params.userId;

            const response = await axios.put(`http://localhost:3000/Team/req-res`, { statusR, playerId, teamId });
            console.log("response : ", response.data);
            setStatus("accepted");
            console.log("joined team")
            accept = "Accepted";
            reject = "";
            setMessage("request "+accept)
        } catch (error) {
            console.log("error in joining team : " + error)
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
                    <div className="list-group">
                        {notifications?.map((notice, index) => (
                            <div 
                                key={index} 
                                className="list-group-item list-group-item-action mb-3 shadow-sm p-3 rounded"
                                style={{ backgroundColor: "black", borderLeft: "4px solid #007bff" }}
                            >
                                <h5 className="mb-2 text-primary">Notification Type: {notice.type}</h5>
                                <p className="mb-1" style={{ fontSize: "1rem" }}><strong>Send </strong> {notice.sendBy}</p>
                                <p className="mb-1" style={{ fontSize: "1rem" }}><strong>Received </strong> {notice.receiverId}</p>
                                
                                <p className="mb-2" style={{ fontSize: "1rem" }}><strong>Message:</strong> {notice.message}</p>
                                <p className="text-muted" style={{ fontSize: "1rem" }}><strong>Status:</strong> {notice.status}</p>
                                <div className="d-flex justify-content-end">
                                    <button style={{ fontSize: "1rem" }}
                                        className="btn btn-success btn-sm me-2" 
                                        onClick={() => ReqAccepted("accepted", notice.receiverId, notice.teamId)}
                                    >
                                        Accept
                                    </button>
                                    <button style={{ fontSize: "1rem" }}
                                        className="btn btn-danger btn-sm" 
                                        onClick={() => ReqRejected("rejected", notice.teamId)}
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
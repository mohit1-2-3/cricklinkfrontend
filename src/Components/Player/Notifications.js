import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export const Notifications = () => {
    const [notifications, setNotifications] = useState([]); 
    const [getStatus, setStatus] = useState("pending");

    const navigate = useNavigate();
    // const params = useParams(); 
const userId="678cd59c25deb05611385610"
    useEffect(() => {
        getNotificationsList(); 
    }, [userId]);

    const getNotificationsList = async () => {
        try {
            const response = await axios.get( `http://localhost:3001/Team/notification/${userId}`);
            console.log(response.data);
            setNotifications(response.data.message);
        } catch (error) {
            console.log("Error in getting notifications: " + error);
        }
    };

    const handleAccept = async (playerId, teamId) => {
        try {
            const status = "accepted";
            const response = await axios.put( `http://loalhost:3001/Team/req-res`, { status, playerId, teamId });
            console.log(response.data);
            setStatus("accepted");
            getNotificationsList(); 
        } catch (error) {
            console.log("Error in accepting request: " + error);
        }
    };

    const handleReject = async (playerId, teamId) => {
        try {
            const status = "rejected";
            const response = await axios.put(`http://loalhost:3001/Team/req-res`, { status, playerId, teamId });
            console.log(response.data);
            setStatus("rejected");
            getNotificationsList(); 
        } catch (error) {
            console.log("Error in rejecting request: " + error);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-5 text-dark">Your Notifications</h2>
            <div className="row">
                {notifications?.length === 0 ? (
                    <div className="col-12 text-center">
                        <div className="alert alert-info" role="alert">
                            No notifications available at the moment.
                        </div>
                    </div>
                ) : (
                    notifications?.map((notice, index) => (
                        <div key={index} className="col-lg-4 col-md-6 col-sm-12 mb-4">
                            <div className="card border-0 shadow-lg rounded-3">
                                <div className="card-header bg-light text-dark font-weight-bold">
                                    {notice.type}
                                </div>
                                <div className="card-body p-4">
                                    <h5 className="card-title text-primary">Sent By: {notice.sendBy}</h5>
                                    <p className="card-text"><strong>Message:</strong> {notice.message}</p>
                                    <p className="text-muted">
                                        <strong>Status:</strong> {notice.status}
                                    </p>
                                    <div className="d-flex justify-content-between">
                                        {notice.status === "pending" && (
                                            <>
                                                <button
                                                    className="btn btn-success btn-sm px-4 py-2"
                                                    onClick={() => handleAccept(notice.playerId, notice.teamId)}
                                                    style={{ borderRadius: "20px" }}
                                                >
                                                    Accept
                                                </button>
                                                <button
                                                    className="btn btn-danger btn-sm px-4 py-2"
                                                    onClick={() => handleReject(notice.playerId, notice.teamId)}
                                                    style={{ borderRadius: "20px" }}
                                                >
                                                    Reject
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

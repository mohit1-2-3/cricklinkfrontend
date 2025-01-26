import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function SendRequest() {
    const [teams, setTeams] = useState({});
    const userid = useSelector((state) => state.User.user._id);
    const { id } = useParams();
    const navigate=useNavigate();

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/Team/${id}`);
                setTeams(response.data);
            } catch (err) {
                console.error("Error fetching team data:", err);
            }
        };
        fetchTeams();
    }, [id]);

    const sendJoinRequest = async () => {
        try {
            const requestPayload = {
                playerId: userid, 
                teamId: id
            };
            console.log("Request Payload:", requestPayload);

            const response = await axios.post("http://localhost:3001/Team/req-to-join", requestPayload, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.data) {
                alert("Request sent successfully to the team captain.");
              navigate(-1)
            } else {
                alert("Failed to send the request.");
            }
        } catch (err) {
            console.error("Error sending join request:", err);
        }
    };

    return (
        <>
            <div className="modal show" style={{ display: "block", backgroundColor: "rgba(219, 224, 221, 0.5)" }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title text-black">Send Team Join Request</h5>
                        </div>
                        <div className="modal-body">
                            <p style={{color:"black"}}>Request sent successfully!</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={sendJoinRequest}>
                                Send Request to Captain
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SendRequest;

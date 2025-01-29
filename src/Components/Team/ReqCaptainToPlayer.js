// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { useSelector } from "react-redux";

// export function ReqCaptainToPlayer() {
//     // const [req, setReq] = useState({});
//     const captainId = useSelector((state) => state.User.user._id);  // captainId
//     const { id } = useParams();     // playerId

//     useEffect(() => {
//         sendReqToPlayer();
//     }, [id])

//     const sendReqToPlayer = async () => {
//         try {
//             const requestSend = await axios.post(`http://localhost:3001/Team/reqCaptainToPlayer/${captainId}`, { playerId: id })
//             console.log("request send suceesfully : " + requestSend);
//         } catch (error) {
//             console.log("Error : " + error);
//         }
//     }

// }
// import { useLocation } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import url from "../../URL/url.js";

// import "./team.css";

// export default function TeamDetail() {
//     let [TeamDetail, setTeamDetail] = useState([]);
//     let { state } = useLocation();
//     console.log(state);

//     useEffect(() => {
//         axios.post(url.team.particular, { team_id: state.team_id })
//             .then(response => {
//                 console.log(response.data);
//                 setTeamDetail(response.data.Data);
//             })
//             .catch(error => {
//                 console.log(error);
//             });
//     }, []);

//     return <>
//         <div className="container-fluid row d-flex justify-content-center align-items-center" id="container2">
//             <div className="row d-flex justify-content-center align-items-center">
//                 <div className="d-flex flex-row align-items-center justify-content-center">
//                     <p className="lead fs-1 fw-bold fs-6 mt-3 me-3 text-decoration-underline">TEAM DETAIL</p>
//                 </div>
//             </div>
//             <div className="d-flex justify-content-evenly bg-secondary rounded border col-md-11 ">
//                 <div className="col-md-2 h-100">
//                     <img src={state.thumbnail} className="img-fluid w-100 rounded" style={{ height: '200px' }} />
//                 </div>
//                 <div className="col-md-6 d-flex justify-content-around align-items-start flex-column ml-4">
//                     <h1 className="">{state.team_name}</h1>
//                     <p className="fs-2 ">Captain : { }</p>
//                 </div>
//             </div>
//             <div className="col-md-12 mt-5" >
//                 <table className="table text-center table-hover border-top border-end border-start table-striped bg-white">
//                     <thead className="bg-dark fs-5 text-light p-4" >
//                         <tr>
//                             <th></th>
//                             <th>Name</th>
//                             <th>Role</th>
//                             <th>Style</th>
//                             <th>Remove</th>
//                         </tr>
//                     </thead>
//                     <tbody >
//                         {
//                             TeamDetail?.map((player, index) => {
//                                 <tr className=" text-dark">
//                                     <td>
//                                         <div className="d-flex align-items-center">
//                                             <img src={player.image} alt="PlayerImage" style={{ width: "100px;", height: '100px', marginLeft: "20px" }} className="rounded-circle" />
//                                         </div>
//                                     </td>
//                                     <td>
//                                         <p className="fw-bold fs-6 text-dark mt-4">{player.first_name} {player.last_name}</p>
//                                     </td>
//                                     <td>
//                                         <p className="fw-bold fs-6 text-dark mt-4">{player.subCategory.Category.type}</p>
//                                     </td>
//                                     <td>
//                                         <p className="fw-bold fs-6 text-dark mt-4">{player.subCategory.type}</p>
//                                     </td>
//                                     <td>
//                                         <button type="button" className="btn btn-outline-danger mt-4">Remove</button>
//                                     </td>
//                                 </tr>

//                             })
//                         }
//                         {/* <tr>
//                             <td>
//                                 <div className="d-flex align-items-center">
//                                     <img
//                                         src="assets/player1.jpg"
//                                         alt=""
//                                         style={{ width: "100px;", height: '100px', marginLeft: "20px" }}
//                                         className="rounded-circle"
//                                     />
//                                 </div>
//                             </td>
//                             <td>
//                                 <p className="fw-bold fs-6 text-dark mt-4">Prasang Tiwari</p>
//                             </td>
//                             <td>
//                                 <p className="fw-bold fs-6 text-dark mt-4">All Rounder</p>
//                             </td>
//                             <td>
//                                 <p className="fw-bold fs-6 text-dark mt-4">Right-hand Batsman</p>
//                             </td>
//                             <td>
//                                 <button type="button" className="btn btn-outline-danger mt-4">
//                                     Remove
//                                 </button>
//                             </td>
//                         </tr>
//                         <tr >
//                             <td>
//                                 <div className="d-flex align-items-center ">
//                                     <img src="assets/player1.jpg" alt="" style={{ width: "100px;", height: '100px', marginLeft: "20px" }} className="rounded-circle" />
//                                 </div>
//                             </td>
//                             <td>
//                                 <p className="fw-bold fs-6 text-dark  mt-4 ">Prasang Tiwari</p>
//                             </td>
//                             <td>
//                                 <p className="fw-bold fs-6 text-dark mt-4">All Rounder</p>
//                             </td>
//                             <td><p className="fw-bold fs-6 text-dark mt-4">Right-hand Batsman</p></td>
//                             <td>
//                                 <button type="button" className="btn btn-outline-danger mt-4">
//                                     Remove
//                                 </button>
//                             </td>
//                         </tr>
//                         <tr>
//                             <td>
//                                 <div className="d-flex align-items-center">
//                                     <img
//                                         src="assets/player1.jpg"
//                                         alt=""
//                                         style={{ width: "100px;", height: '100px', marginLeft: "20px" }}
//                                         className="rounded-circle"
//                                     />
//                                 </div>
//                             </td>
//                             <td>
//                                 <p className="fw-bold fs-6 text-dark mt-4 ">Prasang Tiwari</p>
//                             </td>
//                             <td>
//                                 <p className="fw-bold fs-6 text-dark mt-4">All Rounder</p>
//                             </td>
//                             <td><p className="fw-bold fs-6 text-dark mt-4">Right-hand Batsman</p></td>
//                             <td>
//                                 <button type="button" className="btn btn-outline-danger mt-4">
//                                     Remove
//                                 </button>
//                             </td>
//                         </tr> */}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     </>
// }
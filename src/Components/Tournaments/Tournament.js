// import React, { useState } from "react";
// import axios from "axios";
// import Api from "../../apis/Api";

// export const TournamentCreation = () => {
//     const [formData, setFormData] = useState({ TournamentName: "", organizer_name: "", schedule: [], teams: [], startDate: "", endDate: "" });

//     const [successMessage, setSuccessMessage] = useState("");
//     const [errorMessage, setErrorMessage] = useState("");

//     const handleInputChange = (event) => {
//         const { name, value } = event.target;
//         setFormData({ ...formData, [name]: value });
//     };

//    const handleFormSubmit = async (event) => {
//     event.preventDefault();
//     try {
//         console.log("Form data:", formData);  // Check the structure of the data
//         const response = await axios.post(Api.CREATE_TOURNAMENT, formData);
//         console.log("Full response:", response);  // Check the full response structure

//         // Ensure the response structure has the data we expect
//         if (response.data && response.data.insert) {
//             setSuccessMessage(`Tournament Created: ${response.data.insert.TournamentName}`);
//             setErrorMessage(""); // Clear error messages
//         } else {
//             setErrorMessage("Unexpected response format");
//         }
//     } catch (err) {
//         console.error("Error:", err);
//         if (err.response && err.response.data) {
//             setErrorMessage(err.response.data.err);
//         } else {
//             setErrorMessage("Internal server error. Please try again later.");
//         }
//     }
// };

//     // return (
//     //     <div className="container my-5">
//     //         <h2>Tournament Creation Form</h2>
//     //         {successMessage && <p className="alert alert-success">Tournament Created Successfully: {successMessage}</p>}
//     //         {errorMessage && <p className="alert alert-danger">Unable to create tournament : {errorMessage}</p>}
//     //         <form onSubmit={handleFormSubmit} method="post">
//     //             <div className="form-group">
//     //                 <label>Tournament Name:</label>
//     //                 <input type="text" name="TournamentName" className="form-control" value={formData.TournamentName} onChange={handleInputChange} required />
//     //             </div>

//     //             <div className="form-group">
//     //                 <label>Organizer Name:</label>
//     //                 <input type="text" name="organizer_name" className="form-control" value={formData.organizer_name} onChange={handleInputChange} required />
//     //             </div>

//     //             <div className="form-group">
//     //                 <label>Start Date:</label>
//     //                 <input type="date" name="startDate" className="form-control" value={formData.startDate} onChange={handleInputChange} required />
//     //             </div>

//     //             <div className="form-group">
//     //                 <label>End Date:</label>
//     //                 <input type="date" name="endDate" className="form-control" value={formData.endDate} onChange={handleInputChange} required />
//     //             </div>

//     //             <button type="submit" className="btn btn-outline-success mt-3">
//     //                 Create Tournament
//     //             </button>
//     //         </form>
//     //     </div>
//     // );

//     return (
//         <div className="container my-5">
//             <h2 className="text-center mb-4">Create a New Tournament</h2>
//             {successMessage && (
//                 <div className="alert alert-success text-center" role="alert">
//                     {successMessage}
//                 </div>
//             )}
//             {errorMessage && (
//                 <div className="alert alert-danger text-center" role="alert">
//                     {errorMessage}
//                 </div>
//             )}
//             <form onSubmit={handleFormSubmit}>
//                 <div className="form-group mb-3">
//                     <label htmlFor="TournamentName" className="form-label">
//                         Tournament Name:
//                     </label>
//                     <input type="text" id="TournamentName" name="TournamentName" className="form-control" placeholder="Enter tournament name" value={formData.TournamentName} onChange={handleInputChange} required />
//                 </div>

//                 <div className="form-group mb-3">
//                     <label htmlFor="organizer_name" className="form-label">
//                         Organizer Name:
//                     </label>
//                     <input type="text" id="organizer_name" name="organizer_name" className="form-control" placeholder="Enter organizer's name" value={formData.organizer_name} onChange={handleInputChange} required />
//                 </div>

//                 <div className="form-group mb-3">
//                     <label htmlFor="startDate" className="form-label">
//                         Start Date:
//                     </label>
//                     <input type="date" id="startDate" name="startDate" className="form-control" value={formData.startDate} onChange={handleInputChange} required />
//                 </div>

//                 <div className="form-group mb-3">
//                     <label htmlFor="endDate" className="form-label">
//                         End Date:
//                     </label>
//                     <input type="date" id="endDate" name="endDate" className="form-control" value={formData.endDate} onChange={handleInputChange} required />
//                 </div>

//                 <button type="submit" className="btn btn-success w-100 mt-4">
//                     Create Tournament
//                 </button>
//             </form>
//         </div>
//     );
// };

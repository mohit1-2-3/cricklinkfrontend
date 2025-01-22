// import { useState } from "react";
// import { useParams } from "react-router-dom";

// export default function UpdateProfileForm({ closeForm }) {
//     const  id  = useParams();
//     console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",id);
//     const [formData, setFormData] = useState({
//         skills: "",
//         experience: "",
//         location: "",
//         profile_photo: null,

        
//     });
    

//     const handleInputChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     // const handleFileChange = (e) => {
//     //     setFormData({ ...formData, profile_photo: e.target.files[0] });
//     // };
//     const handleFileChange = (e) => {
//         console.log("File selected:------------------------------", e.target.files[0]); 
//         setFormData({ ...formData, profile_photo: e.target.files[0] });
//     };
    

//     const handleFormSubmit = async (e) => {
//         e.preventDefault();
//         const userId = sessionStorage.getItem("userId");
//         const form = new FormData();
//         form.append("skills", formData.skills);
//         form.append("experience", formData.experience);
//         form.append("location", formData.location);
//         if (formData.profile_photo) {
//             form.append("profile_photo", formData.profile_photo);
//         }

//         try {
//             const res = await fetch(`http://localhost:3001/user/updateProfile/${id}`, {
//                 method: "PUT",
//                 body: form,
//             });
//             const data = await res.json();

//             if (res.ok) {
//                 alert("Profile updated successfully!");
//                 closeForm(false); // Close the form after successful update
//             } else {
//                 alert(data.error || "Failed to update profile.");
//             }
//         } catch (err) {
//             console.log(err);
//             alert("An error occurred.");
//         }
//     };

//     return (
//         <>
//         <div className="modal" style={{ display: "block", background: "rgba(0,0,0,0.5)" }}>
//             <div className="modal-dialog">
//                 <div className="modal-content">
//                     <div className="modal-header">
//                     <h5 className="modal-title" style={{ color: 'black' }}>Update Profile</h5>

//                         <button className="btn-close" onClick={closeForm}></button>
//                     </div>
//                     <form onSubmit={handleFormSubmit} className="modal-body">
//                         <div className="mb-3">
//                             <label className="form-label">Skills</label>
//                             <input
//                               type="text"
//                               placeholder="skill"
//                               className="form-control"
//                               name="skills"
//                               value={formData.skills}
//                               onChange={handleInputChange}
//                               style={{ color: 'blue' }} // Text color changed to black
//                               />

//                         </div>
//                         <div className="mb-3">
//                             <label className="form-label">Experience</label>
//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 placeholder="experience"
//                                 name="experience"
//                                 value={formData.experience}
//                                 onChange={handleInputChange}
//                             />
//                         </div>
//                         <div className="mb-3">
//                             <label className="form-label">Location</label>
//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 placeholder="location"
//                                 name="location"
//                                 value={formData.location}
//                                 onChange={handleInputChange}
//                             />
//                         </div>
//                         <div className="mb-3">
//                             <label className="form-label">Profile Photo</label>
//                             <input
//                                 type="file"
//                                 className="form-control"
//                                 placeholder="profilePhoto"
//                                 name="profile_photo"
//                                 onChange={handleFileChange}
//                             />
//                         </div>
//                         <button type="submit" className="btn btn-primary">
//                             Save Changes
//                         </button>
//                     </form>
//                 </div>
//             </div>
//         </div>
//         </>
//     );
// }



//================================================================
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

export default function UpdateProfileForm({ closeForm }) {
    
    const { id } = useParams(); 
    const navigate = useNavigate();
    console.log("Fetched ID from params:", id);

    const [formData, setFormData] = useState({
        skills: "",
        experience: "",
        location: "",
        profile_photo: null,
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        console.log("File selected:", e.target.files[0]);
        setFormData({ ...formData, profile_photo: e.target.files[0] });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        // FormData banaiye
        const form = new FormData();
        form.append("skills", formData.skills);
        form.append("experience", formData.experience);
        form.append("location", formData.location);
        if (formData.profile_photo) {
            form.append("profile_photo", formData.profile_photo);
        }

        try {
            // Correct URL ke saath request bhejiye
            const res = await fetch(`http://localhost:3000/user/updateProfile/${id}`, {
                method: "PUT",
                body: form,
            });
            const data = await res.json();

            if (res.ok) {
                alert("Profile updated successfully!");
                navigate("/PlayerMyProfile");
                //closeForm(false); // Close the form after successful update
            } else {
                alert(data.error || "Failed to update profile.");
            }
        } catch (err) {
            console.log("Error in updating profile:", err);
            alert("An error occurred.");
        }
    };

    return (
        <>
            <div className="modal" style={{ display: "block", background: "rgba(0,0,0,0.5)" }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" style={{ color: 'black' }}>Update Profile</h5>

                            <button
                           className="btn-close"
                          onClick={() => {
                        //   closeForm(false); // Close the modal
                            navigate("/PlayerMyProfile"); // Navigate to PlayerMyProfile page
                             }}
                             ></button>

                        </div>
                        <form onSubmit={handleFormSubmit} className="modal-body">
                            <div className="mb-3">
                                <label className="form-label">Skills</label>
                                <input
                                    type="text"
                                    placeholder="skill"
                                    className="form-control"
                                    name="skills"
                                    value={formData.skills}
                                    onChange={handleInputChange}
                                    style={{ color: 'blue' }}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Experience</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="experience"
                                    name="experience"
                                    value={formData.experience}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Location</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="location"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Profile Photo</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    name="profile_photo"
                                    onChange={handleFileChange}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Save Changes
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}




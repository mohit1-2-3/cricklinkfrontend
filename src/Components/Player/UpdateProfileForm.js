
//================================================================
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function UpdateProfileForm({ closeForm }) {
  const userrole = useSelector((state) => state.User.user.role);
  // console.log(role);
  console.log("================================", userrole);
  const { id } = useParams();
  const navigate = useNavigate();
  console.log("Fetched ID from params:", id);
  const [userRole, setUserRole] = useState('player');
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
    if (userrole === 'player')
      form.append("skills", formData.skills);
    form.append("experience", formData.experience);
    form.append("location", formData.location);
    if (formData.profile_photo) {
      form.append("profile_photo", formData.profile_photo);
    }

    try {
      // Correct URL ke saath request bhejiye
      const res = await fetch(` http://localhost:3000/user/updateProfile/${id}`,
        {
          method: "PUT",
          body: form,
        }
      );
      const data = await res.json();

      if (res.ok) {
        if (userrole === 'player') {
          alert("Profile updated successfully!");
          navigate("/PlayerMyProfile");
        }
        else {
          alert("Profile updated successfully!");
          navigate("/OrganizerProfile");
        }
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
      <div
        className="modal"
        style={{ display: "block", background: "rgba(0,0,0,0.5)" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" style={{ color: "black" }}>
                Update Profile
              </h5>

              <button
                className="btn-close"
                onClick={() => {
                  //   closeForm(false); // Close the modal
                  if (userrole === 'player')
                    navigate("/PlayerMyProfile");
                  else
                    navigate("/OrganizerProfile");                                // Navigate to PlayerMyProfile page
                }}
              ></button>
            </div>
            <form onSubmit={handleFormSubmit} className="modal-body">
              {/* //================================================= */}

              <div className="mb-3">
                <label
                  className="form-label"
                  htmlFor="role"
                  style={{
                    color: 'blue',
                    fontSize: '16px',
                    fontWeight: 'bold',
                  }}
                >
                  Role
                </label>
                <select
                  className="form-control"
                  id="role"
                  name="role"
                  value={userRole}
                  onChange={(e) => setUserRole(e.target.value)}
                >
                  <option value="player" style={{ color: 'black' }}>Player</option>
                  <option value="organizer" style={{ color: 'black' }} >Organizer</option>
                </select>
              </div>



              {/* ========================================================= */}
              {userRole === 'player' && (
                <div className="mb-3">
                  <label
                    className="form-label"
                    htmlFor="skills"
                    style={{
                      color: "blue",
                      fontSize: "16px",
                      fontWeight: "bold",
                    }}
                  >
                    Skills
                  </label>
                  <input
                    type="text"
                    placeholder="skill"
                    className="form-control"
                    name="skills"
                    value={formData.skills}
                    onChange={handleInputChange}
                    style={{ color: "blue" }}
                  />
                </div>
              )}
              <div className="mb-3">
                <label
                  className="form-label"
                  htmlFor="skills"
                  style={{
                    color: "blue",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  Experience
                </label>
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
                <label
                  className="form-label"
                  htmlFor="skills"
                  style={{
                    color: "blue",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  Location
                </label>
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
                <label
                  className="form-label"
                  htmlFor="skills"
                  style={{
                    color: "blue",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  profile_photo
                </label>
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
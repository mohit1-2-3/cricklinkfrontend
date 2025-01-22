// --------------------------------------------------------------------------

import { useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import TeamsPage from "../Team/TeamPage";

function LeftSidebar() {
  const [selectedPlayerId, setSelectedPlayerId] = useState({});

  // *****************************************

  const navigate = useNavigate();
  const player = useSelector((state) => state.User.user);

  // ******************************************

  const token = useSelector((state) => state.User.token);
  const name = useSelector((state) => state.User.user.name);
  const contact = useSelector((state) => state.User.user.contact);
  const email = useSelector((state) => state.User.user.email);
  const experience = useSelector((state) => state.User.user.profile.experience);
  const skill = useSelector((state) => state.User.user.profile.skills);
  const location = useSelector((state) => state.User.user.profile.location);
  const id = useSelector((state) => state.User.user._id);

  const profile_photo = useSelector((state) => state.User.user.profile_photo);
  console.log("=================<<<<<<<<<>>>>>>==================");
  console.log(token);
  console.log(name);
  console.log(contact);
  console.log(email);
  console.log(player);

  console.log(experience);
  console.log(skill);
  console.log(location);
  console.log(id);
  console.log(profile_photo);
  console.log("=================<<<<<<<<<>>>>>>==================");

  return (
    <>
   
    <div
      className="offcanvas offcanvas-start p-5 text-bg-dark"
      tabIndex="-1"
      id="leftSidebar"
      aria-labelledby="leftSidebarLabel"
    >
      <button
        type="button"
        className="btn-close btn-close-white"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
      <div className="offcanvas-header ps-5">
        {/* <img src="assets/logo.png" id="logo" alt="logo" /> */}
        {/* ============================================================     */}
        {/* <a href="https://your-link-here.com">

{profile_photo ? (
        <img src={profile_photo} id="logo" alt="User Profile" />
    ) : (
        <img src="assets/logo.png" id="logo" alt="Default Logo" />
       
    )
}
</a> */}

        {profile_photo ? (
          <img
            src={profile_photo}
            id="logo"
            alt="User Profile"
            style={{
              borderRadius: "50%",
              width: "100px",
              height: "100px",
              cursor: "pointer",
            }}
            onClick={() => {
              console.log("Navigating to PlayerProfile with player:", player); // Log the player data
              setSelectedPlayerId(id);
              navigate("/PlayerProfile", { state: { id } });
            }}
          />
        ) : (
          <img
            src="assets/logo.png"
            id="logo"
            alt="Default Logo"
            style={{
              borderRadius: "50%",
              width: "100px",
              height: "100px",
              cursor: "pointer",
            }}
            onClick={() => {
              console.log("Navigating to PlayerProfile with player:", player); // Log the player data
              setSelectedPlayerId(id);
              navigate("/PlayerProfile", { state: { id } });
            }}
          />
        )}

        {/* =============================================================== */}

        <h4 className="mt-3 text-white">{name ? name : "Guest User"}</h4>
      </div>
      <div className="offcanvas-body ps-5">
        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
          <li className="nav-item">
            {/* <HashLink className="nav-link active" to="/#banner">
              Home
            </HashLink> */}

            <button
              className="nav-link active"
              onClick={() => {
                console.log("Navigating to PlayerProfile with player ID:", id); // Log the player data
                setSelectedPlayerId(id); // Update state or perform any logic
                navigate("/PlayerProfile", { state: { id } }); // Navigate with state
              }}
            >
              My Profile
            </button>
          </li>
          <li className="nav-item">
            <HashLink className="nav-link" to="/#AboutContainer">
              About
            </HashLink>
          </li>

          <li className="nav-item">
            <HashLink className="nav-link" to="/allTournament">
              Tournament
            </HashLink>
          </li>
          <li className="nav-item">
            <HashLink className="nav-link" to="/teams">
              Teams
            </HashLink>
          </li>
          <li className="nav-item">
            <HashLink className="nav-link" to="/#contactUs">
              Contact Us
            </HashLink>
          </li>
        </ul>
      </div>

      <div className="d-flex justify-content-center align-items-center mt-auto">
      <button
        className="btn btn-danger w-75 mt-4"
        onClick={() => {
          console.log("Logging out...");
          navigate("/");
          // Add logout logic here
        }}
      >
        Logout
      </button>
    </div>

    </div>
    
    </>
  );
}

// function RightSidebar({ navigate }) {
//   const isLoggedIn = sessionStorage.getItem("isLoggedIn");
//   const currentUser = sessionStorage.getItem("currentUser");
//   return (
//     <div
//       className="offcanvas offcanvas-end pt-5 text-bg-dark"
//       tabIndex="-1"
//       id="rightSidebar"
//       aria-labelledby="rightSidebarLabel"
//     >
//       <button
//         type="button"
//         className="ms-5 btn-close btn-close-white"
//         data-bs-dismiss="offcanvas"
//         aria-label="Close"
//       ></button>
//       <div className="offcanvas-header mt-5">
//         <div className="container">
//           <div
//             id="imagebox"
//             className="rounded-5 border ps-5 pe-5 pt-3 pb-3 w-100"
//           >
//             <div
//               id="imgg"
//               style={{ height: "140px" }}
//               className="d-flex flex-column gap-3 align-items-center"
//             >
//               {isLoggedIn ? (
//                 <>
//                   <img
//                     src="11.jpg"
//                     width="100vw"
//                     className="img-fluid rounded-circle border-dark"
//                     alt="Avatar"
//                   />
//                   <h5>Cricket Champion Hub</h5>
//                   <h6>{currentUser}</h6>
//                 </>
//               ) : (
//                 <>
//                   {/* <img src="https://t4.ftcdn.net/jpg/00/65/77/27/240_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg" width='100vw' className="img-fluid rounded-circle border-dark" alt="Avatar" />
//                                     <h5>Guest</h5>
//                                     <button type="button" onClick={() => navigate('/signIn')} className="btn btn-primary">Log In</button> */}
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//       {isLoggedIn && (
//         <div className="offcanvas-body mt-5">
//           <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
//             <li className="nav-item">
//               <a className="nav-link active" href="#">
//                 My Profile
//               </a>
//             </li>
//             <li className="nav-item">
//               <a className="nav-link" href="#">
//                 About
//               </a>
//             </li>
//             <li className="nav-item">
//               <a className="nav-link" href="#">
//                 Contact Us
//               </a>
//             </li>
//             <li className="nav-item">
//               <a className="nav-link" href="#">
//                 LogOut
//               </a>
//             </li>
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }

export default function Header({ setSearchedList }) {
  let navigate = useNavigate();

  const [selectedPlayerId, setSelectedPlayerId] = useState({});
  const id = useSelector((state) => state.User.user._id);

  // let handleProfile = () => {
  //   if (sessionStorage.getItem("isLoggedIn")) {
  //     let user = sessionStorage.getItem("currentUser");
  //     user === "player"
  //       ? navigate("/playerProfile")
  //       : user === "organizer"
  //       ? navigate("/organizerProfile")
  //       : navigate("/adminProfile");
  //   } else {
  //     navigate("/signIn");
  //   }
  // };

  return (
    <>
    <nav
      className="navbar navbar-dark sticky-top p-3"
      style={{ backgroundColor: "#090129" }}
    >
      <div className="container-fluid">
        <LeftSidebar />
        {/* =========================================================== */}

        {/* ================================================================ */}
        {/* <RightSidebar navigate={navigate} /> */}
        <div className="col-md-1 col-2">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#leftSidebar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
        <div className="col-md-4 col-6 offset-md-2 offset-1">
          <input
            type="text"
            onChange={(e) => setSearchedList(e.target.value)}
            placeholder="Search"
            className="form-control rounded-pill text-light"
            style={{ backgroundColor: "#272727" }}
          />
        </div>
        <div className="col-md-2 col-1 offset-2 offset-md-2 d-flex justify-content-center">
          <i
            className="btn fa-solid fa-bell fa-xl"
            style={{ color: "#ffffff", marginTop: "10px" }}
          ></i>

          <button
            type="button"
            className="btn btn-primary mb-2"
            onClick={() => navigate(`/UpdateProfileForm/${id}`)}
          >
            Update Profile
          </button>
        </div>
      </div>
    </nav>
     <TeamsPage/>
    </>
  );
}

// // -------------------------------------------------------------------------

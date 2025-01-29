
import { useNavigate } from "react-router-dom";
import PlayerProfile from "./Player/PlayerProfile.js";
import OrganizerProfile from "./Team/TeamDetails.js";
import { HashLink } from "react-router-hash-link";

export default function Header({ setSearchedList }) {
  let navigate = useNavigate();

  let profile = () => {
    if (sessionStorage.getItem("isLoggedIn")) {
      let user = sessionStorage.getItem("currentUser");
      user === "player" ? (
        <PlayerProfile />
      ) : user === "organizer" ? (
        <OrganizerProfile />
      ) : (
        <h1>Admin Profile</h1>
      );
    } else {
      navigate("/signIn");
    }
  };

  return (
    <>
      <nav
        className="navbar navbar-dark sticky-top p-3"
        style={{ background: "linear-gradient(90deg, #002366,#ffffff)" }}>
        {/* <img src="./assets/logo.png" margin={"1000px"} height={"30px"} width={"200px"}alt="logo"></img> */}
        {/* <nav className="navbar navbar-dark sticky-top p-3 pb-5" style={{ backdropFilter: 'blur(5px)' }}> */}
        <div className="container-fluid ">
          <div
            className="offcanvas offcanvas-start p-5 text-bg-light"
            style={{ width: "350px" }}
            tabIndex="-1"
            id="leftSidebar"
            aria-labelledby="leftSidebarLabel"
          >
            <button
              type="button"
              className="btn-close btn-close-black "
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
            <div className="offcanvas-header ps-5">
              <img src="assets/highlights/cricklinkLogo.jpg" id="logo" alt="logo" />
              
              <h5 className="offcanvas-title" id="leftSidebarLabel"></h5>
            </div>
            <div className="offcanvas-body ps-5">
              <ul className="navbar-nav justify-content-start flex-grow-1 pe-3">
                {/* Sidebar content here */}
                <li className="nav-item">
                  <HashLink
                    className="nav-link active"
                    aria-current="page"
                    to="/Header"
                    style={{
                      display: "inline-block",
                      padding: "12px 24px",
                      fontSize: "15px",
                      fontWeight: "500",
                      color: "black",
                      border: "2px solid black",
                      borderRadius: "10px",
                      textTransform: "capatialize",
                      textAlign: "center",
                      margin: "10px 0",
                      cursor: "pointer",
                      width: "100%",
                      textDecoration: "",
                      letterSpacing: "1px",
                      transition: "all 0.3s ease-in-out",
                    }}
                    onMouseOver={(e) =>
                      (e.target.style.backgroundColor = "#007bff")
                    } // Hover effect
                    onMouseOut={(e) =>
                      (e.target.style.backgroundColor = "transparent")
                    } // Reset color
                  >
                    Home
                  </HashLink>
                </li>
                <li className="nav-item">
                  <HashLink
                    className="nav-link"
                    to="/About"
                    style={{
                      display: "inline-block",
                      padding: "12px 24px",
                      fontSize: "15px",
                      fontWeight: "500",
                      color: "black",
                      border: "2px solid black",
                      borderRadius: "10px",
                      textTransform: "capatialize",
                      textAlign: "center",
                      margin: "10px 0",
                      cursor: "pointer",
                      width: "100%",
                      textDecoration: "",
                      letterSpacing: "1px",
                      transition: "all 0.3s ease-in-out",
                    }}
                    onMouseOver={(e) =>
                      (e.target.style.backgroundColor = "#007bff")
                    } // Hover effect
                    onMouseOut={(e) =>
                      (e.target.style.backgroundColor = "transparent")
                    }
                  >
                    About
                  </HashLink>
                </li>
                <li className="nav-item">
                  <HashLink
                    className="nav-link"
                    to="/#playerContainer"
                    style={{
                      display: "inline-block",
                      padding: "12px 24px",
                      fontSize: "15px",
                      fontWeight: "500",
                      color: "black",
                      border: "2px solid black",
                      borderRadius: "10px",
                      textTransform: "capatialize",
                      textAlign: "center",
                      margin: "10px 0",
                      cursor: "pointer",
                      width: "100%",
                      textDecoration: "",
                      letterSpacing: "1px",
                      transition: "all 0.3s ease-in-out",
                    }}
                    onMouseOver={(e) =>
                      (e.target.style.backgroundColor = "#007bff")
                    } // Hover effect
                    onMouseOut={(e) =>
                      (e.target.style.backgroundColor = "transparent")
                    } // Reset color
                  >
                    Players
                  </HashLink>
                </li>
                <li className="nav-item">
                  <HashLink
                    className="nav-link"
                    to="/UpcomingTournamentsCards"
                    style={{
                      display: "inline-block",
                      padding: "12px 24px",
                      fontSize: "15px",
                      fontWeight: "500",
                      color: "black",
                      border: "2px solid black",
                      borderRadius: "10px",
                      textTransform: "capatialize",
                      textAlign: "center",
                      margin: "10px 0",
                      cursor: "pointer",
                      width: "100%",
                      textDecoration: "",
                      letterSpacing: "1px",
                      transition: "all 0.3s ease-in-out",
                    }}
                    onMouseOver={(e) =>
                      (e.target.style.backgroundColor = "#007bff")
                    } // Hover effect
                    onMouseOut={(e) =>
                      (e.target.style.backgroundColor = "transparent")
                    } // Reset color
                  >
                    Tournament
                  </HashLink>
                </li>
                <li className="nav-item">
                  <HashLink
                    className="nav-link"
                    to="/TeamPage"
                    style={{
                      display: "inline-block",
                      padding: "12px 24px",
                      fontSize: "15px",
                      fontWeight: "500",
                      color: "black",
                      border: "2px solid black",
                      borderRadius: "10px",
                      textTransform: "capatialize",
                      textAlign: "center",
                      margin: "10px 0",
                      cursor: "pointer",
                      width: "100%",
                      textDecoration: "",
                      letterSpacing: "1px",
                      transition: "all 0.3s ease-in-out",
                    }}
                    onMouseOver={(e) =>
                      (e.target.style.backgroundColor = "#007bff")
                    } // Hover effect
                    onMouseOut={(e) =>
                      (e.target.style.backgroundColor = "transparent")
                    } // Reset color
                  >
                    Teams
                  </HashLink>
                </li>
                <li className="nav-item">
                  <HashLink
                    className="nav-link"
                    to="/ContactUs"
                    style={{
                      display: "inline-block",
                      padding: "12px 24px",
                      fontSize: "15px",
                      fontWeight: "500",
                      color: "black",
                      border: "2px solid black",
                      borderRadius: "10px",
                      textTransform: "capatialize",
                      textAlign: "center",
                      margin: "10px 0",
                      cursor: "pointer",
                      width: "100%",
                      textDecoration: "",
                      letterSpacing: "1px",
                      transition: "all 0.3s ease-in-out",
                    }}
                    onMouseOver={(e) =>
                      (e.target.style.backgroundColor = "#007bff")
                    } // Hover effect
                    onMouseOut={(e) =>
                      (e.target.style.backgroundColor = "transparent")
                    } // Reset color
                  >
                    Contact Us
                  </HashLink>
                </li>
              </ul>
            </div>
          </div>

          {/* Right sidebar */}
          <div
            className="offcanvas offcanvas-end pt-5"
            tabIndex="-1"
            id="rightSidebar"
            aria-labelledby="rightSidebarLabel"
            style={{
              width: "25vw",
              height: "50vh", // Adjust the height
              backgroundColor: "rgba(255, 255, 255, 0.7)", // White color with reduced opacity
              marginTop: "10vh", // Adjust this value to control the space from the top
            }}
          >
            <button
              type="button"
              className="ms-5 btn-close btn-close-black"
              style={{ border: "2px solid black" }}
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
            <div className="offcanvas-header mt-5">
              <div className="container">
                <div
                  id="imagebox"
                  className="rounded-5 border ps-5 pe-5 pt-3 pb-3 w-100"
                >
                  <div
                    id="imgg"
                    style={{ height: "140px" }}
                    className="d-flex flex-column gap-3 bg-transparent align-items-center"
                  >
                    {sessionStorage.getItem("isLoggedIn") ? (
                      <>
                        <div className="rounded-circle">
                          <img
                            src="11.jpg"
                            width="100vw"
                            className="img-fluid rounded-circle border-dark"
                            alt="Avatar"
                          />
                        </div>
                        <h5 className="bg-transparent ">
                          CrIcket Champion Hub
                        </h5>
                        <h6 className="bg-transparent ">
                          {sessionStorage.getItem("currentUser")}
                        </h6>
                      </>
                    ) : (
                      <>
                        <div className="rounded-circle">
                          <img
                            src="https://t4.ftcdn.net/jpg/00/65/77/27/240_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg"
                            width="100vw"
                            className="img-fluid rounded-circle border-light"
                            alt="Avatar"
                          />
                        </div>
                        <h5 className="bg-transparent "></h5>
                        <button
                          type="button"
                          onClick={() => navigate("/signIn")}
                          class="btn btn-primarybtn btn-primary btn-lg"
                          style={{
                            borderRadius: "25px",
                            border: "2px solid white",
                          }}
                        >
                          LogIn
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <h5
                className="offcanvas-title"
                id="offcanvasDarkNavbarLabel"
              ></h5>
            </div>
            {sessionStorage.getItem("isLoggedIn") ? (
              <div className="offcanvas-body mt-5 bg-light">
                <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                  <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="#">
                      My Profile
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      About
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Contact Us
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      LogOut
                    </a>
                  </li>
                </ul>
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className="col-md-1 col-2">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#leftSidebar"
              aria-controls="leftSidebar"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>

          <div className="col-md-4 col-6 offset-md-2 offset-1">
            <input
              type="text"
              onChange={(e) => setSearchedList(e.target.value)}
              placeholder="Search"
              style={{
                width: "400px",
                height: "35px",
                backgroundColor: "white",
                border: "2px solid black",
                color: "black",
                borderRadius: "15px",
              }}
              className="form-control"
            />
          </div>

          <div className="col-md-2 col-1 offset-2 offset-md-2 d-flex justify-content-center">
            {/* <i className="btn fa-solid fa-bell fa-xl" style={{ color: '#ffffff', marginTop: '10px' }}></i> */}
            <button
              className="bg-transparent p-2 rounded-circle"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#rightSidebar"
              aria-controls="rightSidebar"
              aria-label="Toggle navigation"
              style={{ border: "1px solid white", backgroundColor: "white" }}
            >
              <i
                className="fa-solid fa-user fa-lg"
                style={{ color: "white" }}
              ></i>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
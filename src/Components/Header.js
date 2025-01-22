import { useNavigate } from 'react-router-dom';
import PlayerProfile from './Player/PlayerProfile.js';
import OrganizerProfile from './Team/TeamDetails.js';
import { HashLink } from 'react-router-hash-link';

export default function Header({ setSearchedList }) {
    let navigate = useNavigate();

    let profile = () => {
        if (sessionStorage.getItem('isLoggedIn')) {
            let user = sessionStorage.getItem('currentUser');
            user === 'player' ? <PlayerProfile /> : user === 'organizer' ? <OrganizerProfile /> : <h1>Admin Profile</h1>;
        } else {
            navigate('/signIn');
        }
    }

    return <>
        <nav className="navbar navbar-dark sticky-top p-3" style={{ backgroundColor: '#090129' }}>
            {/* <nav className="navbar navbar-dark sticky-top p-3 pb-5" style={{ backdropFilter: 'blur(5px)' }}> */}
            <div className="container-fluid">
                {/* Left sidebar */}
                <div className="offcanvas offcanvas-start p-5 text-bg-dark" tabIndex="-1" id="leftSidebar" aria-labelledby="leftSidebarLabel">
                    <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    <div className="offcanvas-header ps-5">
                        <img src='assets/logo.png' id='logo' alt='logo' />
                        <h5 className="offcanvas-title" id="leftSidebarLabel"></h5>
                    </div>
                    <div className="offcanvas-body ps-5">
                        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                            {/*  sidebar content here */}
                            <li className="nav-item">
                                <HashLink className="nav-link active" aria-current="page" to="/#banner">Home</HashLink>
                            </li>
                            <li className="nav-item">
                                <HashLink className="nav-link" to="/About" >About</HashLink>
                            </li>
                            <li className="nav-item">
                                <HashLink className="nav-link" to="/#playerContainer">Players</HashLink>
                            </li>
                            <li className="nav-item">
                                <HashLink className="nav-link" to="/UpcomingTournamentsCards">Tournament </HashLink>
                            </li>
                            <li className="nav-item">
                                <HashLink className="nav-link" to="/teams">Teams </HashLink>
                            </li>
                            <li className="nav-item">
                                <HashLink className="nav-link" to="/ContactUs">Contact Us </HashLink>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Right sidebar */}
                <div className="offcanvas offcanvas-end pt-5 text-bg-dark" tabIndex="-1" id="rightSidebar" aria-labelledby="rightSidebarLabel">
                    <button type="button" className="ms-5 btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    <div className="offcanvas-header mt-5">
                        <div className='container'>
                            <div id='imagebox' className='rounded-5 border ps-5 pe-5 pt-3 pb-3 w-100'>
                                <div id='imgg' style={{ height: '140px' }} className='d-flex flex-column gap-3 bg-transparent align-items-center'>
                                    {
                                        sessionStorage.getItem('isLoggedIn') ?
                                            <>
                                                <div className='rounded-circle'>
                                                    <img src="11.jpg" width='100vw' className="img-fluid rounded-circle border-dark" alt="Avatar" />
                                                </div>
                                                <h5 className='bg-transparent '>CrIcket Champion Hub</h5>
                                                <h6 className='bg-transparent '>{sessionStorage.getItem('currentUser')}</h6>
                                            </>
                                            :
                                            <>
                                                <div className='rounded-circle'>
                                                    <img src="https://t4.ftcdn.net/jpg/00/65/77/27/240_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg" width='100vw' className="img-fluid rounded-circle border-dark" alt="Avatar" />
                                                </div>
                                                <h5 className='bg-transparent '>Guest</h5>
                                                <button type="button" onClick={() => navigate('/signIn')} class="btn btn-primarybtn btn-primary btn-lg">LogIn</button>
                                            </>
                                    }
                                </div>
                            </div>
                        </div>
                        <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel"></h5>
                    </div>
                    {
                        sessionStorage.getItem('isLoggedIn') ?

                            <div className="offcanvas-body mt-5">
                                <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                                    <li className="nav-item">
                                        <a className="nav-link active" aria-current="page" href="#">My Profile</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#">About</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#">Contact Us</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#">LogOut</a>
                                    </li>
                                </ul>
                            </div> : <></>
                    }
                </div>
                <div className="col-md-1 col-2">
                    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#leftSidebar" aria-controls="leftSidebar" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>

                <div className="col-md-4 col-6 offset-md-2 offset-1">
                    <input type="text" onChange={(e) => setSearchedList(e.target.value)} placeholder="Search" style={{ backgroundColor: '#272727' }} className="form-control rounded-pill text-light" />
                </div>

                <div className="col-md-2 col-1 offset-2 offset-md-2 d-flex justify-content-center">
                    <i className="btn fa-solid fa-bell fa-xl" style={{ color: '#ffffff', marginTop: '10px' }}></i>
                    <button className='bg-transparent p-2 rounded-circle' type="button" data-bs-toggle="offcanvas" data-bs-target="#rightSidebar" aria-controls="rightSidebar" aria-label="Toggle navigation">
                        <i className="fa-solid fa-user fa-lg" style={{ color: '#ffffff' }}></i>
                    </button>
                </div>
            </div>
        </nav>

    </>
}

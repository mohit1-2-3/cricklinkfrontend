import { Routes, Route } from 'react-router-dom';
import { createContext, useState } from 'react';

import SignIn from './Components/SignIn.js';
import SignUp from './Components/SignUp.js';
import Home from './Components/HomePage/Home.js';
import About from './Components/HomePage/About.js';
import ContactUs from './Components/HomePage/ContactUs.js';
import ForgotPassword from './Components/forgotPassword';




import PlayerProfile from './Components/Player/PlayerProfile.js';
import OrganizerProfile from './Components/Player/OrganizerProfile.js';
import OrganizerMyProfile from './Components/Player/OrganizerMyProfile';
import Players from './Components/Player/Players.js';
import PlayerMyProfile from './Components/Player/PlayerMyProfile';
import UpdateProfileForm from './Components/Player/UpdateProfileForm';


// import Tournament from './Components/Tournaments/Tournament.js';
import {UpdateSchedule} from './Components/Tournaments/UpdateSchedule.js';
import ParticularTournament from "./Components/Tournaments/ParticularTournament.js";
import UpcomingTournamentsCards from "./Components/Tournaments/UpcomingTournamentsCards";
import { TeamRegister } from "./Components/Tournaments/TeamRegistration";
import {TournamentCreation} from "./Components/Tournaments/CreateTournament";
import {OrganizerTournament} from "./Components/Tournaments/Tournament";



import Teams from './Components/Team/team.js';
import TeamDetail from './Components/Team/TeamDetails.js';
import RegistrationForm from './Components/Team/registerTeam.js';
import TeamsPage from './Components/Team/TeamPage.js';
import PlayersDetail from './Components/Player/playersDetail.js';
import './App.css'

function App() {

  return <>
    <Routes>
      <Route path='/' element={<Home />} />

      <Route path='/signIn' element={<SignIn />} />
      <Route path='/signUp' element={<SignUp />} />
      <Route path="/forgotPassword" element={<ForgotPassword />} />
      <Route path="/Teams" element={<TeamsPage/>}></Route>
      {/* <Route path='/teams' element={<Teams />} /> */}
      {/* <Route path='/teamDetails' element={<TeamDetail />} /> */}
      <Route path='/registerTeam' element={<RegistrationForm />} />

      <Route path='/PlayerProfile' element={<PlayerProfile />} />
      <Route path='/players' element={<Players />} />
      <Route path="/playerMyProfile" element={<PlayerMyProfile />} />
      <Route path="/UpdateProfileForm/:id" element={<UpdateProfileForm />} />
      <Route path='/OrganizerProfile' element={<OrganizerProfile />} />
      <Route path="/OrganizerMyProfile" element={<OrganizerMyProfile/>}/>


      <Route path='/updateTournament' element={<UpdateSchedule />} />
      <Route path="/tournamentById/:id" element={<ParticularTournament />} />
      <Route path="/UpcomingTournamentsCards" element={<UpcomingTournamentsCards/>}/>
      <Route path="/addTeam/:id" element={<TeamRegister/>}/>
      <Route path="/createTournamentReq" element={<TournamentCreation/>}/>
      <Route path="/OrganizerTournament" element={<OrganizerTournament/>}/>


      <Route path='/About' element={<About />} />
      <Route path='/ContactUs' element={<ContactUs />} />

      <Route path="/Team/:id" element={<TeamDetail/>} ></Route>
    <Route path="/user/:id" element={<PlayersDetail/>} ></Route>
   
    </Routes>
    {/* <Example/> */}
  </>

const [isFormOpen, setIsFormOpen] = useState(false); 
const openForm = () => setIsFormOpen(true); 
const closeForm = () => setIsFormOpen(false); 
return (
   <div> 
    <button onClick={openForm}>Update Profile</button> {isFormOpen && <UpdateProfileForm closeForm={closeForm} />} </div> );
}

export default App;

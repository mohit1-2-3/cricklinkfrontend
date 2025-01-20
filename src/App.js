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
import Players from './Components/Player/Players.js';
import PlayerMyProfile from './Components/Player/PlayerMyProfile';
import UpdateProfileForm from './Components/Player/UpdateProfileForm';


import Tournament from './Components/Tournaments/Tournament.js';
import AllTournament from './Components/Tournaments/AllTournaments.js';

import Teams from './Components/Team/team.js';
import TeamDetail from './Components/Team/TeamDetails.js';
import RegistrationForm from './Components/Team/registerTeam.js';

import './App.css'

function App() {

  return <>
    <Routes>
      <Route path='/' element={<Home />} />

      <Route path='/signIn' element={<SignIn />} />
      <Route path='/signUp' element={<SignUp />} />
      <Route path="/forgotPassword" element={<ForgotPassword />} />

      <Route path='/teams' element={<Teams />} />
      <Route path='/teamDetails' element={<TeamDetail />} />
      <Route path='/registerTeam' element={<RegistrationForm />} />

      <Route path='/tournament' element={<Tournament />} />
      <Route path='/allTournament' element={<AllTournament />} />

      <Route path='/PlayerProfile' element={<PlayerProfile />} />
      <Route path='/players' element={<Players />} />
      <Route path="/playerMyProfile" element={<PlayerMyProfile />} />
      <Route path="/UpdateProfileForm/:id" element={<UpdateProfileForm />} />
      <Route path='/OrganizerProfile' element={<OrganizerProfile />} />
      <Route path='/About' element={<About />} />

      <Route path='/ContactUs' element={<ContactUs />} />
    </Routes>
    {/* <Example/> */}
  </>
}

export default App;

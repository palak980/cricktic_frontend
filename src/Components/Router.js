import React from 'react';
import{Route,Routes}from "react-router-dom";
import Home from './Home';
import Aboutus from './Aboutus';
import Livescore from './Livescore';
import Ranking from './Ranking';
import Social from './Social';
import Upcoming_events from './Upcoming_events';
import TeamRanking from './TeamRanking';
import Register from './Register';
import Profile from './Profile';
import ManualNewsGet from './ManualNewsGet';
import Scorecard from './Scorecard'
import NewsPopup from './NewsPopup';
import TradingTweet from './TradingTweet';
import Login from "./Login"
import UserRegister from "./UserRegister"
import ResetPassword from "./passwordreset"


function Router() {
  return (
   
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/home" element={<Home/>}/>        
        <Route path="/aboutUs" element={<Aboutus/>}/>
        <Route path="/livescore" element={<Livescore/>}/>       
        <Route path="/ranking" element={<Ranking/>}/>
        <Route path="/Social" element={<Social/>}/>
        <Route path="/upcoming_events" element={<Upcoming_events/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/Profile" element={<Profile/>}/>        
        <Route path="/teamRanking" element={<TeamRanking/>}/>        
        <Route path="/manualNewsGet" element={<ManualNewsGet/>}/>                       
        <Route path='/newspoup' element={<NewsPopup/>}/>
        <Route path='/trandingTweet' element={<TradingTweet/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/scorecard' element={<Scorecard/>}/>
        <Route path='/userRegister' element={<UserRegister/>}/>
        <Route path='/resetPassword' element={<ResetPassword/>}/>
       
       
       

    </Routes>
    

  )
  
}

export default Router
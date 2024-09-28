import React from 'react';
import Login from './login/Login';
import Signup from './signup/Signup';
// import Success from './test/Success';
import './App.css';
import Background from './Backgroud/Background';
import Start from './Start/Start';
import Grammer from './Grammer/Grammer';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import MyPage from './myPage/MyPage';


function App() {
  return (
    <Router>
      <Background />
      <Routes>
          <Route path="/" element={<Start/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* <Route path="/success" element={<Success />} /> */}
          <Route path="/checkGrammer" element={<Grammer/>}/>
          <Route path="/myPage" element={<MyPage/>}/>


      </Routes>
    </Router>
  );
}

export default App;

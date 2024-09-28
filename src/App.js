import React from 'react';
import Login from './login/Login';
import Signup from './signup/Signup';
import Success from './test/Success';
import './App.css';
import Background from './Backgroud/Background';
import Start from './Start/Start';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";


function App() {
  return (
    <Router>
      <Background />
      <Routes>
          <Route path="/" element={<Start/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/success" element={<Success />} />
      </Routes>
    </Router>
  );
}

export default App;

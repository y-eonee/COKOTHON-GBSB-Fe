import React from 'react';
import Login from './login/Login';
import Signup from './signup/Signup';
import Success from './test/Success';
import './App.css';
import Background from './Backgroud/Background';
import Start from './Start/Start';
import Quiz from './Quiz/Quiz';
import QuizCorrect from './Quiz/QuizCorrect';

import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";

function App() {
    return (
        <Router>
            <Background/>
            <Routes>
                <Route path="/" element={<Start/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/success" element={<Success/>}/>
                <Route path="/quiz" element={<Quiz/>} />
                <Route path="/quiz-correct" element={<QuizCorrect/>}/>
            </Routes>
        </Router>
    );
}

export default App;
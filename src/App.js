import React from 'react';
import Login from './login/Login';
import Signup from './signup/Signup';
import Success from './test/Success';
import './App.css';
import Background from './Backgroud/Background';
import Start from './Start/Start';
import Quiz from './Quiz/Quiz';
import QuizCorrect from './Quiz/QuizCorrect';
import QuizWrong from './Quiz/QuizWrong';
import QuizStart from './Quiz/QuizStart';
import Grammer from './Grammer/Grammer';

import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";

import MyPage from './myPage/MyPage';
import GrammerLog from './GrammerLog/GrammerLog';


function App() {
    return (
        <Router>
            <Background/>
            <Routes>
                <Route path="/" element={<Start/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/success" element={<Success/>}/>
                <Route path="/quiz-start" element={<QuizStart/>} />
                <Route path="/quiz" element={<Quiz/>} />
                <Route path="/quiz-correct" element={<QuizCorrect/>}/>
                <Route path="/quiz-wrong" element={<QuizWrong/>}/>
                <Route path="/checkGrammer" element={<Grammer/>}/>
                <Route path="/myPage" element={<MyPage/>}/>
                <Route path="/myPage/myLog" element={<GrammerLog/>}/>
            </Routes>
        </Router>
    );
}

export default App;

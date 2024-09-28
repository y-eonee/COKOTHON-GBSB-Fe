import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './login/Login';
import Signup from './signup/Signup';
import Success from './test/Success';
import './App.css';

function App() {
    return (
        <Router>
            <header className="navbar">
                <h1>Nav</h1>
            </header>

            <main>
                <Routes>
                    <Route path="/login" element={<Login />} />  {/* 로그인 페이지 */}
                    <Route path="/signup" element={<Signup />} />  {/* 회원가입 페이지 */}
                    <Route path="/success" element={<Success />} />  {/* 성공 페이지 */}
                </Routes>
            </main>
        </Router>
    );
}

export default App;
import React, {startTransition} from "react";
import { useNavigate } from "react-router-dom";
import "./NavigationBar.css";

export default function NavigationBar(){
    const navigate = useNavigate();
    
    const handleSignIn =()=>{
        navigate('/signup');
    }

    const handleLogin =()=>{
        navigate('/login');
    }

    const handleGrammer =()=>{
        startTransition =()=>{
            navigate('/checkGrammer');
        }
    }

    const handleQuiz =()=>{
        console.log("quiz page");
    }

    const handleMyPage=()=>{
        startTransition =()=>{
            navigate('/checkGrammer');
        }
    }

    
    return(
        <div className="header">
            <div className="title-container">
                <span>뿌리 깊은 나무</span>
            </div>

           <div className="menu-container">
                <span onClick={handleSignIn}>회원가입</span>
                <span onClick={handleLogin}>로그인</span>
                <span onClick={handleGrammer}>맞춤법 검사</span>
                <span onClick={handleQuiz}>맞춤법 퀴즈</span>
                <span onClick={handleMyPage}>마이페이지</span>
           </div> 
            
        </div>
    );
}
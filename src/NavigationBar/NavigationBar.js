import React from "react";
import { useNavigate } from "react-router-dom";
import "./NavigationBar.css";

export default function NavigationBar(){
    const navigate = useNavigate();
    
    return(
        <div className="header">
            <div className="title-container">
                <span>뿌리 깊은 나무</span>
            </div>

           <div className="menu-container">
                <span>회원가입</span>
                <span>로그인</span>
                <span>맞춤법 검사</span>
                <span>맞춤법 퀴즈</span>
                <span>마이페이지</span>
           </div> 
            
        </div>
    );
}
import React from "react";
import "./LogIcon.css";
import { useNavigate } from "react-router-dom";

export default function LogIcon(){
    const navigate = useNavigate();

    const handleLogPage =()=>{
        navigate('./myLog');
    }
    return(
        <div className="icon-container">
            <img onClick={handleLogPage} src="./mypageIcon.png"/>
        </div>
    );
}
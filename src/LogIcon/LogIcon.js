import React from "react";
import "./LogIcon.css";
import { useNavigate } from "react-router-dom";

export default function LogIcon({ iconNum }) {
    const navigate = useNavigate();

    const handleLogPage = () => {
        console.log(iconNum);
        navigate(`/grammerlog/${iconNum}`); // iconNum을 URL에 포함시켜 전달
    };

    return (
        <div className="icon-container">
            <img onClick={handleLogPage} src="./mypageIcon.png" alt="Log Icon" />
        </div>
    );
}
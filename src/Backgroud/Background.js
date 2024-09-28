import React from "react";
import './Background.css'; // CSS 파일을 추가

export default function Background() {
    return (
        <div className="background">
            <img src="/background.png" alt="Background" />
        </div>
    );
}
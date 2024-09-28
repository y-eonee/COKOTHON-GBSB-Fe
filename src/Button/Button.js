import React, { useState, useEffect } from "react";
import "./Button.css";

export default function Button({ children, disabled, onClick }) {

    return (
        <div className="button-container">
            <button 
                className="button-enabled"
                onClick={disabled ? null : onClick} // disabled가 아닐 때만 onClick 핸들러 실행
            >
                {children}
            </button>
        </div>
    );
}
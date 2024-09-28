import React from "react";
import "./Button.css";

export default function Button({ children, disabled, onClick, className }) {
    return (
        <div className={`button-container ${className}`}>
            <button
                className={`button-enabled ${className}`}
                onClick={disabled ? null : onClick} // disabled가 아닐 때만 onClick 핸들러 실행
            >
                {children}
            </button>
        </div>
    );
}
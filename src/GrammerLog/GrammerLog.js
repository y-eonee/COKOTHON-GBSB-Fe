import React from "react";
import NavigationBar from "../NavigationBar/NavigationBar";

export default function GrammerLog(){
    return(
        <div style={{marginTop : 70}}>
            <NavigationBar/>
            <div className="rectangle-container">
                <div className="rectangle">
                    <div className="check-title">
                        <span>원문</span> 
                    </div>
                    <span className="input-content"/>
                </div>

                <div className="rectangle">
                    <div className="check-title">
                        <span>교정 결과</span>
                    </div>
                    <span className="input-content" />
                </div>
            </div>
        </div>
    );
}
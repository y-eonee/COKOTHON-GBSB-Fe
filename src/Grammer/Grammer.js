import React, { useState } from "react";
import { Canvas } from "react-three-fiber";
import NavigationBar from "../NavigationBar/NavigationBar";
import "./Grammer.css";

export default function Grammer(){
    const [content, setContent] = useState("");
    const [isTouched, setIsTouched] = useState(false);

    // 내용 지우기 함수
    const contentClear = () => {
        setContent("");  // 내용 초기화
        setIsTouched(false);  // 터치 상태 초기화
    }

    return(
        <div>
            <NavigationBar/>
            <div className="rectangle-container">
                <div className="rectangle">
                    <div className="check-title">
                        <span>원문</span> 
                        <img onClick={contentClear} src="/x.svg"/>
                    </div>
                    <textarea 
                        value={content}
                        onChange={(e) => {
                            setContent(e.target.value);
                            setIsTouched(true);  // 내용이 변경되면 isTouched를 true로 설정
                        }}
                        className="input-content"
                    />
 
                    <div className="submit-container"> 
                        <button className="button-enabled">검사하기</button>
                    </div>

                </div>
                <div className="rectangle">
                    <div className="check-title">
                        <span>교정 결과</span>
                    </div>
                    <textarea className="input-content" />
                </div>
                <div className="rectangle">
                    <div className="check-title">
                        <span>나의 나무</span> 
                    </div>
                    <Canvas>

                    </Canvas>
                </div>
            </div>
        </div>
    );
}
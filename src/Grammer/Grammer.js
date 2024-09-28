import React, { useState } from "react";
import { Canvas } from "react-three-fiber";
import NavigationBar from "../NavigationBar/NavigationBar";
import "./Grammer.css";
import TreeLevel1 from "../TreeModel/TreeLevel1";
import TreeLevel2 from "../TreeModel/TreeLevel2";
import TreeLevel3 from "../TreeModel/TreeLevel3";
import TreeLevel4 from "../TreeModel/TreeLevel4";
import TreeLevel5 from "../TreeModel/TreeLevel5";

export default function Grammer(){
    const [content, setContent] = useState("");
    const [isTouched, setIsTouched] = useState(false);

    // 내용 지우기 함수
    const contentClear = () => {
        setContent("");  // 내용 초기화
        setIsTouched(false);  // 터치 상태 초기화
    }

    return(
        <div style={{marginTop : 70}}>
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
                    <span className="input-content" />
                </div>
                <div className="rectangle">
                    <div className="check-title">
                        <span>나의 나무</span> 
                    </div>
                    <div className="experience-text">
                        <span>경험치 40을 획득했습니다.</span>
                    </div>
                    
                    {/* 경험치 불러오는 api */}
                    <TreeLevel1/>
                    {/* <TreeLevel2 /> */}
                    {/* <TreeLevel3/> */}
                    {/* <TreeLevel4/> */}
                    {/* <TreeLevel5/> */}
                </div>
            </div>
        </div>
    );
}
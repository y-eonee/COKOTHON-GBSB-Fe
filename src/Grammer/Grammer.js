import React, { useState, useRef } from "react";
import { Canvas, useFrame } from "react-three-fiber";
import NavigationBar from "../NavigationBar/NavigationBar";
import { useGLTF, OrbitControls } from "@react-three/drei";
import "./Grammer.css";

export default function Grammer(){
    const [content, setContent] = useState("");
    const [isTouched, setIsTouched] = useState(false);
    const treeRef = useRef(); // useRef 훅으로 오브젝트 참조 생성

    // 내용 지우기 함수
    const contentClear = () => {
        setContent("");  // 내용 초기화
        setIsTouched(false);  // 터치 상태 초기화
    }

    function RotatingTree1() {
        const { scene } = useGLTF('/tree_level1.gltf'); 
        useFrame(() => {
          if (treeRef.current) {
            treeRef.current.rotation.y += 0.003; // Y축을 기준으로 회전 (공전 효과)
          }
        });
    
        return (
          <group ref={treeRef} position={[0, -3, 0]} scale={[1.5,1.5,1.5]}>
            <primitive object={scene} />
          </group>
        );
    }

    function RotatingTree2() {
        const { scene } = useGLTF('/tree_level2.gltf'); 
        useFrame(() => {
          if (treeRef.current) {
            treeRef.current.rotation.y += 0.003; // Y축을 기준으로 회전 (공전 효과)
          }
        });
    
        return (
          <group ref={treeRef} position={[0, -5, 0]} scale={[1.1,1.1,1.1]}>
            <primitive object={scene} />
          </group>
        );
    }


    function RotatingTree3() {
        const { scene } = useGLTF('/tree_level3.gltf'); 
        useFrame(() => {
          if (treeRef.current) {
            treeRef.current.rotation.y += 0.003; // Y축을 기준으로 회전 (공전 효과)
          }
        });
    
        return (
          <group ref={treeRef} position={[0, -7, 0]} scale={[3.3,3.3,3.3]}>
            <primitive object={scene} />
          </group>
        );
    }


    function RotatingTree4() {
        const { scene } = useGLTF('/tree_level4.gltf'); 
        useFrame(() => {
          if (treeRef.current) {
            treeRef.current.rotation.y += 0.003; // Y축을 기준으로 회전 (공전 효과)
          }
        });
    
        return (
          <group ref={treeRef} position={[0, -5, 0]} scale={[1,1,1]}>
            <primitive object={scene} />
          </group>
        );
    }


    function RotatingTree5() {
        const { scene } = useGLTF('/tree_start.gltf'); 
        useFrame(() => {
          if (treeRef.current) {
            treeRef.current.rotation.y += 0.003; // Y축을 기준으로 회전 (공전 효과)
          }
        });
    
        return (
          <group ref={treeRef} position={[0, -5, 0]} scale={[1.6, 1.6, 1.6]}>
            <primitive object={scene} />
          </group>
        );
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
                    {/* <RotatingTree1/> */}
                    {/* <RotatingTree2/> */}
                    {/* <RotatingTree3/> */}
                    {/* <RotatingTree4/> */}
                    <RotatingTree5/>
                </div>
            </div>
        </div>
    );
}
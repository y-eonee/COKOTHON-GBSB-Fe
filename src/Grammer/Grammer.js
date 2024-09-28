import React, { useState, useRef, useEffect } from "react";
import { Canvas, useFrame } from "react-three-fiber";
import NavigationBar from "../NavigationBar/NavigationBar";
import { useGLTF, OrbitControls } from "@react-three/drei";
import "./Grammer.css";
import axios from "axios";

export default function Grammer(){
    const [content, setContent] = useState("");
    const [isTouched, setIsTouched] = useState(false);
    const [correctionResults, setCorrectionResults] = useState([]); // 교정 결과 상태 추가
    const treeRef = useRef(); // useRef 훅으로 오브젝트 참조 생성

    const [exp, setExp] = useState(0);  // 경험치 상태 추가

    // const SERVER_URL = process.env.REACT_APP_SERVEL_URL;
    // console.log(SERVER_URL); 

   
    // 맞춤법 검사 API 호출
    async function checkSpelling(sentence) {
      try {
          console.log(sentence);
          const response = await axios.post(`http://10.223.114.198:8080`, {
              "sentence": sentence
          });
          console.log(response.data);
          setCorrectionResults(response.data.result);
          setExp(response.data.exp); // 경험치 업데이트
          return response.data;  // 교정 결과 데이터 반환
      } catch (error) {
          console.error('API 에러:', error);
          return null;
      }
    }


    // 경험치 호출 API
    async function fetchTreeExp() {
      try {
          const response = await axios.post(`http://10.223.114.198:8080/tree`);
          console.log(response.data.exp);
          return response.data.exp; // 경험치 데이터 반환
      } catch (error) {
          console.error('API 에러:', error);
          return null;
      }
  }


    // API 호출 및 경험치 설정
    useEffect(() => {
        const loadExp = async () => {
            const exp = await fetchTreeExp();
            if (exp !== null) {
                setExp(exp);
                renderTreeByExp();
            }
        };
        loadExp();
    }, []);

    // 경험치에 따라 다른 나무 렌더링
    const renderTreeByExp = () => {
        if (exp >= 800) return <RotatingTree5 />;
        if (exp >= 600) return <RotatingTree4 />;
        if (exp >= 400) return <RotatingTree3 />;
        if (exp >= 200) return <RotatingTree2 />;
        return <RotatingTree1 />;
    };


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
                        <button onClick={() => checkSpelling(content)}className="button-enabled">검사하기</button> 
                    </div>

                </div>
                <div className="rectangle">
                    <div className="check-title">
                        <span>교정 결과</span>
                    </div>
                    <span className="input-content">
                        {correctionResults.map((result, index) => (
                            <div key={index}>
                                <strong>교정해야할 부분</strong> {result.token} <br />
                                <strong>제안</strong> {result.suggestions.join(", ")} <br />
                                <strong>틀린 이유</strong> {result.info} <br />
                                <hr />
                            </div>
                        ))}
                    </span>
                </div>
                <div className="rectangle">
                    <div className="check-title">
                        <span>나의 나무</span> 
                    </div>
                    <div className="experience-text">
                      {exp > 0 && <span>경험치 {exp}을 획득했습니다.</span>}
                    </div>
                    <Canvas
                      camera={{ position: [0, 15, 20], fov: 60 }} 
                    >
                      <ambientLight color={'#ffffff'} intensity={3} />
                      <pointLight color={'#B778FF'} position={[10, 10, 10]} intensity={3} />  
                      <spotLight color={'#B778FF'}  angle={0.15} penumbra={1} intensity={1} />

                      {/* 경험치 불러오는 api */}
                      {/* {renderTreeByExp()} */}
                      
                        <OrbitControls 
                            enablePan={false} 
                            enableZoom={false}
                            minPolarAngle={Math.PI / 2}  // 상하 회전 제한
                            maxPolarAngle={Math.PI / 2}  // 상하 회전 제한
                            maxAzimuthAngle={Math.PI / 4}   // 오른쪽 회전 제한
                        />
                    </Canvas>
                   
                </div>
            </div>
        </div>
    );
}
import React, { useState, useRef, useEffect } from "react";
import { Canvas, useFrame } from "react-three-fiber";
import NavigationBar from "../NavigationBar/NavigationBar";
import { useGLTF, OrbitControls } from "@react-three/drei";
import "./Grammer.css";
import axios from "axios";

export default function Grammer() {
    const [content, setContent] = useState("");
    const [isTouched, setIsTouched] = useState(false);
    const [correctionResults, setCorrectionResults] = useState([]);
    const [expTextView, setExpTextView] = useState(false);
    const [exp, setExp] = useState(0); //검사할 때 exp
    const [allExp, setAllExp] = useState(0); //총량 exp
    const treeRef = useRef();
    const accessToken = localStorage.getItem('token');


    // 맞춤법 검사 API 호출
    async function checkSpelling(sentence) {
        try {
            const response = await axios.post(`http://10.223.114.198:8080`, 
                {
                    "sentence": sentence
                }, 
                {
                    headers: {
                        Authorization: `${accessToken}`,
                    },
                }
            );
            setCorrectionResults(response.data.result);
            console.log(response.data.result);
            setExp(response.data.exp);
            setAllExp(allExp + exp);
            fetchTreeExp();
            setExpTextView(true);
        } catch (error) {
            console.error('API 에러:', error);
        }
    }

    // 경험치 호출 API
    const fetchTreeExp = async () => {
        try {
            const response = await axios.post(`http://10.223.114.198:8080/tree`, null, {
                headers: {
                    Authorization: `${accessToken}`,
                },
            });
            setAllExp(allExp);
        } catch (error) {
            console.error('API 에러:', error);
        }
    };

    // 경험치에 따라 나무 렌더링
    const renderTreeByExp = () => {
        if (exp >= 800) return <RotatingTree5 />;
        if (exp >= 600) return <RotatingTree4 />;
        if (exp >= 400) return <RotatingTree3 />;
        if (exp >= 200) return <RotatingTree2 />;
        return <RotatingTree1 />;
    };

    useEffect(() => {
        fetchTreeExp(); // 컴포넌트 마운트 시 경험치 데이터 가져오기
    }, []); // 빈 배열을 의존성으로 사용하여 처음 한 번만 호출

    const contentClear = () => {
        setContent("");
        setIsTouched(false);
    };

    // 나무 모델 컴포넌트들
    const RotatingTree1 = () => {
        const { scene } = useGLTF('/tree_level1.gltf');
        useFrame(() => {
            if (treeRef.current) {
                treeRef.current.rotation.y += 0.003;
            }
        });
        return <group ref={treeRef} position={[0, -3, 0]} scale={[1.5, 1.5, 1.5]}><primitive object={scene} /></group>;
    };

    const RotatingTree2 = () => {
        const { scene } = useGLTF('/tree_level2.gltf');
        useFrame(() => {
            if (treeRef.current) {
                treeRef.current.rotation.y += 0.003;
            }
        });
        return <group ref={treeRef} position={[0, -5, 0]} scale={[1.1, 1.1, 1.1]}><primitive object={scene} /></group>;
    };

    const RotatingTree3 = () => {
        const { scene } = useGLTF('/tree_level3.gltf');
        useFrame(() => {
            if (treeRef.current) {
                treeRef.current.rotation.y += 0.003;
            }
        });
        return <group ref={treeRef} position={[0, -7, 0]} scale={[3.3, 3.3, 3.3]}><primitive object={scene} /></group>;
    };

    const RotatingTree4 = () => {
        const { scene } = useGLTF('/tree_level4.gltf');
        useFrame(() => {
            if (treeRef.current) {
                treeRef.current.rotation.y += 0.003;
            }
        });
        return <group ref={treeRef} position={[0, -5, 0]} scale={[1, 1, 1]}><primitive object={scene} /></group>;
    };

    const RotatingTree5 = () => {
        const { scene } = useGLTF('/tree_start.gltf');
        useFrame(() => {
            if (treeRef.current) {
                treeRef.current.rotation.y += 0.003;
            }
        });
        return <group ref={treeRef} position={[0, -5, 0]} scale={[1.6, 1.6, 1.6]}><primitive object={scene} /></group>;
    };

    return (
        <div style={{ marginTop: 70 }}>
            <NavigationBar />
            <div className="rectangle-container">
                <div className="rectangle">
                    <div className="check-title">
                        <span>원문</span>
                        <img onClick={contentClear} src="/x.svg" />
                    </div>
                    <textarea
                        value={content}
                        onChange={(e) => {
                            setContent(e.target.value);
                            setIsTouched(true);
                        }}
                        className="input-content"
                    />
                    <div className="submit-container">
                        <button onClick={() => checkSpelling(content)} className="button-enabled">검사하기</button>
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
                        {expTextView && exp>0 &&  <span>경험치 {exp}을 획득했습니다.</span> }
                    </div>
                    <Canvas camera={{ position: [0, 15, 20], fov: 60 }}>
                        <ambientLight color={'#ffffff'} intensity={3} />
                        <pointLight color={'#B778FF'} position={[10, 10, 10]} intensity={3} />
                        <spotLight color={'#B778FF'} angle={0.15} penumbra={1} intensity={1} />
                        {renderTreeByExp()} {/* 여기에서 나무를 렌더링합니다. */}
                        <OrbitControls
                            enablePan={false}
                            enableZoom={false}
                            minPolarAngle={Math.PI / 2}
                            maxPolarAngle={Math.PI / 2}
                            maxAzimuthAngle={Math.PI / 4}
                        />
                    </Canvas>
                </div>
            </div>
        </div>
    );
}
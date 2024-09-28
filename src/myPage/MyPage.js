import React, { useRef, useState, useEffect }from "react";
import { Canvas, useFrame } from "react-three-fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import NavigationBar from "../NavigationBar/NavigationBar";
import "./MyPage.css";
import LogIcon from "../LogIcon/LogIcon";
import axios from "axios";
import GrammerLog from "../GrammerLog/GrammerLog";

export default function MyPage(){
    const treeRef = useRef(); // useRef 훅으로 오브젝트 참조 생성
    const [exp, setExp] = useState(0);  // 경험치 상태 추가
    const [logCount, setLogCount] = useState(0); // 로그 아이콘 개수를 위한 상태
    const [userInfo, setUserInfo] = useState({}); // 사용자 정보를 위한 상태
    const accessToken = localStorage.getItem('token');


    const fetchTreeExp = async () => {
      try {
          const response = await axios.post(`http://10.223.114.198:8080/tree`, null, {
              headers: {
                  Authorization: `${accessToken}`,
              },
          });
          setExp(response.data.exp);
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


     // 로그 개수 가져오기
     const fetchLogCount = async () => {
      try {
          const response = await axios.post(`http://10.223.114.198:8080/log`, null, {
              headers: {
                  Authorization: `${accessToken}`,
              },
          });
          console.log(response.data.logs);
          console.log(response.data.logs.length);
          setLogCount(response.data.logs.length); // 응답에서 로그 개수를 가져옵니다.
      } catch (error) {
          console.error('API 에러:', error);
      }
    };

     // 사용자 정보 가져오기
     const fetchUserInfo = async () => {
      try {
          const response = await axios.post(`http://10.223.114.198:8080/info`, null, {
              headers: {
                  Authorization: `${accessToken}`,
              },
          });
          setUserInfo(response.data); // 사용자 정보를 상태에 저장
      } catch (error) {
          console.error('API 에러:', error);
      }
    };

    useEffect(() => {
      fetchTreeExp(); // 컴포넌트 마운트 시 경험치 데이터 가져오기
      fetchLogCount(); // 로그 개수 가져오기
      fetchUserInfo(); // 사용자 정보 가져오기
    }, []); // 빈 배열을 의존성으로 사용하여 처음 한 번만 호출


    function RotatingTree1() {
        const { scene } = useGLTF('/tree_level1.gltf'); 
        useFrame(() => {
          if (treeRef.current) {
            treeRef.current.rotation.y += 0.003; // Y축을 기준으로 회전 (공전 효과)
          }
        });
    
        return (
          <group ref={treeRef} position={[0, -14.3, 0]} scale={[3,2,2]}>
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
          <group ref={treeRef} position={[0, -14.5, 0]} scale={[2.3,1.3,1.3]}>
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
          <group ref={treeRef} position={[0, -14.2, 0]} scale={[6.4,3.2,3.2]}>
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
          <group ref={treeRef} position={[0, -15, 0]} scale={[2.0,1.3,1.3]}>
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
          <group ref={treeRef} position={[0, -14, 0]} scale={[2.7,2,2]}>
            <primitive object={scene} />
          </group>
        );
    }

    return(
        <div>
            <NavigationBar/>
            <div className="parent-container">
                <div className="info-container">
                    <span id="info-title">회원 정보</span> <br />
                    <span id="info-text">닉네임: {userInfo.nickname}</span> <br /> 
                    <span id="info-text">🍀 경험치: {exp}</span> <br />
                </div>
                <div className="tree-container" style={{ width: '100vw', height: '80vh', margin: 0, padding: 0}}>
                    <Canvas
                        camera={{ position: [0, 15, 20], fov: 60 }} 
                    >
                        <ambientLight color={'#ffffff'} intensity={3} />
                        <pointLight color={'#B778FF'} position={[10, 10, 10]} intensity={3} />  
                        <spotLight color={'#B778FF'}  angle={0.15} penumbra={1} intensity={1} />
                        {renderTreeByExp()} {/* 여기에서 나무를 렌더링합니다. */}

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

            <div className="mypage-underground">
                <div className="log-container">
                    {[...Array(Math.min(logCount, 20))].map((_, index) => (
                        <div className="log-icon-wrapper" key={index}>
                            <LogIcon iconNum={index}/>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}

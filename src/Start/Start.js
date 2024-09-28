import React, { useRef } from "react";
import { Canvas } from '@react-three/fiber';
import { Html,OrbitControls, useGLTF } from '@react-three/drei';
import NavigationBar from "../NavigationBar/NavigationBar";
import "./Start.css";
import Button from "../Button/Button";
import { useFrame } from "react-three-fiber";
import { useNavigate } from "react-router-dom";

export default function Start(){
    const { scene } = useGLTF('/tree_start.gltf'); // useGLTF 훅 사용
    const treeRef = useRef(); // useRef 훅으로 오브젝트 참조 생성
    const navigate = useNavigate();

    function nextHandler(){
        navigate('/checkGrammer');
    }

    function RotatingTree() {
        useFrame(() => {
          if (treeRef.current) {
            treeRef.current.rotation.y += 0.003; // Y축을 기준으로 회전 (공전 효과)
          }
        });
    
        return (
          <group ref={treeRef} position={[0, -10, 0]} scale={[2,2,2]}>
            <primitive object={scene} />
          </group>
        );
      }

    return(
        <div style={{ width: '100vw', height: '80vh', margin: 0, padding: 0 }}> 
            <NavigationBar />
          
            <Canvas
            camera={{ position: [0, 0, 30], fov: 50 }}  // 카메라를 뒤로 배치하고 fov 설정
            >
                <ambientLight color={'#ffffff'} intensity={3} />
                <pointLight color={'#B778FF'} position={[10, 10, 10]} intensity={3} />
                <spotLight color={'#B778FF'} position={[0, 10, 0]} angle={0.15} penumbra={1} intensity={1} />

                
                <RotatingTree />
                <OrbitControls 
                    enablePan={false} 
                    enableZoom={false}
                    minPolarAngle={Math.PI / 2}  // 상하 회전 제한
                    maxPolarAngle={Math.PI / 2}  // 상하 회전 제한
                    maxAzimuthAngle={Math.PI / 4}   // 오른쪽 회전 제한
                />
            </Canvas>

            <Button className="start-button" onClick={nextHandler}>시작하기</Button>
            
            
           
        </div>
        
    )
}
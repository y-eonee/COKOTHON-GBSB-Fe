import React, { useRef } from "react";
import { Canvas } from '@react-three/fiber';
import { Html,OrbitControls, useGLTF } from '@react-three/drei';
import NavigationBar from "../NavigationBar/NavigationBar";
import "./Start.css";
import Button from "../Button/Button";
import { useFrame } from "react-three-fiber";

export default function Start(){
    const { scene } = useGLTF('/tree_start.gltf'); // useGLTF 훅 사용
    const treeRef = useRef(); // useRef 훅으로 오브젝트 참조 생성

    function RotatingTree() {
        useFrame(() => {
          if (treeRef.current) {
            treeRef.current.rotation.y += 0.005; // Y축을 기준으로 회전 (공전 효과)
          }
        });
    
        return (
          <group ref={treeRef} position={[0, -8, 0]} scale={[2,2,2]}>
            <primitive object={scene} />
          </group>
        );
      }

    return(
        <div style={{ width: '100vw', height: '100vh', margin: 0, padding: 0 }}> 
            <NavigationBar />
            {/* 2D 흰색 동그라미 배경 */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '200px', // 원하는 크기로 설정
                height: '200px', // 원하는 크기로 설정
                backgroundColor: 'white',
                borderRadius: '50%',
                transform: 'translate(-50%, -50%)', // 중앙 정렬
                zIndex: -1 // 3D 오브젝트 뒤에 위치하도록 설정
            }}></div>

            <Canvas
            camera={{ position: [0, 0, 30], fov: 50 }}  // 카메라를 뒤로 배치하고 fov 설정
            >
                <ambientLight color={'#ffffff'} intensity={3} />
                <pointLight color={'#B778FF'} position={[10, 10, 10]} intensity={3} />
                <spotLight color={'#B778FF'} position={[0, 10, 0]} angle={0.15} penumbra={1} intensity={1} />

                {/* <primitive object={scene} scale={[2.1,2.1,2.1]} position={[0, -8, 0]} /> */}
                
                <RotatingTree />
                <OrbitControls 
                    enablePan={false} 
                    enableZoom={false}
                    minPolarAngle={Math.PI / 2}  // 상하 회전 제한
                    maxPolarAngle={Math.PI / 2}  // 상하 회전 제한
                    maxAzimuthAngle={Math.PI / 4}   // 오른쪽 회전 제한
                />
            </Canvas>
            <Button>시작하기</Button>
        </div>
        
    )
}
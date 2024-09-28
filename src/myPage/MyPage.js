import React, { useRef }from "react";
import { Canvas, useFrame } from "react-three-fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import NavigationBar from "../NavigationBar/NavigationBar";
import "./MyPage.css";

export default function MyPage(){
    const treeRef = useRef(); // useRef 훅으로 오브젝트 참조 생성

    function RotatingTree1() {
        const { scene } = useGLTF('/tree_level1.gltf'); 
        useFrame(() => {
          if (treeRef.current) {
            treeRef.current.rotation.y += 0.003; // Y축을 기준으로 회전 (공전 효과)
          }
        });
    
        return (
          <group ref={treeRef} position={[0, -13, 0]} scale={[2,2,2]}>
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
          <group ref={treeRef} position={[0, -13, 0]} scale={[1.3,1.3,1.3]}>
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
          <group ref={treeRef} position={[0, -10, 0]} scale={[3.2,3.2,3.2]}>
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
          <group ref={treeRef} position={[0, -15, 0]} scale={[1.3,1.3,1.3]}>
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
          <group ref={treeRef} position={[0, -13, 0]} scale={[2,2,2]}>
            <primitive object={scene} />
          </group>
        );
    }

    return(
        <div>
            <NavigationBar/>
            <div className="parent-container">
                <div className="info-container">
                    <span>회원 정보</span> <br/>
                    <span>닉네임(ID)</span> <br/>
                    <span>경험치</span> <br/>
                </div>
                <div className="tree-container" style={{ width: '100vw', height: '80vh', margin: 0, padding: 0}}>
                    <Canvas
                        camera={{ position: [0, 15, 20], fov: 60 }} 
                    >
                        <ambientLight color={'#ffffff'} intensity={3} />
                        <pointLight color={'#B778FF'} position={[10, 10, 10]} intensity={3} />  
                        <spotLight color={'#B778FF'}  angle={0.15} penumbra={1} intensity={1} />
                        {/* <RotatingTree1/> */}
                        {/* <RotatingTree2/> */}
                        {/* <RotatingTree3/> */}
                        {/* <RotatingTree4/> */}
                        <RotatingTree5/>



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
            
            <div className="log-container"></div>
        </div>
    );
}

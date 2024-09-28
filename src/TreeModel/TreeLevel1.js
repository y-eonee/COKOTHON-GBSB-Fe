import React, {useRef} from "react";
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls } from "@react-three/drei";

export default function TreeLevel1(){
    const { scene } = useGLTF('/tree_level1.gltf'); // 프론트용
    const treeRef = useRef(); // useRef 훅으로 오브젝트 참조 생성

    function RotatingTree() {
        useFrame(() => {
          if (treeRef.current) {
            treeRef.current.rotation.y += 0.003; // Y축을 기준으로 회전 (공전 효과)
          }
        });
    
        return (
          <group ref={treeRef} position={[0, -3, 0]} scale={[1.5, 1.5, 1.5]}>
            <primitive object={scene} />
          </group>
        );
      }

    return(
        <Canvas
            camera={{ position: [0, 15, 20], fov: 60 }}
        >
            <ambientLight color={'#ffffff'} intensity={3} />
            <pointLight color={'#B778FF'} position={[10, 10, 10]} intensity={3} />
            <spotLight color={'#B778FF'}  angle={0.15} penumbra={1} intensity={1} />
            {/* <primitive scale = {[1.5, 1.5, 1.5]} position={[0, -3, 0]} object={scene} /> */}
            <RotatingTree/>
            <OrbitControls 
                    enablePan={false} 
                    enableZoom={false}
                    minPolarAngle={Math.PI / 2}  // 상하 회전 제한
                    maxPolarAngle={Math.PI / 2}  // 상하 회전 제한
                    maxAzimuthAngle={Math.PI / 4}   // 오른쪽 회전 제한
            />
        </Canvas>
    );
}
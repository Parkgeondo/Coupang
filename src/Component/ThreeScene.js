import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export default function ThreeScene() {
    const containerRef = useRef(null);
    const sceneRef = useRef(null);
    const rendererRef = useRef(null);
    const animationIdRef = useRef(null);
    const modelRef = useRef(null);
    const timeRef = useRef(0);

    useEffect(() => {
        if (!containerRef.current) return;

        // 씬 생성
        const scene = new THREE.Scene();
        sceneRef.current = scene;

        // 카메라 생성
        const camera = new THREE.OrthographicCamera(
            -1,
            1,
            1,
            -1,
            0.1,
            1000
        );
        camera.position.z = 4.5;
        camera.position.x = -5;
        camera.position.y = 5.6;
        camera.lookAt(0, 0, 0);

        // 렌더러 생성
        const renderer = new THREE.WebGLRenderer({ 
            antialias: true,
            alpha: true 
        });
        renderer.setSize(600, 600); // 고해상도로 렌더링 (CSS로 축소)
        renderer.domElement.style.width = '250px';
        renderer.domElement.style.height = '250px';
        containerRef.current.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        // GLB 모델 로드
        const loader = new GLTFLoader();
        loader.load(
            '/assets/3D.glb',
            (gltf) => {
                const model = gltf.scene;
                scene.add(model);
                modelRef.current = model;
                
                // 모델 크기 및 위치 조정 (필요시)
                const box = new THREE.Box3().setFromObject(model);
                const center = box.getCenter(new THREE.Vector3());
                const size = box.getSize(new THREE.Vector3());
                
                
                // 모델 크기 조정 (카메라에 맞게)
                const maxDim = Math.max(size.x, size.y, size.z);
                const scale = 2 / maxDim; // 카메라 거리에 맞게 조정
                model.scale.multiplyScalar(scale);
                model.position.set(0, 0, 0);
            },
            (progress) => {
                // 로딩 진행 상황 (선택사항)
                console.log('Loading progress:', (progress.loaded / progress.total * 100) + '%');
            },
            (error) => {
                console.error('Error loading GLB model:', error);
            }
        );

        // 애니메이션 루프
        const animate = () => {
            animationIdRef.current = requestAnimationFrame(animate);

            if (modelRef.current) {
                timeRef.current += 0.02; // 시간 증가 (속도 조절)
                // sin 함수로 z축 왔다갔다 움직임 (범위: -0.5 ~ 0.5)
                modelRef.current.position.z = Math.sin(timeRef.current) * 0.2;
                modelRef.current.position.y = Math.sin(timeRef.current*8) * 0.01 -0.3;
            }
            renderer.render(scene, camera);
        };
        animate();

        // 클린업
        return () => {
            if (animationIdRef.current) {
              cancelAnimationFrame(animationIdRef.current);
            }
          
            if (rendererRef.current) {
              rendererRef.current.dispose();
          
              if (rendererRef.current.domElement?.parentNode) {
                rendererRef.current.domElement.parentNode.removeChild(
                  rendererRef.current.domElement
                );
              }
          
              rendererRef.current = null;
            }
          };
    }, []);

    return (
        <div 
            ref={containerRef} 
            className="w-[200px] h-[200px] flex items-center justify-center"
        />
    );
}

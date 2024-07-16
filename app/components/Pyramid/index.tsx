import { useEffect } from "react";
import { useGLTF, useMatcapTexture } from "@react-three/drei";
import { useSpring, a } from "@react-spring/three";
import * as THREE from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";

// Preload the GLTF model
useGLTF.preload("/models/level-react-draco.glb");

interface CustomGLTF extends GLTF {
  nodes: {
    Pyramid: THREE.Mesh<
      THREE.BufferGeometry,
      THREE.Material | THREE.Material[]
    >;
  };
}

export default function Pyramid() {
  const { nodes } = useGLTF(
    "/models/level-react-draco.glb"
  ) as unknown as CustomGLTF;
  const [matcap] = useMatcapTexture("489B7A_A0E7D9_6DC5AC_87DAC7", 1024);
  const [spring, api] = useSpring(
    () => ({ rotation: [0, 0, 0], config: { mass: 5, tension: 200 } }),
    []
  );

  useEffect(() => {
    let timeout: string | number | NodeJS.Timeout | undefined;
    const rotate = () => {
      api.start({
        rotation: [
          (Math.random() - 0.5) * Math.PI * 3,
          0,
          (Math.random() - 0.5) * Math.PI * 3,
        ],
      });
      timeout = setTimeout(rotate, (0.5 + Math.random() * 2) * 1000);
    };
    rotate();
    return () => clearTimeout(timeout);
  }, [api]);

  return (
    <a.mesh geometry={nodes?.Pyramid?.geometry} position={[-0.8, 1.33, 0.25]}>
      <meshMatcapMaterial matcap={matcap} />
    </a.mesh>
  );
}

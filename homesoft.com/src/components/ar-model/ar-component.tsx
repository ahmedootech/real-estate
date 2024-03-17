import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'; // Import DRACOLoader
// import draco3d from 'draco3d/draco_decoder_nodejs';

const ARComponent = ({ arModelUrl }) => {
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sceneRef.current) {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);

      sceneRef.current.appendChild(renderer.domElement);

      // Create a DRACOLoader instance
      const dracoLoader = new DRACOLoader();
      //   dracoLoader.setDecoderConfig({ type: 'js' });
      dracoLoader.setDecoderPath(
        // '/draco/gltf/'
        'https://www.gstatic.com/draco/versioned/decoders/1.5.7/'
        // '../../node_modules/draco3d/draco_decoder_nodejs'
        // draco3d
        // '../../node_modules/three/examples/jsm/libs/draco/'
      ); // Specify the path to the Draco decoder
      dracoLoader.preload(); // Preload Draco decoder

      const loader = new GLTFLoader();

      // Pass the DRACOLoader instance to the GLTFLoader
      loader.setDRACOLoader(dracoLoader);

      loader.load(arModelUrl, (gltf) => {
        const model = gltf.scene;
        scene.add(model);

        camera.position.set(0, 0, 5);
        camera.lookAt(0, 0, 0);
      });

      const animate = () => {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
      };
      animate();

      return () => {
        scene.remove();
        renderer.dispose();
      };
    }
  }, [arModelUrl]);

  return <div ref={sceneRef} className="w-100" />;
};

export default ARComponent;

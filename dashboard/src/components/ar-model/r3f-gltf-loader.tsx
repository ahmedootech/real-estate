import { useLoader } from '@react-three/fiber';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

const GLTFModelLoader = (props) => {
  const gltf = useLoader(GLTFLoader, props.url as GLTF & string, (loader) => {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/gltf/');
    loader.setDRACOLoader(dracoLoader);
  });
  return <primitive object={gltf.scene} />;
};

export default GLTFModelLoader;

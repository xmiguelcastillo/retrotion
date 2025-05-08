import { useEffect, useState } from "react";
import "./App.css";
import { RAWG_API } from "./api/rawg";

import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  PerspectiveCamera,
  Center,
} from "@react-three/drei";

import { Playstation2 } from "./models/Playstation2";
function App() {
  const [desc, setDes] = useState("");
  useEffect(() => {
    const fetchRAWG_API = async () => {
      const data = await RAWG_API();
      if (data) {
        console.log(data);
        setDes(data.description);
      }
    };
    fetchRAWG_API();
  }, []);
  return (
    <div className="flex flex-col justify-center items-center">
      Playstation
      <div className="flex justify-center items-center w-full h-[300px]">
        <div className="flex justify-center items-center w-4/5 h-4/5 bg-blue-200">
          <Canvas shadows className="pointer-events-none">
            <Environment preset="city" />

            {/* Custom Perspective Camera */}
            <PerspectiveCamera
              makeDefault
              far={1400}
              fov={10.598}
              position={[-700, 40, 50]}
              rotation={[0, 0, 0]}
            />

            {/* Dynamically render the model */}
            <Center>
              <Playstation2
                scale={60}
                position={[30, -42, 10]}
                rotation={[0, -Math.PI / 2, 0]}
                castShadow
                receiveShadow
              />
            </Center>

            <OrbitControls enableZoom={true} autoRotate={false} />
          </Canvas>
        </div>
      </div>
      <p>{desc}</p>
    </div>
  );
}

export default App;

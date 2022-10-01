import { useState, useEffect, useRef } from "react";
import { useWindowDimension } from "./use-window-dimension";
import reactLogo from "./assets/react.svg";
import "./App.css";

import * as THREE from "three";

function App() {
  const [width, height] = useWindowDimension();
  const [count, setCount] = useState(0);
  const canvasContainerRef = useRef();
  useEffect(() => 
    renderScene()
  , [width, height]);

  function renderScene() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    canvasContainerRef.current.appendChild(renderer.domElement);
    const geometry = new THREE.BoxGeometry(2, 1, 1);
    const material = new THREE.MeshPhongMaterial({ color: 0x00ffff });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.target.position.set(0, 0, 0);
    light.position.set(10, 10, 10);
    scene.add(light);

    
    function animate() {
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      rafId = requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }
    let rafId = requestAnimationFrame(animate);
    
    
    return () => {
      renderer.forceContextLoss();
      renderer.dispose();
      cube.geometry.dispose();
      cube.material.dispose();
      cancelAnimationFrame(rafId);
      renderer.domElement.remove();
    }
  }

  return (
    <div className="App">
      <div ref={canvasContainerRef} className="background">

      </div>
      
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;

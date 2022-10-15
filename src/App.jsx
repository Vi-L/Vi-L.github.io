import { useState, useEffect, useRef } from "react";
import { useWindowDimension } from "./use-window-dimension";
import reactLogo from "./assets/react.svg";
import "./App.css";

import * as THREE from "three";

function App() {
  const [width, height] = useWindowDimension();
  const canvasContainerRef = useRef();
  useEffect(() => renderScene(), [width, height]);

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
    };
  }
  let cards = [
    {
      title: "Sqlite Blog",
      link: "https://sqlite-blog.glitch.me",
      desc: "A blog website made with Express and Sqlite",
    },
    {
      title: "Socketio Chat App",
      link: "https://socketio-chat-app.glitch.me",
      desc: "A real time chat app made with Socket.io",
    },
    {
      title: "Cellular Automata JS",
      link: "https://cellular-automata-js.glitch.me",
      desc: "Cellular automata with a rule slider",
    },
    // {},
    // {},
    // {}
  ];

  return (
    <div className="App">
      <div ref={canvasContainerRef} className="background"></div>
      <h1>Victor's Portfolio</h1>
      <div className="grid-wrapper">
        {cards.map((card) => {
          return (
            <div key={card.title} className="card">
              <a target="_blank" href={card.link}>
                <h2>{card.title}</h2>
                <p>{card.desc}</p>
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;

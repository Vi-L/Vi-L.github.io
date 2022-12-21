import { useState, useEffect, useRef } from "react";
import { useWindowDimension } from "./use-window-dimension";
import "./App.css";

import Card from "./Card"

import socketioappSS from "./assets/socketiochatappSS.png";
import sqliteblogSS from "./assets/sqliteblogSS.png";
import cellularautomataSS from "./assets/cellularautomataSS.png";

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
  let cards = [ // TODO: fix images, e.g. chop off sqliteblog try to get widths of 750px
    {
      title: "Sqlite Blog",
      link: "https://sqlite-blog.glitch.me",
      img: sqliteblogSS,
      desc: "A blog website made with Express and Sqlite"
    },
    {
      title: "Socketio Chat App",
      link: "https://socketio-chat-app.glitch.me",
      img: socketioappSS,
      desc: "A real time chat app made with Socket.io"
    },
    {
      title: "Cellular Automata JS",
      link: "https://cellular-automata-js.glitch.me",
      img: cellularautomataSS, 
      desc: "Cellular automata with a rule slider"
    },
    {
      title: "test",
      link: "",
      img: sqliteblogSS,
      desc: "foobarrrrrrr"
    },
    {
      title: "test1",
      link: "",
      img: "https://placekitten.com/200/300",
      desc: "foobarrrrrrr"
    },
    {
      title: "test2",
      link: "",
      img: "https://placekitten.com/200/500",
      desc: "foobarrrrrrr"
    },
    // {},
    // {}
  ];

  return (
    <div className="App">
      <div ref={canvasContainerRef} className="background"></div>
      <h1>Victor's Portfolio</h1>
      <div className="flex-wrapper">
        <div className="card-column">
          {cards.slice(0, 2).map((card) => <Card key={card.title} {...card}/>)}
        </div>
        <div className="card-column">
          {cards.slice(2, 4).map((card) => <Card key={card.title} {...card}/>)}
        </div>
        <div className="card-column">
          {cards.slice(4).map((card) => <Card key={card.title} {...card}/>)}
        </div>
      </div>
    </div>
  );
}

export default App;

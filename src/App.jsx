import { useState, useEffect, useRef } from "react";
import { useWindowDimension } from "./use-window-dimension";
import "./App.css";

import Card from "./Card"

import socketioappSS from "./assets/socketiochatappSS.png";
import sqliteblogSS from "./assets/sqliteblogSS.png";
import cellularautomataSS from "./assets/cellularautomataSS.png";
import raycastingSS from "./assets/raycastingSS.png";
import conwaySS from "./assets/conwaySS.png";
import ASCIIWebcamSS from "./assets/ASCIIWebcamSS.png";

import * as THREE from "three";

function App() {
  const [width, height] = useWindowDimension();
  const canvasContainerRef = useRef();
  useEffect(() => renderScene(), [width, height]);

  let mouseX = 0;
  let mouseY = 0;
  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

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

    scene.background = new THREE.Color(0x1C3041);

    // star background from this guide 
    // https://medium.com/nerd-for-tech/adding-a-custom-star-field-background-with-three-js-79a1d18fd35d
    const loader = new THREE.TextureLoader();
    const geometry = new THREE.BufferGeometry();
    const material = new THREE.PointsMaterial({
      size: 1,
      map: loader.load(
        "https://raw.githubusercontent.com/Kuntal-Das/textures/main/sp2.png"
      ),
      transparent: true
    });
    const getRandomParticelPos = (particleCount) => {
      const arr = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount; i++) {
        arr[i] = (Math.random() - 0.5) * 100;
      }
      return arr;
    };
    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(getRandomParticelPos(500), 3)
    );
    const stars = new THREE.Points(geometry, material);
    scene.add(stars);

    camera.position.z = 5;

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.target.position.set(0, 0, 0);
    light.position.set(10, 10, 10);
    scene.add(light);

    function animate() {
      stars.rotation.x = mouseY * 0.00075;
      stars.rotation.y = mouseX * 0.00075;

      stars.position.x = mouseY * 0.01;
      stars.position.y = mouseX * 0.01;
      rafId = requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }
    let rafId = requestAnimationFrame(animate);

    return () => {
      renderer.forceContextLoss();
      renderer.dispose();
      stars.geometry.dispose();
      stars.material.dispose();
      cancelAnimationFrame(rafId);
      renderer.domElement.remove();
    };
  }
  let cards = [ 
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
      title: "MatterJS Raycasting",
      link: "https://replit.com/@VL-coder/matterjs-p5js-raycasting?v=1",
      img: raycastingSS,
      desc: "A Wolfenstein 3D-esque renderer made using MatterJS"
    },
    {
      title: "Conway's Game of Life",
      link: "https://conway-ca-js.glitch.me/",
      img: conwaySS,
      desc: "Conway's Game of Life made using p5.js"
    },
    {
      title: "ASCII Webcam + ASCII Video Chat",
      link: "https://webcam-to-ascii.glitch.me/",
      img: ASCIIWebcamSS,
      desc: "A live video chat, but with ASCII art"
    },
    // {},
    // {}
  ];

  return (
    <div className="App">
      <div ref={canvasContainerRef} className="background"></div>
      <h1 className="header">welcome.</h1>
      <div className="flex-wrapper">
        <div className="card-column">
          {cards.slice(0, cards.length / 3).map((card) => <Card key={card.title} {...card}/>)}
        </div>
        <div className="card-column">
          {cards.slice(cards.length / 3, 2 * cards.length / 3).map((card) => <Card key={card.title} {...card}/>)}
        </div>
        <div className="card-column">
          {cards.slice(2 * cards.length / 3).map((card) => <Card key={card.title} {...card}/>)}
        </div>
      </div>
    </div>
  );
}

export default App;

import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { VRButton } from "three/examples/jsm/webxr/VRButton.js";

class App extends Component {
  componentDidMount() {
    let camera, scene, renderer, sphere, clock, controls;

    init();
    animate();

    function init() {
      clock = new THREE.Clock();

      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x101010);

      const light = new THREE.AmbientLight(0xffffff, 1);
      scene.add(light);

      camera = new THREE.PerspectiveCamera(
        70,
        window.innerWidth / window.innerHeight,
        1,
        2000
      );
      scene.add(camera);

      // Create the panoramic sphere geometery
      const panoSphereGeo = new THREE.SphereGeometry(6, 256, 256);

      // Create the panoramic sphere material
      const panoSphereMat = new THREE.MeshStandardMaterial({
        side: THREE.BackSide,
        displacementScale: -4.0,
      });

      // Create the panoramic sphere mesh
      sphere = new THREE.Mesh(panoSphereGeo, panoSphereMat);

      // Load and assign the texture and depth map
      const manager = new THREE.LoadingManager();
      const loader = new THREE.TextureLoader(manager);

      loader.load("images/kandao3.jpg", function (texture) {
        texture.minFilter = THREE.NearestFilter;
        texture.generateMipmaps = false;
        sphere.material.map = texture;
      });

      loader.load("images/kandao3_depthmap.jpg", function (depth) {
        depth.minFilter = THREE.NearestFilter;
        depth.generateMipmaps = false;
        sphere.material.displacementMap = depth;
      });

      // On load complete add the panoramic sphere to the scene
      manager.onLoad = function () {
        scene.add(sphere);
      };

      renderer = new THREE.WebGLRenderer();
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.xr.enabled = true;
      renderer.xr.setReferenceSpaceType("local");
      document.body.appendChild(renderer.domElement);

      //Orbit Controls added 
      controls = new OrbitControls(camera, renderer.domElement);
      camera.position.set(0, 20, 100);
      controls.update();

      // document.body.appendChild(VRButton.createButton(renderer));

      //

      window.addEventListener("resize", onWindowResize);
    }

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function animate() {
      renderer.setAnimationLoop(render);
    }

    function render() {
      // If we are not presenting move the camera a little so the effect is visible

      if (renderer.xr.isPresenting === false) {
        const time = clock.getElapsedTime();

        sphere.rotation.y += 0.001;
        sphere.position.x = Math.sin(time) * 0.2;
        sphere.position.z = Math.cos(time) * 0.2;
      }

      renderer.render(scene, camera);
    }
  }

  render() {
    return <></>;
  }
}
export default App;

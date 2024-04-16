import * as THREE from 'three';
import * as THREEx from '@ar-js-org/ar.js/three.js/build/ar-threex-location-only.js';

function main() {
  const canvas = document.getElementById('canvas1');

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, 1.33, 0.1, 10000);
  const renderer = new THREE.WebGLRenderer({ canvas: canvas });

  const arjs = new THREEx.LocationBased(scene, camera);
  const cam = new THREEx.WebcamRenderer(renderer);

  const geom = new THREE.BoxGeometry(20, 20, 20);
  const mtl = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  const box = new THREE.Mesh(geom, mtl);
  arjs.add(box, -0.72, 51.051);


  arjs.fakeGps(-0.72, 51.05);

  requestAnimationFrame(render);

  function render() {
    if (canvas.width != canvas.clientWidth || canvas.height != canvas.clientHeight) {
      renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
      const aspect = canvas.clientWidth / canvas.clientHeight;
      camera.aspect = aspect;
      camera.updateProjectionMatrix();
    }
    cam.update();
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }
}

main();

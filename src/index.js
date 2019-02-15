const THREE = require('three');
const TrackballControls = require('three-trackballcontrols');
const {loadModels, models} = require('./models');

/**
 * Global THREE inits
 *
 */
const clock = new THREE.Clock();
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100000,
);
camera.position.z = 100;
camera.lookAt(0, 0, 0);
const controls = new TrackballControls(camera);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const sceneObjects = [];

/**
 * Render function. Executed every frame.
 *
 */
const render = () => {
  renderer.render(scene, camera);
};

/**
 * Animation function. Executed every frame.
 *
 */
const animate = () => {
  const delta = clock.getDelta();
  requestAnimationFrame(animate);
  controls.update();

  for (let i = 0; i < sceneObjects.length; i++) {
    sceneObjects[i].rotation.x += delta;
    sceneObjects[i].rotation.y += delta;
    sceneObjects[i].rotation.z += delta;
  }

  render();
};

/**
 * Scene init: load models, populate scene.
 *
 */
const init = async () => {
  await loadModels();
  const mat = new THREE.MeshNormalMaterial();
  for (let i = 0; i < models.skull.children.length; i++) {
    models.skull.children[i].material = mat;
  }
  sceneObjects.push(models.skull);
  scene.add(models.skull);
  animate();
};

init();

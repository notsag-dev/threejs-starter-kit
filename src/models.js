const THREE = require('three');
const OBJLoader = require('three-obj-loader');

OBJLoader(THREE);
const loader = new THREE.OBJLoader();

// List of models to load. Field id will be the key
// for the exported dict of models.
const modelFiles = [
 {id: 'skull', file: 'skull.obj'},
];

// Dictionary of models to be exported.
const models = {};

/**
 * Load obj file.
 *
 * Returns a promise.
 *
 */
const loadModel = (url) => {
  return new Promise((resolve, reject) => {
    loader.load(url,
      obj => {
        resolve(obj);
      },
      null,
      err => {
        console.log(err);
        reject(err);
      });
  });
}

/**
 * Load all models. Returns a promise that resolves
 * when all the models are loaded.
 *
 */
const loadModels = () => {
  const promises = [];
  modelFiles.forEach(model => {
    promises.push(loadModel(`assets/models/${model.file}`)
      .then(obj => {
        models[model.id] = obj;
      }));
  });
  return Promise.all(promises);
}

export {models, loadModels};

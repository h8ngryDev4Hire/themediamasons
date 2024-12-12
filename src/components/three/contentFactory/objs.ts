import * as THREE from 'three';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader';
import {
  CUBE_POS_X, CUBE_POS_Y, CUBE_POS_Z,
  BELT_LENGTH,
  BOX_POS_X, BOX_POS_Y, BOX_POS_Z,
  BOX_WIDTH, BOX_HEIGHT, BOX_DEPTH,
  FLAP_THICKNESS, SIDE_FLAP_WIDTH, FRONT_FLAP_DEPTH, FLAP_ANGLE,
  BOX_BOUNCE_DURATION, BOX_BOUNCE_AMPLITUDE,
  cubeConfigurations
} from './constants';

let currentConfigIndex = 0;
let boxBouncingTime = 0;
let isBoxBouncing = false;

export let cube: THREE.Mesh;
export let conveyor: THREE.Group;
export let cardboardBox: THREE.Group;

export function createObjects(scene: THREE.Scene) {
  createCube(scene);
  createConveyorBelt(scene);
  createCardboardBox(scene);
}

function createCube(scene: THREE.Scene) {
  const config = cubeConfigurations[currentConfigIndex];
  const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
  const cubeMaterial = new THREE.MeshStandardMaterial({
    color: config.color,
    emissive: config.glow,
    emissiveIntensity: 0.1
  });
  cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cube.position.set(CUBE_POS_X, CUBE_POS_Y, CUBE_POS_Z);
  scene.add(cube);

  const edgesGeometry = new THREE.EdgesGeometry(cubeGeometry);
  const edgesMaterial = new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 2 });
  const cubeOutline = new THREE.LineSegments(edgesGeometry, edgesMaterial);
  cube.add(cubeOutline);

  cube.renderOrder = 0;
  cubeOutline.renderOrder = 2;

  loadSVG(config.svg, cube);
}

function createConveyorBelt(scene: THREE.Scene) {
  conveyor = new THREE.Group();
  const segmentCount = 200;
  const segmentSize = 0.1;

  for (let i = 0; i < segmentCount; i++) {
    const segmentGeometry = new THREE.BoxGeometry(segmentSize, 0.5, 5);
    const segmentMaterial = new THREE.MeshBasicMaterial({
      color: i % 2 === 0 ? "rgb(70,70,70)" : "rgb(50,50,50)",
    });
    const segment = new THREE.Mesh(segmentGeometry, segmentMaterial);
    segment.position.x = (i - segmentCount / 2) * segmentSize;
    conveyor.add(segment);
  }
  scene.add(conveyor);
}

function createCardboardBox(scene: THREE.Scene) {
  cardboardBox = new THREE.Group();

  const textureLoader = new THREE.TextureLoader();
  const cardboardTexture = textureLoader.load('/contentFactory/cardboard-texture.jpg');
  cardboardTexture.wrapS = THREE.RepeatWrapping;
  cardboardTexture.wrapT = THREE.RepeatWrapping;
  cardboardTexture.repeat.set(2, 2);
  
  const boxMaterial = new THREE.MeshPhongMaterial({
    map: cardboardTexture,
    bumpMap: cardboardTexture,
    bumpScale: 0.05,
  });

  const blackMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 });

  const materials = [
    boxMaterial, boxMaterial, blackMaterial,
    boxMaterial, boxMaterial, boxMaterial
  ];

  const boxGeometry = new THREE.BoxGeometry(BOX_WIDTH, BOX_HEIGHT, BOX_DEPTH);
  const mainBox = new THREE.Mesh(boxGeometry, materials);
  cardboardBox.add(mainBox);

  const sideFlapGeometry = new THREE.BoxGeometry(SIDE_FLAP_WIDTH, FLAP_THICKNESS, BOX_DEPTH);
  const leftFlap = new THREE.Mesh(sideFlapGeometry, boxMaterial);
  leftFlap.position.set(BOX_WIDTH / 2, BOX_HEIGHT / 2 + FLAP_THICKNESS / 2, 0);
  leftFlap.rotation.z = FLAP_ANGLE;
  cardboardBox.add(leftFlap);

  const rightFlap = leftFlap.clone();
  rightFlap.position.x = -BOX_WIDTH / 2;
  rightFlap.rotation.z = -FLAP_ANGLE;
  cardboardBox.add(rightFlap);

  const frontBackFlapGeometry = new THREE.BoxGeometry(BOX_WIDTH, FLAP_THICKNESS, FRONT_FLAP_DEPTH);
  const frontFlap = new THREE.Mesh(frontBackFlapGeometry, boxMaterial);
  frontFlap.position.set(0, BOX_HEIGHT / 2 + FLAP_THICKNESS / 2, BOX_DEPTH / 2);
  frontFlap.rotation.x = -FLAP_ANGLE;
  cardboardBox.add(frontFlap);

  const backFlap = frontFlap.clone();
  backFlap.position.z = -BOX_DEPTH / 4 - .5;
  backFlap.rotation.x = FLAP_ANGLE;
  cardboardBox.add(backFlap);

  cardboardBox.position.set(BOX_POS_X, BOX_POS_Y, BOX_POS_Z);
  cardboardBox.receiveShadow = true;
  cardboardBox.castShadow = true;
  scene.add(cardboardBox);
}

function loadSVG(svgPath: string, parent: THREE.Object3D) {
  const loader = new SVGLoader();
  loader.load(
    svgPath,
    (data) => {
      if (svgPath) {
        const paths = data.paths;
        const group = new THREE.Group();

        for (let i = 0; i < paths.length; i++) {
          const path = paths[i];
          const material = new THREE.MeshBasicMaterial({
            color: '#ffffff',
            side: THREE.DoubleSide,
            depthWrite: false
          });

          const shapes = path.toShapes(true);

          for (let j = 0; j < shapes.length; j++) {
            const shape = shapes[j];
            const geometry = new THREE.ShapeGeometry(shape);
            const mesh = new THREE.Mesh(geometry, material);
            group.add(mesh);
          }
        }

        const box = new THREE.Box3().setFromObject(group);
        const center = box.getCenter(new THREE.Vector3());
        group.position.sub(center);

        const scaleFactor = 0.5;
        const maxDim = Math.max(box.max.x - box.min.x, box.max.y - box.min.y);
        const scale = (scaleFactor * 1) / maxDim;
        group.scale.multiplyScalar(scale);

        group.position.set(-0.25, 0.25, 0.501);
        group.rotation.x = Math.PI;
        
        parent.add(group);
      }
    },
    (xhr) => {
      console.log(svgPath, ' ', (xhr.loaded / xhr.total * 100) + '% loaded');
    },
    (error) => {
      console.log('An error happened', error);
    }
  );
}

export function updateCubeConfiguration() {
  currentConfigIndex = (currentConfigIndex + 1) % cubeConfigurations.length;
  const newConfig = cubeConfigurations[currentConfigIndex];
  
  (cube.material as THREE.MeshStandardMaterial).color.setStyle(newConfig.color);
  (cube.material as THREE.MeshStandardMaterial).emissive.setStyle(newConfig.glow);
  
  // Remove old SVG
  cube.remove(cube.children[1]); // Assuming the SVG is always the second child

  // Load new SVG
  loadSVG(newConfig.svg, cube);
}

export function startBoxBounceAnimation() {
  isBoxBouncing = true;
  boxBouncingTime = 0;
}

export function animateBoxBounce(deltaTime: number) {
  if (!isBoxBouncing) return;

  boxBouncingTime += deltaTime;
  const t = boxBouncingTime / BOX_BOUNCE_DURATION;

  if (t >= 1) {
    isBoxBouncing = false;
    cardboardBox.position.y = BOX_POS_Y;
    return;
  }

  // Simple damped sine wave for bounce effect
  const displacement = BOX_BOUNCE_AMPLITUDE * Math.sin(t * Math.PI) * Math.exp(-4 * t);
  cardboardBox.position.y = BOX_POS_Y - displacement;
}

import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { cube, conveyor, updateCubeConfiguration, startBoxBounceAnimation, animateBoxBounce } from './objs';
import {
  BELT_LENGTH,
  BOX_POS_Y,
  BOX_HEIGHT,
  CUBE_POS_X,
  CUBE_POS_Y,
  CUBE_POS_Z,
  GRAVITY,
  CONVEYOR_SPEED,
  GLOW_SPEED,
  GLOW_INTENSITY_MIN,
  GLOW_INTENSITY_MAX
} from './constants';

let isAnimating = true;
let glowTime = 0;
let lastTime = 0;
const cubeVelocity = new THREE.Vector3(0, 0, 0);
let cubeOnConveyor = false;

export function startAnimation(scene: THREE.Scene, camera: THREE.Camera, composer: EffectComposer) {
  lastTime = performance.now();
  animate(scene, camera, composer);
}

//export function setAnimating(value: boolean): boolean {
//  isAnimating = value;
//  if (isAnimating) {
//    lastTime = performance.now();
//    animate(cube.scene, cube.scene.camera, cube.scene.composer);
//  }
//  return isAnimating;
//}

function animate(scene: THREE.Scene, camera: THREE.Camera, composer: EffectComposer) {
  if (isAnimating) {
    requestAnimationFrame(() => animate(scene, camera, composer));

    const currentTime = performance.now();
    const deltaTime = (currentTime - lastTime) / 1000;
    lastTime = currentTime;

    // Move conveyor segments
    conveyor.children.forEach(segment => {
      segment.position.x += CONVEYOR_SPEED;
      if (segment.position.x > BELT_LENGTH / 2) {
        segment.position.x -= BELT_LENGTH;
      }
    });

    // Cube physics and movement
    cubeVelocity.y += GRAVITY * deltaTime;
    cube.position.y += cubeVelocity.y * deltaTime;

    if (cube.position.y <= 0.75 && cube.position.y > 0.25 && 
        Math.abs(cube.position.x) < BELT_LENGTH / 2) {
      cube.position.y = 0.75;
      cubeVelocity.y = 0;
      cubeOnConveyor = true;
    }

    if (cubeOnConveyor) {
      cube.position.x += CONVEYOR_SPEED;
      if (cube.position.x > (BELT_LENGTH / 2) + 2) {
        cubeOnConveyor = false;
      }
    }

    if (cube.position.y < BOX_POS_Y + BOX_HEIGHT / 2) {
      // Cube has entered the box
      startBoxBounceAnimation();
      cube.position.set(CUBE_POS_X, CUBE_POS_Y, CUBE_POS_Z);
      cubeVelocity.set(0, 0, 0);
      cubeOnConveyor = false;
      
      // Update cube configuration when it's reset
      updateCubeConfiguration();
    }

    // Animate box bounce
    animateBoxBounce(deltaTime);

    // Glow effect
    glowTime += deltaTime * GLOW_SPEED;
    const glowIntensity = THREE.MathUtils.lerp(
      GLOW_INTENSITY_MIN,
      GLOW_INTENSITY_MAX,
      (Math.sin(glowTime) + 1) / 2
    );
    (cube.material as THREE.MeshStandardMaterial).emissiveIntensity = glowIntensity;

    composer.render();
  }
}

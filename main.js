import './style.css'
import * as THREE from "three";
import spline from "./spline.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { HandControls } from './HandControls.js';
import { MediaPipeHands } from './MediaPipeHands.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass.js';
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { ColorCorrectionShader } from 'three/examples/jsm/shaders/ColorCorrectionShader.js';
import { RGBShiftShader } from 'three/examples/jsm/shaders/RGBShiftShader.js';
import gsap from 'gsap';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import './menuAnimation.js';
import './router-init.js';

function select(selector) {
  return document.querySelector(selector);
}

let canPlaySounds = false;

// Story video functionality
const loadingScreen2 = document.querySelector('#loading-screen2');
const loadingScreen3 = document.querySelector('#loading-screen3');
const loadingScreen4 = document.querySelector('#loading-screen4');
const storyVideo = loadingScreen4.querySelector('video');
const skipButton = loadingScreen4.querySelector('button');
const playerNameInput = document.querySelector('#player-name');
const submitBtn = document.querySelector('.submit-btn');
const backBtn = document.querySelector('.back-btn');


function handleNameSubmission() {
  const nameInput = select('#player-name');
  const submitBtn = select('.submit-btn');
  const playerNameDisplay = select('#player-name-display');

  submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const playerName = nameInput.value.trim();

    if (playerName) {
      canPlaySounds = true;
      playerNameDisplay.textContent = playerName;

      // Start playing bgm here with loop
      // if (bgmSound) {
      //   SoundManager.playSound(bgmSound, 0.5, true);
      // }

      gsap.to('#loading-screen2', {
        opacity: 0,
        duration: 1,
        onComplete: () => {
          gsap.set('#loading-screen2', { display: 'none' });
          // Show and play video
          gsap.set('#loading-screen4', { display: 'flex' });
          storyVideo.muted = false;
          storyVideo.play();

          // When video ends naturally
          storyVideo.addEventListener('ended', () => {
            gsap.to('#loading-screen4', {
              opacity: 0,
              duration: 1,
              onComplete: () => {
                gsap.set('#loading-screen4', { display: 'none' });
                gsap.set('#loading-screen3', { display: 'flex' });
                gsap.to('#loading-screen3', {
                  opacity: 1,
                  duration: 1
                });
                gsap.to('.index', {
                  opacity: 1,
                  duration: 1
                });
              }
            });
          });
        }
      });
    } else {
      // Shake animation if name is empty
      gsap.to(nameInput, {
        x: [-10, 10, -10, 10, 0],
        duration: 0.4,
        ease: "power2.inOut"
      });
    }
  });

  // Also handle enter key press
  nameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      submitBtn.click();
    }
  });
}

backBtn.addEventListener('click', () => {
  gsap.to('#loading-screen', {
    display: 'flex',
    opacity: 1,
    duration: 1,
  });
});

submitBtn.removeEventListener('click', handleNameSubmit);
playerNameInput.removeEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    handleNameSubmit();
  }
});


// Keep the skip button functionality and handle video end
storyVideo.addEventListener('ended', () => {
  if (bgmSound) {
    SoundManager.playSound(bgmSound, 0.5, true);
  }

  if (select('.menu-right').style.opacity == 0) {
    gsap.to('.menu-right  ', {
      opacity: 1,
      duration: 1,
    });
  }
  gsap.to('#loading-screen4', {
    opacity: 0,
    duration: 1,
    onComplete: () => {
      gsap.set('#loading-screen4', { display: 'none' });
      gsap.set('#loading-screen3', { display: 'flex' });
      gsap.to('#loading-screen3', {
        opacity: 1,
        duration: 1
      });
      gsap.to('.index', {
        opacity: 1,
        duration: 1
      });
    }
  });
});

gsap.set('#overlay-menu', {
  display: 'none',
})

gsap.set('.menu-right', {
  display: 'none',
})

skipButton.addEventListener('click', () => {
  storyVideo.pause();

  gsap.set('#overlay-menu', {
    display: 'block',
  })

  gsap.set('.menu-right', {
    display: 'flex',
  })

  if (bgmSound) {
    SoundManager.playSound(bgmSound, 0.5, true);
  }


  if (select('.menu-right').style.opacity == 0) {
    gsap.to('.menu-right  ', {
      opacity: 1,
      duration: 1,
    });
  }

  gsap.to('#loading-screen4', {
    opacity: 0,
    duration: 1,
    onComplete: () => {
      gsap.set('#loading-screen4', { display: 'none' });
      gsap.set('#loading-screen3', { display: 'flex' });
      gsap.to('#loading-screen3', {
        opacity: 1,
        duration: 1
      });
      gsap.to('.index', {
        opacity: 1,
        duration: 1
      });
    }
  });
});

const loadingManager = new THREE.LoadingManager();
let isLoading = true;
let animationStarted = false;


// Add loading manager handlers
loadingManager.onProgress = function (url, itemsLoaded, itemsTotal) {
  const progress = (itemsLoaded / itemsTotal * 100).toFixed(0);
  document.getElementById('loading-progress').textContent = `${progress}%`;
  gsap.to('.progress-bar', {
    clipPath: `inset( 0 ${100 - progress}% 0 0)`,
  })
};
let loadComplete = false;
loadingManager.onLoad = function () {
  isLoading = false;
  gsap.to('.progress', {
    opacity: 0,
    duration: 1,
    onComplete: () => {
      loadComplete = true;

      // Show name input screen
      gsap.set('#loading-screen2', { display: 'flex' });
      gsap.to('#loading-screen2', {
        opacity: 1,
        duration: 1
      });
      // Initialize name submission handling
      handleNameSubmission();
    }
  });

  gsap.to('#loading-screen1', {
    opacity: 0,
    duration: 1,
    onComplete: () => {
      gsap.set('#loading-screen1', {
        display: 'none',
      })
    }
  })

  let enterbtn = select('.enter');
  enterbtn.addEventListener('click', () => {
    // Start the game immediately
    if (!animationStarted) {
      animationStarted = true;
      startTime = Date.now();
      animate();
    }

    // Fade out the loading screen
    gsap.to('#loading-screen', {
      opacity: 0,
      duration: 1,
      onComplete: () => {
        document.getElementById('loading-screen').style.display = 'none';
      }
    });
  });
};

let w = window.innerWidth;
let h = window.innerHeight;
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x000000, 0.15);
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.z = 5;
scene.add(camera);
const renderer = new THREE.WebGLRenderer({
  powerPreference: "high-performance",
  antialias: false,
  alpha: false,
  stencil: false,
  depth: true,
  failIfMajorPerformanceCaveat: true,
  precision: "highp"
});
renderer.setSize(w, h);

// Force context creation with dedicated GPU hints
const gl = renderer.getContext();
const ext = gl.getExtension('WEBGL_lose_context');
if (ext) {
  ext.loseContext();
  setTimeout(() => ext.restoreContext(), 1000);
}

// Set explicit pixel ratio
renderer.setPixelRatio(1); // Force 1:1 pixel ratio for better performance
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMappingExposure = .5;
document.body.appendChild(renderer.domElement);

// post-processing
const renderScene = new RenderPass(scene, camera);
const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(w / 2, h / 2),
  0.5,
  0.2,
  0.5
);
bloomPass.threshold = 0.2;
bloomPass.strength = 0.4;
bloomPass.radius = 1;
const composer = new EffectComposer(renderer);
composer.setSize(w, h);
composer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
composer.addPass(renderScene);
composer.addPass(bloomPass);

// Film grain and scanline effect
const filmPass = new FilmPass(
  0.2,
  0.015,
  448,
  false
);
composer.addPass(filmPass);

// Color correction for more vibrant game-like colors
const colorCorrectionPass = new ShaderPass(ColorCorrectionShader);
colorCorrectionPass.uniforms['powRGB'].value = new THREE.Vector3(1.1, 1.1, 1.2);
colorCorrectionPass.uniforms['mulRGB'].value = new THREE.Vector3(1.2, 1.2, 1.2);
composer.addPass(colorCorrectionPass);

// RGB Shift effect for subtle chromatic aberration
const rgbShiftPass = new ShaderPass(RGBShiftShader);
rgbShiftPass.uniforms['amount'].value = 0.0015;
composer.addPass(rgbShiftPass);

// Glitch effect that triggers when hitting targets
const glitchPass = new GlitchPass();
glitchPass.enabled = false; // Only enable temporarily when hitting targets
composer.addPass(glitchPass);

const textureLoader = new THREE.TextureLoader(loadingManager);


const tubeColor = 0x00ccff;

// Ambient light for base illumination
let ambientLight = new THREE.AmbientLight(0xffffff, .5);
scene.add(ambientLight);

// Create a default spline if none is provided
const defaultSpline = new THREE.CatmullRomCurve3([
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(0, 5, -5),
  new THREE.Vector3(5, 0, -10),
  new THREE.Vector3(0, -5, -15),
  new THREE.Vector3(-5, 0, -20),
  new THREE.Vector3(0, 5, -25),
  new THREE.Vector3(0, 0, -30),
]);

// Use the imported spline or fallback to default
const pathSpline = spline || defaultSpline;
pathSpline.closed = true; // Make sure the spline is closed

// Load all textures with proper settings
const baseColor = textureLoader.load('/images/Lava002_1K-JPG_Color.webp', function (texture) {
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(8, 1); // Adjust these values to control texture tiling
});

const normalMap = textureLoader.load('/images/Lava002_1K-JPG_NormalGL.webp', function (texture) {
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(8, 1);
});

const roughnessMap = textureLoader.load('/images/Lava002_1K-JPG_Roughness.webp', function (texture) {
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(8, 1);
});

const displacementMap = textureLoader.load('/images/Lava002_1K-JPG_Displacement.webp', function (texture) {
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(8, 1);
});

const emissiveMap = textureLoader.load('/images/Lava002_1K-JPG_Emission.webp', function (texture) {
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(8, 1);
});

const tubeGeo = new THREE.TubeGeometry(pathSpline, 50, 2, 16, true);


const tunnelMaterial = new THREE.MeshStandardMaterial({
  side: THREE.DoubleSide,
  metalness: 0.2,
  roughness: .7,
  wireframe: false,
  map: baseColor,
  normalMap: normalMap,
  roughnessMap: roughnessMap,
  normalScale: new THREE.Vector2(2, 2),
  normalMapType: THREE.UVMapping,
  displacementMap: displacementMap,
  displacementScale: .5,
  emissive: new THREE.Color(0xff4400),
  emissiveMap: emissiveMap,
  emissiveIntensity: 1,
  envMapIntensity: 1.
})

const tunnel = new THREE.Mesh(tubeGeo, tunnelMaterial);

scene.add(tunnel);

const hitMat = new THREE.MeshBasicMaterial({
  color: tubeColor,
  transparent: true,
  opacity: 0.0,
  side: THREE.BackSide
});
const tubeHitArea = new THREE.Mesh(tubeGeo, hitMat);
scene.add(tubeHitArea);

const boxGroup = new THREE.Group();
scene.add(boxGroup);

const size = 0.075;

const boxGeo = new THREE.BoxGeometry(size, size, size);

const loader = new GLTFLoader(loadingManager);
const dracoLoader = new DRACOLoader();

dracoLoader.setDecoderPath('/draco/');
// Optional: set decoder settings
dracoLoader.setDecoderConfig({ type: 'js' });

loader.setDRACOLoader(dracoLoader);
let targetModel; // This will store our loaded model

// Load the model
loader.load(
  '/skulls final.glb', // Make sure this model exists in your public folder
  function (gltf) {
    targetModel = gltf.scene;
    targetModel.scale.set(0.01, 0.01, 0.01); // Adjust scale as needed

    // Create instances of the model instead of boxes
    for (let i = 0; i < numBoxes; i += 1) {
      const p = (i / numBoxes + Math.random() * 0.1) % 1;
      const pos = tubeGeo.parameters.path.getPointAt(p);

      const modelInstance = targetModel.clone();
      modelInstance.name = 'target';

      // Position the model
      pos.x += Math.random() - 0.4;
      pos.z += Math.random() - 0.4;
      modelInstance.position.copy(pos);

      // Random rotation
      const rote = new THREE.Vector3(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      modelInstance.rotation.set(rote.x, rote.y, rote.z);

      // Add to group
      boxGroup.add(modelInstance);

      // Add emissive material to make it glow
      modelInstance.traverse((child) => {
        if (child.isMesh) {
          child.material = new THREE.MeshStandardMaterial({
            wireframe: true,
            emissive: "#ffffff",
            color: "#ffffff",
            emissiveIntensity: 1.5,
          });
        }
      });
    }
  },
  undefined,
  function (error) {
    console.error('An error occurred loading the model:', error);
  }
);

// CROSSHAIRS
let mousePos = new THREE.Vector2();
const crosshairs = new THREE.Group();
crosshairs.position.z = -1;
camera.add(crosshairs);
const crossMat = new THREE.LineBasicMaterial({
  color: 0xffffff,
});
const lineGeo = new THREE.BufferGeometry();
const lineVerts = [0, 0.05, 0, 0, 0.02, 0];
lineGeo.setAttribute("position", new THREE.Float32BufferAttribute(lineVerts, 3));

for (let i = 0; i < 4; i += 1) {
  const line = new THREE.Line(lineGeo, crossMat);
  line.rotation.z = i * 0.5 * Math.PI;
  crosshairs.add(line);
}

const raycaster = new THREE.Raycaster();
const direction = new THREE.Vector3();
const impactPos = new THREE.Vector3();
const impactColor = new THREE.Color();
let impactBox = null;

let lasers = [];
const laserGeo = new THREE.IcosahedronGeometry(0.05, 2);

const audioLoader = new THREE.AudioLoader(loadingManager);
const listener = new THREE.AudioListener();

// Add after camera creation
camera.add(listener);

// Load sound effects
let laserSound, explosionSound, comboSound, comboSound2, resultSound;
let comboCount = 0;
let lastDestroyTime = 0;
const comboTimeout = 2000; // 2 seconds window for combo
let skullCount = 0;
let DivineCount = 0;
let HellCount = 0;
let buttonHoverSound, buttonHoverSound2;
let bgmSound;
let victorySound;

// Load the combo sound
audioLoader.load('/audio/Divine.mp3', function (buffer) {
  comboSound = buffer;
});
audioLoader.load('/audio/hell.mp3', function (buffer) {
  comboSound2 = buffer;
});

audioLoader.load('/audio/laser.mp3', function (buffer) {
  laserSound = buffer;
});
audioLoader.load('/audio/bomb2.mp3', function (buffer) {
  explosionSound = buffer;
});

audioLoader.load('/audio/hov1.mp3', function (buffer) {
  buttonHoverSound = buffer;
});

audioLoader.load('/audio/hov2.mp3', function (buffer) {
  buttonHoverSound2 = buffer;
});

audioLoader.load('/audio/bgm.mp3', function (buffer) {
  bgmSound = buffer;
});

audioLoader.load('/audio/storyNarration.mp3', function (buffer) {
  resultSound = buffer;
});

audioLoader.load('/audio/winner.mp3', function (buffer) {
  victorySound = buffer;
});




function animateText(elem) {
  // Initial animation - slide in and fade in
  gsap.fromTo(elem,
    {
      opacity: 0,
      scale: 0.5
    },
    {
      opacity: 1,
      scale: 1,
      duration: 0.5,
      ease: "power2.out",
      onComplete: () => {

        gsap.to(elem, {
          delay: 0.5,
          opacity: 0,
          scale: 1.2,
          duration: 0.5,
          ease: "power2.in"
        });
      }
    }
  );
}


function getLaserBolt() {
  const laserMat = new THREE.MeshBasicMaterial({
    color: 0xFFCC00,
    transparent: true,
    fog: false
  });
  var laserBolt = new THREE.Mesh(laserGeo, laserMat);
  laserBolt.position.copy(camera.position);

  let active = true;
  let speed = 0.5;

  let goalPos = camera.position.clone()
    .setFromMatrixPosition(crosshairs.matrixWorld);

  const laserDirection = new THREE.Vector3(0, 0, 0);
  laserDirection.subVectors(laserBolt.position, goalPos)
    .normalize()
    .multiplyScalar(speed);

  direction.subVectors(goalPos, camera.position);
  raycaster.set(camera.position, direction);
  let intersects = raycaster.intersectObjects([...boxGroup.children, tubeHitArea], true);

  if (intersects.length > 0) {
    impactPos.copy(intersects[0].point);

    // Find the root parent (the actual target model)
    let targetObject = intersects[0].object;
    while (targetObject.parent && targetObject.parent !== boxGroup) {
      targetObject = targetObject.parent;
    }

    if (targetObject.name === 'target') {
      impactColor.copy(intersects[0].object.material.color);
      boxGroup.remove(targetObject);
      skullCount++;
      select('.skulls-number h3').textContent = skullCount;

      // Check for win condition
      if (skullCount >= numBoxes) {
        showWinnerScreen();
      }

      if (skullCount % 20 === 0) {
        // Play combo sound with increased volume only if enabled
        if (canPlaySounds) {
          const comboSoundInstance = new THREE.Audio(listener);
          comboSoundInstance.setBuffer(comboSound2);
          comboSoundInstance.setVolume(2.0);
          comboSoundInstance.play();
        }

        animateText('.hell-crusher h1');
        HellCount++;
        console.log(HellCount)
        select('.hell-number h3').textContent = HellCount;
      }
      // Handle combo system
      const currentTime = Date.now();
      if (currentTime - lastDestroyTime < comboTimeout) {
        comboCount++;
        if (comboCount >= 5) {
          // Play combo sound only if enabled
          if (canPlaySounds) {
            const comboSoundInstance = new THREE.Audio(listener);
            comboSoundInstance.setBuffer(comboSound);
            comboSoundInstance.setVolume(2.0);
            comboSoundInstance.play();
          }

          // Animate the divine text
          animateText('.divine h1');

          comboCount = 0;
          DivineCount++;
          select('.divine-number h3').textContent = DivineCount;

        }


      } else {
        comboCount = 1; // Reset combo if too much time has passed
      }
      lastDestroyTime = currentTime;

      // Play regular explosion sound
      const sound = new THREE.Audio(listener);
      sound.setBuffer(explosionSound);
      sound.setVolume(0.7);
      sound.play();

      // Trigger brief glitch effect
      glitchPass.enabled = true;
      setTimeout(() => {
        glitchPass.enabled = false;
      }, 200); // Disable after 200ms
    }
  }

  let scale = 1.0;
  let opacity = 1.0;
  let isExploding = false;

  function update() {
    if (active === true) {
      if (isExploding === false) {
        laserBolt.position.sub(laserDirection);

        if (laserBolt.position.distanceTo(impactPos) < 0.5) {
          laserBolt.position.copy(impactPos);
          laserBolt.material.color.set(impactColor);
          isExploding = true;
          impactBox?.scale.setScalar(0.0);
        }
      } else {
        if (opacity > 0.01) {
          scale += 0.2;
          opacity *= 0.85;

        } else {
          opacity = 0.0;
          scale = 0.01;
          active = false;
        }
        laserBolt.scale.setScalar(scale);
        laserBolt.material.opacity = opacity;
        laserBolt.userData.active = active;
      }
    }
  }
  laserBolt.userData = { update, active };
  return laserBolt;
}

function updateCamera(t) {
  const time = t * 0.1;
  const looptime = 10 * 1000;
  const p = (time % looptime) / looptime;
  const pos = tubeGeo.parameters.path.getPointAt(p);
  const lookAt = tubeGeo.parameters.path.getPointAt((p + 0.03) % 1);
  camera.position.copy(pos);
  camera.lookAt(lookAt);
}

const mediaPipeHands = new MediaPipeHands();
const handControls = new HandControls(mediaPipeHands);

let lastFireTime = 0;
const fireDelay = 250;

const stats = new Stats();
stats.showPanel(0);
// document.body.appendChild(stats.dom);

stats.dom.style.cssText = 'position:fixed;top:0;right:0;cursor:pointer;opacity:0.9;z-index:10000;';

let resolutionScale = 1;

function adjustPerformance() {
  const fps = stats.fps;
  if (fps < 30 && resolutionScale > 0.5) {
    resolutionScale -= 0.1;
    const newWidth = w * resolutionScale;
    const newHeight = h * resolutionScale;
    renderer.setSize(newWidth, newHeight, false);
    composer.setSize(newWidth, newHeight);
  }
}

let startTime = null;
let elapsedTimeDisplay = document.querySelector('.elapsed-time h2');

function formatTime(milliseconds) {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Add performance monitoring and dynamic quality adjustment
let lastFpsCheck = Date.now();
let fpsHistory = [];
const targetFPS = 30;

function adjustQuality() {
  const currentTime = Date.now();
  if (currentTime - lastFpsCheck > 1000) { // Check every second
    const fps = stats.fps;
    fpsHistory.push(fps);

    if (fpsHistory.length > 3) { // Check last 3 seconds
      const avgFps = fpsHistory.reduce((a, b) => a + b) / fpsHistory.length;

      if (avgFps < targetFPS) {
        // Reduce quality
        if (resolutionScale > 0.5) {
          resolutionScale -= 0.1;
          const newWidth = w * resolutionScale;
          const newHeight = h * resolutionScale;
          renderer.setSize(newWidth, newHeight, false);
          composer.setSize(newWidth, newHeight);
        }

        // Disable some effects if needed
        if (avgFps < 20) {
          filmPass.enabled = false;
          bloomPass.enabled = false;
        }
      }

      fpsHistory = [];
    }

    lastFpsCheck = currentTime;
  }
}

// Optimize renderer settings
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

// Reduce number of skulls and optimize their updates
const numBoxes = 100; // Reduced from 100

// Add frustum culling for skulls
const frustum = new THREE.Frustum();
const cameraViewProjectionMatrix = new THREE.Matrix4();

function updateVisibleSkulls() {
  cameraViewProjectionMatrix.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
  frustum.setFromProjectionMatrix(cameraViewProjectionMatrix);

  boxGroup.children.forEach(skull => {
    skull.visible = frustum.containsPoint(skull.position);
  });
}

// Add to animate function before render
updateVisibleSkulls();

function animate(t = 0) {
  stats.begin();
  requestAnimationFrame(animate);

  if (!isLoading && animationStarted) {
    // Update elapsed time
    if (startTime) {
      const currentTime = Date.now();
      const elapsedTime = currentTime - startTime;
      elapsedTimeDisplay.textContent = formatTime(elapsedTime);
    }

    adjustQuality(); // Add quality adjustment

    if (mediaPipeHands.isInitialized) {
      mediaPipeHands.update();

      if (handControls.isHandVisible()) {
        const handPos = handControls.getHandPosition();
        mousePos.x = -(handPos.x - 0.5) * 3;
        mousePos.y = -(handPos.y - 0.5) * 3;

        if (handControls.isHandClosed()) {
          const currentTime = Date.now();
          if (currentTime - lastFireTime > fireDelay) {
            fireLaser();
            lastFireTime = currentTime;
          }
        }
      }
    }

    updateCamera(t);
    crosshairs.position.set(mousePos.x, mousePos.y, -1);

    // Only update visible lasers
    const visibleLasers = lasers.filter(l => {
      const distance = camera.position.distanceTo(l.position);
      return distance < 50; // Only update nearby lasers
    });
    visibleLasers.forEach(l => l.userData.update());

    composer.render(scene, camera);
  }

  stats.end();
}

mediaPipeHands.initialize()
  .then(() => {
    if (mediaPipeHands.isInitialized) {
      console.log('MediaPipe initialized successfully');
      // Don't start animation here anymore
    } else {
      console.warn('MediaPipe failed to initialize, continuing without hand tracking');
    }
  })
  .catch(error => {
    console.error('Error initializing MediaPipe:', error);
  });

function fireLaser() {
  const laser = getLaserBolt();
  lasers.push(laser);
  scene.add(laser);

  // Play laser sound only if enabled
  if (canPlaySounds) {
    const sound = new THREE.Audio(listener);
    sound.setBuffer(laserSound);
    sound.setVolume(0.5);
    sound.play();
  }

  // cleanup
  let inactiveLasers = lasers.filter((l) => l.userData.active === false);
  scene.remove(...inactiveLasers);
  lasers = lasers.filter((l) => l.userData.active === true);
}

function handleWindowResize() {
  // Update window dimensions
  w = window.innerWidth;
  h = window.innerHeight;

  // Update camera
  camera.aspect = w / h;
  camera.updateProjectionMatrix();

  // Update renderer and composer
  renderer.setSize(w, h);
  composer.setSize(w, h);

  // Update pixel ratio
  const pixelRatio = Math.min(window.devicePixelRatio, 2);
  renderer.setPixelRatio(pixelRatio);
  composer.setPixelRatio(pixelRatio);

}

// Add resize event listener
window.addEventListener('resize', handleWindowResize, false);

// Initial resize call to ensure everything is set up correctly
handleWindowResize();

// Add this after your other initialization code
let currentHoverSound = null;

// Add near the top with other state variables
let isSoundEnabled = true;
let currentSounds = new Set();

// Create a sound manager
const SoundManager = {
  init() {
    this.soundToggle = select('.sound-wave');
    this.soundToggle.classList.add('playing');
    this.setupEventListeners();
  },

  setupEventListeners() {
    this.soundToggle.addEventListener('click', () => this.toggleSound());
  },

  toggleSound() {
    isSoundEnabled = !isSoundEnabled;
    this.soundToggle.classList.toggle('playing', isSoundEnabled);
    canPlaySounds = isSoundEnabled;

    // Mute/unmute all active sounds
    currentSounds.forEach(sound => {
      if (sound && sound.isPlaying) {
        sound.setVolume(isSoundEnabled ? sound._originalVolume || 1 : 0);
      }
    });
  },

  playSound(audio, volume = 1, loop = false) {
    if (!isSoundEnabled || !canPlaySounds || !audio) return null;

    const sound = new THREE.Audio(listener);
    sound.setBuffer(audio);
    sound._originalVolume = volume; // Store original volume
    sound.setVolume(volume);
    sound.setLoop(loop);
    sound.play();

    currentSounds.add(sound);

    // Clean up when sound finishes
    sound.onEnded = () => {
      currentSounds.delete(sound);
    };

    return sound;
  },

  stopAllSounds() {
    currentSounds.forEach(sound => {
      if (sound && sound.isPlaying) {
        sound.stop();
      }
    });
    currentSounds.clear();
  }
};

// Replace the existing sound toggle code with initialization
SoundManager.init();

// Update the playHoverSound function to use SoundManager
function playHoverSound(audio, volume = 1) {
  if (currentHoverSound && currentHoverSound.isPlaying) {
    return;
  }
  currentHoverSound = SoundManager.playSound(audio, volume);
  return currentHoverSound;
}

select('button.enter').addEventListener('mouseenter', () => playHoverSound(buttonHoverSound, 1));
select('button.controls').addEventListener('mouseenter', () => playHoverSound(buttonHoverSound2, 0.8));
select('button.rules').addEventListener('mouseenter', () => playHoverSound(resultSound, 0.8));
select('button.submit-btn').addEventListener('click', () => playHoverSound(laserSound, 0.8));

composer.render(scene, camera);

function validateAndStyleInput() {
  const nameInput = select('#player-name');

  nameInput.addEventListener('input', (e) => {
    const value = e.target.value.trim();

    if (value.length > 20) {
      nameInput.value = value.slice(0, 20);
    }

    const submitBtn = select('.submit-btn');
    submitBtn.style.opacity = value.length > 0 ? '1' : '0.5';
    submitBtn.style.cursor = value.length > 0 ? 'pointer' : 'not-allowed';
  });
}

// Call this after DOM content is loaded
document.addEventListener('DOMContentLoaded', validateAndStyleInput);

// Add this function to check if a position is inside the tunnel
function isInsideTunnel(position, tunnelRadius = 1.2) { // Increased from 0.4 to 1.2
  const distanceFromCenter = Math.sqrt(position.x * position.x + position.y * position.y);
  return distanceFromCenter <= tunnelRadius;
}

// Add near the top with other configuration variables
const skullSpreadConfig = {
  radiusSpread: 2.0,  // Controls spread in x,y directions
  zSpread: 30.0       // Controls spread in z direction
};

// Modify the skull placement loop
for (let i = 0; i < numBoxes; i++) {
  const box = new THREE.Group();

  // Load skull model for each box
  loader.load('/skulls.glb', (gltf) => {
    const model = gltf.scene;
    model.scale.set(0.03, 0.03, 0.03);
    box.add(model);
  });

  // Generate random position within tunnel bounds
  let validPosition = false;
  let position = new THREE.Vector3();

  while (!validPosition) {
    position.set(
      (Math.random() - 0.5) * skullSpreadConfig.radiusSpread, // Use spread config for x
      (Math.random() - 0.5) * skullSpreadConfig.radiusSpread, // Use spread config for y
      (Math.random() - 0.5) * skullSpreadConfig.zSpread       // Use spread config for z
    );

    if (isInsideTunnel(position)) {
      validPosition = true;
    }
  }

  box.position.copy(position);
  box.name = 'target';
  boxGroup.add(box);
}

scene.add(boxGroup);

// Add this function to show the winner screen
function showWinnerScreen() {
  const winnerScreen = select('.winner');
  const playerName = select('#player-name-display').textContent;
  const finalTime = select('.elapsed-time h2').textContent;

  select('.winner h2 span').textContent = playerName;
  select('.winner h3 span').textContent = finalTime;

  // Play victory sound
  setTimeout(() => {
    if (canPlaySounds && victorySound) {
      const sound = new THREE.Audio(listener);
      sound.setBuffer(victorySound);
      sound.setVolume(1);
      sound.play();
    }
  }, 3000);


  gsap.set(winnerScreen, {
    display: 'flex',
    opacity: 0
  });

  gsap.to(winnerScreen, {
    opacity: 1,
    duration: 1
  });

  gsap.to('.winner h2, .winner h3', {
    opacity: 1,
    duration: 1,
    delay: 0.5,
    stagger: 0.2
  });
}



function handleNameSubmit() {
  if (playerNameInput.value.trim() !== '') {
    loadingScreen2.style.display = 'none';
    loadingScreen4.style.display = 'flex';
    storyVideo.play();

    // When video ends naturally
    storyVideo.addEventListener('ended', () => {
      loadingScreen4.style.display = 'none';
      loadingScreen3.style.display = 'flex';
      // Play sounds here
    });
  }
}

// Skip button functionality
skipButton.addEventListener('click', () => {
  storyVideo.pause();
  loadingScreen4.style.display = 'none';
  loadingScreen3.style.display = 'flex';
  // Play sounds here
});

// Handle form submission
submitBtn.addEventListener('click', handleNameSubmit);
playerNameInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    handleNameSubmit();
  }
});


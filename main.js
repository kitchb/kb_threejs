import * as THREE from 'three';
import { gsap } from 'gsap';

// Create a scene
const scene = new THREE.Scene();

// Set background color
scene.background = new THREE.Color(0x66cccc); // Pastel teal

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 10;

// Create a renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create lights
const ambientLight = new THREE.AmbientLight(0x404040, 2);
const directionalLight = new THREE.DirectionalLight(0xffffff, 2.5);
directionalLight.position.set(10, 10, 10).normalize();
const spotLight = new THREE.SpotLight(0xffffff, 2.5);
spotLight.position.set(0, -10, 10);
spotLight.angle = Math.PI / 6;
spotLight.penumbra = 0.2;
spotLight.decay = 2;
spotLight.distance = 100;

scene.add(ambientLight, directionalLight, spotLight);

// HOME PAGE - 3d house
// Create house model
const houseGroup = new THREE.Group();
scene.add(houseGroup);

// Base of the house
const baseGeometry = new THREE.BoxGeometry(4, 4, 4);
const baseMaterial = new THREE.MeshStandardMaterial({
  color: 0xff69b4, // Hot pink color
  metalness: 0.5,
  roughness: 0.5
});
const base = new THREE.Mesh(baseGeometry, baseMaterial);
houseGroup.add(base);

// Roof of the house
const roofGeometry = new THREE.ConeGeometry(3, 2, 4);
const roofMaterial = new THREE.MeshStandardMaterial({
  color: 0x4f4f4f, 
  metalness: 0.7,
  roughness: 0.3
});
const roof = new THREE.Mesh(roofGeometry, roofMaterial);
roof.position.y = 3;
roof.rotation.y = Math.PI / 4;
houseGroup.add(roof);

// Door of the house
const doorGeometry = new THREE.BoxGeometry(1, 2, 0.1);
const doorMaterial = new THREE.MeshStandardMaterial({
  color: 0xffffff, 
  emissive: 0x0000ff, 
  emissiveIntensity: 0.5
});
const door = new THREE.Mesh(doorGeometry, doorMaterial);
door.position.set(0, -0.5, 2.05);
houseGroup.add(door);

// Windows of the house
const windowGeometry = new THREE.BoxGeometry(1, 1, 0.1);
const windowMaterial = new THREE.MeshStandardMaterial({
  color: 0xFFFF00, // Neon yellow
  metalness: 1,
  roughness: 0.5
});
const window1 = new THREE.Mesh(windowGeometry, windowMaterial);
const window2 = window1.clone();
window1.position.set(-1.5, 0.5, 2.05);
window2.position.set(1.5, 0.5, 2.05);
houseGroup.add(window1, window2);

// ABOUT ME - 3D Robot
// Create robot head model
const headGroup = new THREE.Group();
scene.add(headGroup);
headGroup.visible = false;

// Robot head
const headGeometry = new THREE.BoxGeometry(4, 4, 4);
const headMaterial = new THREE.MeshStandardMaterial({
  color: 0x4f4f4f, 
  metalness: 0.7,
  roughness: 0.3
});
const head = new THREE.Mesh(headGeometry, headMaterial);
headGroup.add(head);

// Eyes
const eyeGeometry = new THREE.SphereGeometry(0.5, 32, 32);
const eyeMaterial = new THREE.MeshStandardMaterial({
  color: 0xffffff, 
  emissive: 0x0000ff, 
  emissiveIntensity: 0.5
});
const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
leftEye.position.set(-1, 1, 2);
rightEye.position.set(1, 1, 2);

// Add eyes to the head
head.add(leftEye);
head.add(rightEye);

// Antennae
const antennaGeometry = new THREE.CylinderGeometry(0.1, 0.1, 2, 32);
const antennaMaterial = new THREE.MeshStandardMaterial({
  color: 0x8b8b8b, // Gray
});
const antenna1 = new THREE.Mesh(antennaGeometry, antennaMaterial);
const antenna2 = new THREE.Mesh(antennaGeometry, antennaMaterial);
antenna1.position.set(-1.5, 2.5, 0);
antenna2.position.set(1.5, 2.5, 0);
antenna1.rotation.z = Math.PI / 4;
antenna2.rotation.z = -Math.PI / 4;

// Add antennae to the head
head.add(antenna1);
head.add(antenna2);

// Create phone model
const phoneGroup = new THREE.Group();
scene.add(phoneGroup);
phoneGroup.visible = false;

// CONTACT - 3D PHONE
// Phone body
const phoneGeometry = new THREE.BoxGeometry(2, 4, 0.3);
const phoneMaterial = new THREE.MeshStandardMaterial({
  color: 0xFFFFFF, 
  metalness: 0.8,
  roughness: 0.2
});
const phone = new THREE.Mesh(phoneGeometry, phoneMaterial);
phoneGroup.add(phone);

// Phone screen
const screenGeometry = new THREE.BoxGeometry(1.8, 3.5, 0.1);
const screenMaterial = new THREE.MeshStandardMaterial({
  color: 0x000000, 
  metalness: 0.5,
  roughness: 0.5
});
const screen = new THREE.Mesh(screenGeometry, screenMaterial);
screen.position.z = 0.15;
phoneGroup.add(screen);

// Phone home button
const buttonGeometry = new THREE.CylinderGeometry(0.13, 0.13, 0.05, 32);
const buttonMaterial = new THREE.MeshStandardMaterial({
  color: 0x888888, 
  metalness: 0.7,
  roughness: 0.3
});
const button = new THREE.Mesh(buttonGeometry, buttonMaterial);
button.position.set(0, -1.85, 0.16); 
button.rotation.x = Math.PI / 2;
phoneGroup.add(button);

// NAVGATION
document.getElementById('homeBtn').addEventListener('click', () => {
  houseGroup.visible = true;
  headGroup.visible = false;
  phoneGroup.visible = false;
  document.getElementById('homeBtn').classList.add('active');
  document.getElementById('aboutMeBtn').classList.remove('active');
  document.getElementById('contactBtn').classList.remove('active');
  document.getElementById('homeDesc').style.display = 'block';
  document.getElementById('aboutDesc').style.display = 'none';
  document.getElementById('contactDesc').style.display = 'none';
});

document.getElementById('aboutMeBtn').addEventListener('click', () => {
  houseGroup.visible = false;
  headGroup.visible = true;
  phoneGroup.visible = false;
  document.getElementById('homeBtn').classList.remove('active');
  document.getElementById('aboutMeBtn').classList.add('active');
  document.getElementById('contactBtn').classList.remove('active');
  document.getElementById('homeDesc').style.display = 'block';
  document.getElementById('aboutDesc').style.display = 'block';
  document.getElementById('contactDesc').style.display = 'none';
});

document.getElementById('contactBtn').addEventListener('click', () => {
  houseGroup.visible = false;
  headGroup.visible = false;
  phoneGroup.visible = true;
  document.getElementById('homeBtn').classList.remove('active');
  document.getElementById('aboutMeBtn').classList.remove('active');
  document.getElementById('contactBtn').classList.add('active');
  document.getElementById('homeDesc').style.display = 'block';
  document.getElementById('aboutDesc').style.display = 'none';
  document.getElementById('contactDesc').style.display = 'block';
});

// Variables for mouse control
let mouseX = 0;
let mouseY = 0;
const rotationSpeed = 0.01; // Slower rotation speed

// Handle mouse movement
document.addEventListener('mousemove', (event) => {
  mouseX = (event.clientX / window.innerWidth) * 2 - 1;
  mouseY = - (event.clientY / window.innerHeight) * 2 + 1;
});

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  // Rotation for the house
  if (houseGroup.visible) {
    houseGroup.rotation.y += mouseX * rotationSpeed;
    houseGroup.rotation.x -= mouseY * rotationSpeed;
    // Continuous rotation
    houseGroup.rotation.y += rotationSpeed * 0.2; // Slower spin
  }

  // Rotation for the robot head
  if (headGroup.visible) {
    headGroup.rotation.y += mouseX * rotationSpeed;
    headGroup.rotation.x -= mouseY * rotationSpeed;
    // Continuous rotation
    headGroup.rotation.y += rotationSpeed * 0.2; // Slower spin
  }

  // Rotation for the phone
  if (phoneGroup.visible) {
    phoneGroup.rotation.y += mouseX * rotationSpeed;
    phoneGroup.rotation.x -= mouseY * rotationSpeed;
    // Continuous rotation
    phoneGroup.rotation.y += rotationSpeed * 0.2; // Slower spin
  }

  renderer.render(scene, camera);
}
animate();

// Handle window resizing
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

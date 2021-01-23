export default function loadTexture(img) {
  let textureloader = new THREE.TextureLoader();
  let texture = textureloader.load(img);
  return texture;
}

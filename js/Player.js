import loadTexture from "./loadTexture.js";
export class Player {
  constructor(img) {
    let texture = loadTexture(img);
    // スプライト
    let material = new THREE.PointsMaterial({
      map: texture,
    });
    let geom = new THREE.BoxGeometry();
    // 主人公オブジェクト
    let cube = new THREE.Points(geom, material);
    return cube;
  }
}

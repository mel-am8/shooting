import loadTexture from "./loadTexture.js";
export default class Enemy {
  obj = 0;

  constructor(img) {
    let texture = loadTexture(img);
    // スプライト
    let material = new THREE.PointsMaterial({
      map: texture,
    });
    let geom = new THREE.BoxGeometry();
    // 主人公オブジェクト
    let cube = new THREE.Points(geom, material);

    // 最初に出現する位置を指定
    cube.position.y = -1;
    cube.position.x = Math.floor(Math.random() * 6 - 3);

    this.obj = cube;
  }

  getObj() {
    console.log(this.obj);
    return this.obj;
  }
}

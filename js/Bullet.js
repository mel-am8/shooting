import loadTexture from "./loadTexture.js";
export default class Bullet {
  obj = 0;
  position_x = 0;
  position_y = 0;
  shoot_flag = false;

  constructor(img, x, y) {
    let texture = loadTexture(img);
    // スプライト
    let material = new THREE.PointsMaterial({
      map: texture,
    });
    let geom = new THREE.BoxGeometry();
    // 弾オブジェクト
    let cube = new THREE.Points(geom, material);

    //this.position_x = x;
    //this.position_y = y;

    //cube.position.x = this.position_x;
    //cube.position.y = this.position_y;

    this.obj = cube;
    this.obj.position.x = x;
    this.obj.position.y = y;
  }

  getObj() {
    return this.obj;
  }

  shoot() {
    this.shoot_flag = true;
  }

  getPos() {
    console.log(this.position_x);
  }

  // 位置セット
  setPosition(x, y) {
    this.position_x = x;
    this.position = y;
  }
}

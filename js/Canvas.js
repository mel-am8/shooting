export default class Canvas {
  constructor() {
    this.mouse = new THREE.Vector2(0, 0);
    this.w = window.innerHeight;
    this.h = window.innerHeight;

    // レンダラー
    this.renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector("#myCanvas"),
    });
    this.renderer.setSize(this.w, this.h);
    this.renderer.setPixelRatio(window.devicePixelRatio);

    // カメラ
    this.camera = new THREE.PerspectiveCamera(60, this.w / this.h, 1, 10);
    this.camera.position.z = 3;

    // シーン
    this.scene = new THREE.Scene();

    // ライト
    this.light = new THREE.PointLight(0x00ffff);
    this.light.position.set(2, 2, 2);
    this.scene.add(this.light);

    // オブジェクト
    const geo = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshLambertMaterial({ color: 0xffffff });
    this.mesh = new THREE.Mesh(geo, material);
    this.scene.add(this.mesh);

    // ループ開始
    this.render();
  }

  mouseMoved(x, y, w, h, light) {
    this.mouse.x = x - w / 2;
    this.mouse.y = -y + h / 2;

    light.position.x = this.mouse.x;
    light.position.y = this.mouse.y;
  }

  render() {
    requestAnimationFrame(() => {
      this.render();
    });

    this.renderer.render(this.scene, this.camera);
  }
}

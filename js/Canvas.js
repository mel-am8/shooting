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
    const fov = 60;
    const fovRad = (fov / 2) * (Math.PI / 180);
    const dist = this.w / 2 / Math.tan(fovRad);
    this.camera = new THREE.PerspectiveCamera(
      fov,
      this.w / this.h,
      1,
      dist * 2
    );
    this.camera.position.set(0, 0, 10);

    // シーン
    this.scene = new THREE.Scene();

    // ライト
    this.light = new THREE.PointLight(0x00ffff);
    this.light.position.set(0, 0, 100);
    this.scene.add(this.light);

    // オブジェクト
    const geo = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshLambertMaterial({ color: 0xffffff });
    this.mesh = new THREE.Mesh(geo, material);
    this.scene.add(this.mesh);

    // ループ開始
    this.render();
  }

  mouseMoved(x, y) {
    this.mouse.x = x - this.w / 2;
    this.mouse.y = -y + this.h / 2;

    this.light.position.x = this.mouse.x;
    this.light.position.y = this.mouse.y;
    console.log(this.mouse.x, this.mouse.y);
  }

  render() {
    requestAnimationFrame(() => {
      this.render();
    });

    this.renderer.render(this.scene, this.camera);
  }
}

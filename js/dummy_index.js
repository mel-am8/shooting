window.addEventListener("DOMContentLoaded", init);

import Bullet from "./Bullet.js";
import Enemy from "./Enemy.js";
import { Player } from "./Player.js";

function init() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  let rot = 0;

  // レンダラー
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#myCanvas"),
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);

  // シーン
  const scene = new THREE.Scene();

  // カメラ
  let camera = new THREE.PerspectiveCamera(45, width / height);
  camera.position.set(100, 150, 500);
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  // 地面を作成
  const plane2 = new THREE.GridHelper(600);
  scene.add(plane2);

  // 直方体を作成
  const material = new THREE.MeshNormalMaterial();
  const geometry = new THREE.SphereGeometry(30, 30, 30);
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  const dummy_mesh = new THREE.Mesh(geometry, material);
  scene.add(dummy_mesh);

  tick();

  function tick() {
    rot += 0.5; // 毎フレーム角度を0.5度ずつ足していく
    // ラジアンに変換する
    const radian = (rot * Math.PI) / 180;
    // 角度に応じてカメラの位置を設定
    mesh.position.x = 200 * Math.sin(radian);
    mesh.position.y = 50;
    mesh.position.z = 200 * Math.cos(radian);

    // レンダリング
    renderer.render(scene, camera);

    // 球体のワールド座標を取得する
    const project = dummy_mesh.position.project(camera);
    const sx = (width / 2) * (+project.x + 1.0);
    const sy = (height / 2) * (-project.y + 1.0);

    const tf = document.getElementById("hud");
    // テキストフィールドにスクリーン座標を表示
    tf.innerHTML = `👆スクリーン座標(${Math.round(sx)}, ${Math.round(sy)})`;
    tf.style.transform = `translate(${sx}px, ${sy}px)`;

    // SVGでラインを描画
    const line = document.getElementById("svgLine");
    line.setAttribute("x2", sx);
    line.setAttribute("y2", sy);

    window.addEventListener("keydown", (e) => {
      e.preventDefault();
      switch (e.keyCode) {
        case 38: // up
          dummy_mesh.position.z -= 1;
          break;
        case 40: // down
          dummy_mesh.position.z += 1;
          break;
        case 37: // left
          dummy_mesh.position.x -= 1;
          break;
        case 39: // right
          dummy_mesh.position.x += 1;
          break;
      }
    });

    requestAnimationFrame(tick);
  }
}

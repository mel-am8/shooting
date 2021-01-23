window.addEventListener("DOMContentLoaded", init);

import Bullet from "./Bullet.js";
import Enemy from "./Enemy.js";
import { Player } from "./Player.js";

function init() {
  const width = 480;
  const height = 540;

  // レンダラー
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#myCanvas"),
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);

  // シーン
  const scene = new THREE.Scene();

  // カメラ
  const fov = 45;
  const fovRad = (fov / 2) * (Math.PI / 180);
  const dist = height / 2 / Math.tan(fovRad);
  const camera = new THREE.PerspectiveCamera(fov, width / height, 1, dist * 2);
  camera.position.set(0, 0, 10);

  // ライト
  const ambientLight = new THREE.AmbientLight(0xffffff);
  const directionalLight = new THREE.DirectionalLight(0xffffff);
  ambientLight.position.set(1, 1, 1);

  scene.add(ambientLight);

  // キーイベント
  const SPEED = 60.0;
  let moveUp = false;
  let moveDown = false;
  let moveRight = false;
  let moveLeft = false;
  let shootBullet = false; // 弾発射

  document.addEventListener(
    "keydown",
    function (e) {
      switch (e.keyCode) {
        case 87: // w
          moveUp = true;
          break;
        case 65: //a
          moveLeft = true;
          break;
        case 83: // s
          moveDown = true;
          break;
        case 68: //d
          moveRight = true;
          break;
        case 32: // space
          shootBullet = true;
      }
    },
    false
  );
  document.addEventListener(
    "keyup",
    function (e) {
      switch (e.keyCode) {
        case 87: // w
          moveUp = false;
          break;
        case 65: //a
          moveLeft = false;
          break;
        case 83: // s
          moveDown = false;
          break;
        case 68: //d
          moveRight = false;
          break;
        case 32: // space
          shootBullet = false;
      }
    },
    false
  );

  // プレイヤー
  const player = new Player("./img/plane_fighter_f35.gif");

  scene.add(player);
  // 敵オブジェクト
  const enemy = new Enemy("./img/space_alien.gif");
  scene.add(enemy.getObj());

  let step = 0;

  // 軸
  let axes = new THREE.AxisHelper(2);
  scene.add(axes);

  // 弾オブジェクト

  let wrap = new THREE.Object3D();

  function shoot(x, y) {
    let bullet = new Bullet("./img/space_alien.gif", x, y);
    wrap.add(bullet.getObj());
    scene.add(wrap);
  }

  tick();

  function tick() {
    requestAnimationFrame(tick);
    step += 40;

    if (shootBullet) {
      shoot(player.position.x, player.position.y);
      console.log(player.position.x, player.position.y);
    }

    // 追加した弾オブジェクトのpositionをそれぞれ更新
    wrap.children.forEach(function (value) {
      value.position.y += 0.01;
    });

    if (moveUp) {
      player.position.y += 0.02;
    }
    if (moveDown) {
      player.position.y -= 0.02;
    }
    if (moveLeft) {
      player.position.x -= 0.02;
    }
    if (moveRight) {
      player.position.x += 0.02;
    }
    renderer.render(scene, camera);
  }
}

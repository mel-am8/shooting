window.addEventListener("DOMContentLoaded", init);
import Canvas from "./Canvas.js";

function init() {
  const canvas = new Canvas();

  window.addEventListener("mousemove", (e) => {
    canvas.mouseMoved(e.offsetX, e.offsetY);
  });
}

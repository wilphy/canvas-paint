const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

autoSetCanvasSize(canvas);

listenToMouse(canvas);

function drawLine(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.strokeStyle = "black";
  ctx.lineWidth = 5;
  ctx.moveTo(x1, y1); //起点
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.closePath();
}

let eraserEnabled = false;
eraser.onclick = () => {
  eraserEnabled = true;
  actions.className = "actions x";
};

panit.onclick = () => {
  eraserEnabled = false;
  actions.className = "actions";
};

// 设置画布大小
function autoSetCanvasSize(canvas) {
  setCanvasSize();

  window.onresize = () => setCanvasSize();

  function setCanvasSize() {
    let pageWidth = document.documentElement.clientWidth;
    let pageHeight = document.documentElement.clientHeight;

    canvas.width = pageWidth;
    canvas.height = pageHeight;
  }
}

// 监听鼠标事件
function listenToMouse() {
  let painting = false; // flag标记，是否开始画画
  let lastPoint = { x: undefined, y: undefined };
  // 鼠标按下
  canvas.onmousedown = (a) => {
    let x = a.clientX;
    let y = a.clientY;
    painting = true;
    if (eraserEnabled) {
      ctx.clearRect(x - 5, y - 5, 10, 10);
    } else {
      lastPoint = {
        x: x,
        y: y,
      };
    }
  };

  // 鼠标移动
  canvas.onmousemove = (a) => {
    let x = a.clientX;
    let y = a.clientY;
    if (!painting) return;
    if (eraserEnabled) {
      ctx.clearRect(x - 5, y - 5, 10, 10);
    } else {
      let newPonit = {
        x: x,
        y: y,
      };
      drawLine(lastPoint.x, lastPoint.y, newPonit.x, newPonit.y);
      lastPoint = newPonit; // key
    }
  };

  // 鼠标松开
  canvas.onmouseup = () => {
    painting = false;
  };
}

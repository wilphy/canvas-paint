const canvas = document.getElementById("canvas");

fullPage();

window.onresize = () => fullPage();

function fullPage() {
  let pageWidth = document.documentElement.clientWidth;
  let pageHeight = document.documentElement.clientHeight;

  canvas.width = pageWidth;
  canvas.height = pageHeight;
}

const ctx = canvas.getContext("2d");

let using = false; // flag标记，是否开始画画
let lastPoint = { x: undefined, y: undefined };

// 鼠标按下
canvas.onmousedown = (a) => {
  let x = a.clientX;
  let y = a.clientY;
  if (eraserEnabled) {
    using = true;
    ctx.clearRect(x, y, 10, 10);
  } else {
    using = true;
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

  if (eraserEnabled) {
    if (unescape) {
      ctx.clearRect(x, y, 10, 10);
    }
  } else {
    if (using) {
      let newPonit = {
        x: x,
        y: y,
      };
      drawLine(lastPoint.x, lastPoint.y, newPonit.x, newPonit.y);
      lastPoint = newPonit; // key
    }
  }
};

// 鼠标松开
canvas.onmouseup = () => {
  using = false;
};

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
  eraserEnabled = !eraserEnabled;
};

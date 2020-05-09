const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let painting = false; // flag标记，是否开始画画
let lastPoint = { x: undefined, y: undefined };

// 鼠标按下
canvas.onmousedown = (a) => {
  painting = true;
  let x = a.clientX;
  let y = a.clientY;
  lastPoint = { x: x, y: y };
  drawCircle(x, y, 1);
};

// 鼠标移动
canvas.onmousemove = (a) => {
  if (painting) {
    let x = a.clientX;
    let y = a.clientY;
    let newPonit = { x: x, y: y };
    drawCircle(x, y, 1);
    drawLine(lastPoint.x, lastPoint.y, newPonit.x, newPonit.y);
    lastPoint = newPonit; // key
  }
};

// 鼠标松开
canvas.onmouseup = () => {
  painting = false;
};

function drawCircle(x, y, radius) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
}

function drawLine(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.strokeStyle = "black";
  ctx.lineWidth = 5;
  ctx.moveTo(x1, y1); //起点
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.closePath();
}

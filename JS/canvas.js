let canvascontainer = document.getElementById("canvascontainer");
const aside = document.querySelector("aside");
const brush = document.getElementById("brush");
const eraser = document.getElementById("eraser");

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = canvascontainer.clientWidth;
canvas.height = canvascontainer.clientHeight;

let canvasrect = canvas.getBoundingClientRect();

const mouse = {
  x: canvascontainer.clientWidth / 2,
  y: canvascontainer.clientHeight / 2,
};

let painting = false;
let lines = [];
let lineWidth = 10;
let lineCap = "round";
let color = document.getElementById("color").value;
let tool = "";

// Event Listeners
canvas.addEventListener("mousemove", (event) => {
  mouse.x = event.clientX - canvasrect.left;
  mouse.y = event.clientY - canvasrect.top;
  draw();
});

canvas.addEventListener("mousedown", (event) => {
  // mouse.x = event.clientX;
  // mouse.y = event.clientY;
  console.log("MouseDown");
  painting = true;
});

canvas.addEventListener("mouseup", (event) => {
  // mouse.x = event.clientX;
  // mouse.y = event.clientY;
  console.log("MouseUp");
  painting = false;
  c.beginPath();
});

brush.addEventListener("click", (e) => {
  if (tool == "draw") {
    tool = "";
    brush.style.color = "black";
  } else {
    tool = "draw";
    brush.style.color = "red";
    eraser.style.color = "black";
  }
});

eraser.addEventListener("click", (e) => {
  if (tool == "eraser") {
    tool = "";
    eraser.style.color = "black";
  } else {
    tool = "eraser";
    eraser.style.color = "red";
    brush.style.color = "black";
  }
});

function draw() {
  if (!painting) return;

  c.lineWidth = lineWidth;
  c.lineCap = lineCap;
  c.lineTo(mouse.x, mouse.y);
  if (tool == "draw") {
    c.globalCompositeOperation = "source-over";
    c.strokeStyle = color;
    c.stroke();
  } else if (tool == "eraser") {
    c.globalCompositeOperation = "destination-out";
    c.strokeStyle = color;
    c.stroke();
  }
  c.beginPath();
  c.moveTo(mouse.x, mouse.y);

  // c.lineWidth = lineWidth;
  // c.lineCap = lineCap;
  // c.lineTo(mouse.x, mouse.y);
  // c.strokeStyle = color;
  // c.stroke();
  // c.beginPath();
  // c.moveTo(mouse.x, mouse.y);
}

function changecolor(value) {
  color = value;
}

function changesize(value) {
  lineWidth = value;
}

function changelinecap(e) {
  console.log(e.options[e.selectedIndex].value);
  lineCap = e.options[e.selectedIndex].value;
}

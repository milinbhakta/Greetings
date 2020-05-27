let canvascontainer = document.getElementById("canvascontainer");
const aside = document.querySelector("aside");
const brush = document.getElementById("brush");
const eraser = document.getElementById("eraser");
const rectangledraw = document.getElementById("rectangledraw");

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = canvascontainer.clientWidth;
canvas.height = canvascontainer.clientHeight;

let canvasrect = canvas.getBoundingClientRect();

const mouse = {
  x: canvascontainer.clientWidth / 2,
  y: canvascontainer.clientHeight / 2,
};

const last_mouse = {
  x: 0,
  y: 0,
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
  last_mouse.x = event.clientX - canvasrect.left;
  last_mouse.y = event.clientY - canvasrect.top;
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
    rectangledraw.style.color = "black";
    rectangledraw.setAttribute(
      "src",
      "https://img.icons8.com/android/48/000000/rectangle-stroked.png"
    );
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
    rectangledraw.setAttribute(
      "src",
      "https://img.icons8.com/android/48/000000/rectangle-stroked.png"
    );
  }
});

rectangledraw.addEventListener("click", (e) => {
  if (tool == "rectdraw") {
    tool = "";
    rectangledraw.style.color = "black";
  } else {
    tool = "rectdraw";
    rectangledraw.setAttribute(
      "src",
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QA/wD/AP+gvaeTAAAC40lEQVR4nO2bv2sTYRjHv8+biDFdqigOHfxRtbm7pqmmi51CQXGSUil0EPRPqINU7CiCFhWX7goOhQxiFyfbTRRTrQ2560msuDhYkSIaEnq5x6Gm1Hq5xV6fhr6f6e7e514+z/fguOE5QKPRaHYx1Djg4eHYom0P+kCOmNtZqY9xoqmuYnFRUvB/cdPplMc8Qr7fyUQrRDRjGMY05fN14E8AH9Lp457vPwXQs+l+ZqIHpmGMNW5oFWZzufjh5eUJAKPY8KCxdvI+ptTQqWJxiRbS6f1x358DcCxkv7tmqXQjSuGtxrasCQDXm60zsJRIJM6QY5q3mejmNrrtJG4pJrokbSEFA8MKwBFpESkIOKoY+CYtIshXRcALaQspGJihkmWZBLwBkAypfcnMD7dLbCsgolEA/SEllTpRHwGAbRiDUOoJgLaAwqLyvAsp1/0ShWhUuJlMR93zngNIByz/ZObLlm0/W/9AcCzrCgOPNldWEom2vrm5SoSukVHIZpPJavXX5usEXDVKpccAoBoXfebAJlu1eaC5+8ZeVVDBbkIHIC0gjQ5AWkAaHYC0gDQ6AGkBaXQA0gLS6ACkBaTRAUgLSKMDkBaQRgcgLSCNDkBaQBodgLSANDoAaQFpdADSAtLoAKQFpNEBSAtIsx6AIgockSlks2GjMzuaZu4be1UA4HR3DzEwGVScrFZfuZlMRzSK0eFmMh3JWu110BoDk7ZhDAJAY0iqAGBfyH6tOCR1DcDZkJJKnagvTsAYwpsHgH4iCpu4akWSMeYxxcCAtIkgA4qAg9IWghxSAD5LWwjySQHIS1tIwUCe3vX2tu9dXS0A6AypbcUfJu5g7QXfjPKeWi2rTs/Pr6hY7ByA+YAiJuZ7hmmOR6MZHYZpjjPRfQD8zyLRWxWLnT9ZLv/466cpx3Euku/nGDhAQJni8anUwoK7neJbzWJPTxd73ggDJwj4zsyzhuNME+BLu2k0Go04vwErUNbQ7rAHRwAAAABJRU5ErkJggg=="
    );
    brush.style.color = "black";
    eraser.style.color = "black";
  }
});

function draw() {
  if (!painting) return;

  c.lineWidth = lineWidth;
  c.lineCap = lineCap;
  if (tool == "draw") {
    c.beginPath();
    c.globalCompositeOperation = "source-over";
    c.strokeStyle = color;
    c.moveTo(last_mouse.x, last_mouse.y);
    c.lineTo(mouse.x, mouse.y);
    c.stroke();
    last_mouse.x = mouse.x;
    last_mouse.y = mouse.y;
  } else if (tool == "eraser") {
    c.beginPath();
    c.globalCompositeOperation = "destination-out";
    c.moveTo(last_mouse.x, last_mouse.y);
    c.lineTo(mouse.x, mouse.y);
    c.stroke();
    last_mouse.x = mouse.x;
    last_mouse.y = mouse.y;
  } else if (tool == "rectdraw") {
    c.beginPath();
    console.log("rectdraw");
    var width = mouse.x - last_mouse.x;
    var height = mouse.y - last_mouse.y;
    console.log("width", "height", width, height);
    c.strokeStyle = color;
    c.strokeRect(last_mouse.x, last_mouse.y, width, height);
  }

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

let cnv = document.getElementById("myCanvas");
let ctx = cnv.getContext("2d");
cnv.width = 800;
cnv.height = 600;

//Global variables
let mouseX;
let mouseY;
let food = [];
// create player
let player = {
  x: 400,
  y: 300,
  r: 15,
  color: "yellow",
  speed: 2,
};

//create circles
function createRandomCircle() {
  circle = {
    x: Math.random() * cnv.width,
    y: Math.random() * cnv.height,
    r: Math.random() * 5 + 8,
    color: randomRGB(),
  };
  food.push(circle);
}

// Main draw function
function draw() {
  ctx.clearRect(0, 0, cnv.width, cnv.height);

  // Draw circle
  for (let i = 0; i < food.length; i++) {
    const circles = food[i];
    ctx.fillStyle = circles.color;
    ctx.beginPath();
    ctx.arc(circles.x, circles.y, circles.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }

  // draw player
  ctx.fillStyle = player.color;
  ctx.beginPath();
  ctx.arc(player.x, player.y, player.r, 0, Math.PI * 2);
  ctx.fill();
  ctx.closePath();

  collision();
  followMouse(player, mouseX, mouseY);
}

// Make player follow mouse
function followMouse(player, x2, y2) {
  // find middle
  let coordinateX = x2 - player.x;
  let coordinateY = y2 - player.y;
  let distance = Math.sqrt(coordinateX ** 2 + coordinateY ** 2);
  console.log(distance);
  if (distance > player.r) {
    let ratio = player.speed / distance;
    player.x += coordinateX * ratio;
    player.y += coordinateY * ratio;
  }
}

// collision detection
function collision() {
  for (let i = 0; i < food.length; i++) {
    const circles = food[i];
    if (
      player.x - player.r < circles.x + circles.r &&
      player.x + player.r > circles.x - circles.r &&
      player.y - player.r < circles.y + circles.r &&
      player.y + player.r > circles.y - circles.r
    ) {
      food.splice(i, 1);
      player.r += circles.r * 0.125;
      createRandomCircle();
    }
  }
}

// Events
document.addEventListener("mousemove", mousemoveHandler);

function mousemoveHandler(event) {
  // Get rectangle info about canvas location
  let cnvRect = cnv.getBoundingClientRect();

  // Calc mouse coordinates using mouse event and canvas location info
  mouseX = event.clientX - cnvRect.left;
  mouseY = event.clientY - cnvRect.top;
}

for (let i = 0; i < 12; i++) {
  createRandomCircle();
}
// Main game loop
function gameLoop() {
  draw();
  requestAnimationFrame(gameLoop);
}
gameLoop();

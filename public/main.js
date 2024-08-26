const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

resizeCanvas();

const emojis = ["🪨", "📜", "✂️"];
const boxes = [];

let speed = 1.5; // Increase speed for chasing effect
let boxesToSpawn = 10; // Reduce the number of boxes
let autoRespawn = true;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);

respawnCubes();

// if someone clicks, respawn the cubes, also for right click
canvas.addEventListener("click", respawnCubes);
canvas.addEventListener("contextmenu", (event) => {
  event.preventDefault();
  respawnCubes();
});
// if someone clicks the middle mouse button, enable auto-respawn
canvas.addEventListener("auxclick", (event) => {
  if (event.button === 1) {
    alert(`${autoRespawn ? "Disabled" : "Enabled"} auto refresh.`);
    autoRespawn = !autoRespawn;
  }
});

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  boxes.forEach((box) => {
    ctx.font = "48px serif";
    ctx.fillText(box.emoji, box.x, box.y + box.height); // Adjust text position to center it vertically
  });
}

function update() {
  boxes.forEach((box) => {
    // Find the target box to chase
    let target = null;
    boxes.forEach((otherBox) => {
      if (
        box !== otherBox &&
        ((box.emoji === "🪨" && otherBox.emoji === "✂️") ||
          (box.emoji === "📜" && otherBox.emoji === "🪨") ||
          (box.emoji === "✂️" && otherBox.emoji === "📜"))
      ) {
        target = otherBox;
      }
    });

    // Move towards the target
    if (target) {
      let angle = Math.atan2(target.y - box.y, target.x - box.x);
      box.dx = Math.cos(angle) * speed;
      box.dy = Math.sin(angle) * speed;
    }

    box.x += box.dx;
    box.y += box.dy;

    if (box.x <= 0 || box.x >= canvas.width - box.width) {
      box.dx *= -1;
    }

    if (box.y <= 0 || box.y >= canvas.height - box.height) {
      box.dy *= -1;
    }

    // Collision detection and rock-paper-scissors
    boxes.forEach((otherBox) => {
      if (
        box !== otherBox &&
        box.x < otherBox.x + otherBox.width &&
        box.x + box.width > otherBox.x &&
        box.y < otherBox.y + otherBox.height &&
        box.y + box.height > otherBox.y &&
        ((box.emoji === "🪨" && otherBox.emoji === "✂️") ||
          (box.emoji === "📜" && otherBox.emoji === "🪨") ||
          (box.emoji === "✂️" && otherBox.emoji === "📜"))
      ) {
        otherBox.emoji = box.emoji;
      }
    });

    if (checkIfOneTypeLeft()) {
      autoRespawn ? respawnCubes() : null;
    }
  });
}

function checkIfOneTypeLeft() {
  const uniqueEmojis = new Set(boxes.map((box) => box.emoji));
  return uniqueEmojis.size === 1;
}

function respawnCubes() {
  boxes.length = 0; // Clear the array
  for (let i = 0; i < boxesToSpawn; i++) {
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];
    const box = {
      x: Math.random() * (canvas.width - 50), // Random position
      y: Math.random() * (canvas.height - 50), // Random position
      width: 40, // Fixed size
      height: 40, // Fixed size
      dx: 0, // Initialize speed to zero
      dy: 0, // Initialize speed to zero
      emoji: emoji, // Random emoji
    };
    boxes.push(box);
  }
}

function loop() {
  draw();
  update();
  requestAnimationFrame(loop);
}

loop();

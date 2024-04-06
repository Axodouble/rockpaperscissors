const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);

resizeCanvas();

const emojis = ["🪨", "📜", "✂️"];

const boxes = [];

let boxesToSpawn = (canvas.width * canvas.height) / 5184;

respawnCubes();

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  boxes.forEach((box) => {
    // // Draw black background behind the emoji
    // ctx.fillStyle = "black";
    // ctx.fillRect(box.x, box.y, box.width, box.height);

    // Draw the emoji
    ctx.font = "48px serif";
    ctx.fillStyle = "white"; // Change text color to white for better visibility
    ctx.fillText(box.emoji, box.x, box.y + box.height); // Adjust text position to center it vertically
  });
}

function update() {
  boxes.forEach((box) => {
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
        box.y + box.height > otherBox.y
      ) {
        // Check rock-paper-scissors
        if (
          (box.emoji === "🪨" && otherBox.emoji === "✂️") ||
          (box.emoji === "📜" && otherBox.emoji === "🪨") ||
          (box.emoji === "✂️" && otherBox.emoji === "📜")
        ) {
          // box wins
          otherBox.emoji = box.emoji;
          // Adjust velocities to simulate bouncing off each other
          const tempDx = box.dx;
          box.dx = otherBox.dx;
          otherBox.dx = tempDx;

          const tempDy = box.dy;
          box.dy = otherBox.dy;
          otherBox.dy = tempDy;
        } else if (
          (otherBox.emoji === "🪨" && box.emoji === "✂️") ||
          (otherBox.emoji === "📜" && box.emoji === "🪨") ||
          (otherBox.emoji === "✂️" && box.emoji === "📜")
        ) {
          // otherBox wins
          box.emoji = otherBox.emoji;
          // Adjust velocities to simulate bouncing off each other
          const tempDx = box.dx;
          box.dx = otherBox.dx;
          otherBox.dx = tempDx;

          const tempDy = box.dy;
          box.dy = otherBox.dy;
          otherBox.dy = tempDy;
        }
      }
    });

    // Check if there is only one type left
    const oneTypeLeft = checkIfOneTypeLeft();
    if (oneTypeLeft) {
      respawnCubes();
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
      x: Math.random() * (canvas.width - 50),
      y: Math.random() * (canvas.height - 50),
      width: 40,
      height: 40,
      dx: (Math.random() - 0.5) * 2,
      dy: (Math.random() - 0.5) * 2,
      emoji: emoji,
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

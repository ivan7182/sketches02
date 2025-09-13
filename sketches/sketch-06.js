const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [1080, 1080],
  animate: true
};

const sketch = ({ context, width, height, canvas }) => {
  let atoms = [];

  class Atom {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.radius = Math.random() * 8 + 2;
      this.speedX = Math.random() * 4 - 2;
      this.speedY = Math.random() * 4 - 2;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.radius -= 0.05;
    }

    draw(context) {
      context.fillStyle = 'black';
      context.beginPath();
      context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      context.fill();
    }
  }

canvas.addEventListener('mousemove', (e) => {
  const rect = canvas.getBoundingClientRect(); 
  const x = (e.clientX - rect.left) * (canvas.width / rect.width);
  const y = (e.clientY - rect.top) * (canvas.height / rect.height);

  for (let i = 0; i < 10; i++) {
    atoms.push(new Atom(x, y));
  }
});

  return ({ context, width, height }) => {
    context.fillStyle = 'rgba(41, 62, 100, 0.2)';
    context.fillRect(0, 0, width, height);

    for (let i = atoms.length - 1; i >= 0; i--) {
      const atom = atoms[i];
      atom.update();
      atom.draw(context);

      if (atom.radius < 0.3) {
        atoms.splice(i, 1);
      }
    }
  };
};

canvasSketch(sketch, settings);

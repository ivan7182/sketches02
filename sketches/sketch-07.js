const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [1080, 1080],
  animate: true
};

let atoms = [];
let degree = 0;
const point = { x: 0, y: 0 };

class Atom {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = Math.random() * 2 + 2;
    this.speedX = Math.random() * 4 - 2;
    this.speedY = Math.random() * 4 - 2;
    this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.radius -= 0.05;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'rgba(0,0,0,0.2)';
    context.fillRect(0, 0, width, height);

    atoms.push(
      new Atom(
        width / 2 + point.x * 200,
        height / 2 + point.y * 200
      )
    );

    point.x = Math.cos((degree / 100) * Math.PI);
    point.y = point.x * point.x;  
    degree++;

    atoms.forEach((atom, i) => {
      atom.update();
      atom.draw(context);
      if (atom.radius < 0.3) {
        atoms.splice(i, 1);
      }
    });
  };
};

canvasSketch(sketch, settings);

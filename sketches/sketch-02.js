const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [1080, 1080]
};

function drawCirclePattern(context, cx, cy, radius, num, w, h, color = 'black', withRect = false) {
  let x, y;

  for (let i = 0; i < num; i++) {
    const slice = math.degToRad(360 / num);
    const angle = slice * i;

    x = cx + radius * Math.sin(angle);
    y = cy + radius * Math.cos(angle);

    if (withRect) {
      context.save();
      context.translate(x, y);
      context.rotate(-angle);
      context.scale(random.range(0.5, 1.5), random.range(1, 3)); 
      context.beginPath();
      context.fillStyle = color;
      context.rect(-w * 0.5, -h * 0.5, w, h * 2); 
      context.fill();
      context.restore();
    }

    context.save();
    context.translate(cx, cy);
    context.rotate(-angle);
    context.lineWidth = random.range(3, 14);
    context.beginPath();
    context.strokeStyle = color;
    context.arc(0, 0, radius * random.range(0.7, 1.3), 0, Math.PI * 2); // full circle
    context.stroke();
    context.restore();
  }
}

const sketch = () => {
  return ({ context, width, height }) => {
    const grd = context.createLinearGradient(0, 0, width, height);
    grd.addColorStop(0, '#fcfcfcff');
    grd.addColorStop(0.5, '#a3408eff');
    grd.addColorStop(1, '#6aaa6aff');

    context.fillStyle = grd;
    context.fillRect(0, 0, width, height);

    const w = width * 0.01;
    const h = height * 0.3;

    drawCirclePattern(context, width * 0.5, height * 0.5, width * 0.3, 20, w, h, 'black', true);  
    drawCirclePattern(context, width * 0.5, height * 0.5, width * 0.5, 30, w, h, 'white');       
    // drawCirclePattern(context, width * 0.2, height * 0.8, width * 0.4, 40, w, h, grd);     
  };
};

canvasSketch(sketch, settings);

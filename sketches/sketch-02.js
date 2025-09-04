const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [1080, 1080]
};

// Fungsi untuk menggambar pola lingkaran
function drawCirclePattern(context, cx, cy, radius, num, w, h, color = 'black') {
  let x, y;

  for (let i = 0; i < num; i++) {
    const slice = math.degToRad(360 / num);
    const angle = slice * i;

    x = cx + radius * Math.sin(angle);
    y = cy + radius * Math.cos(angle);

    // --- Rect ---
    context.save();
    context.translate(x, y);
    context.rotate(-angle);
    context.scale(random.range(0.1, 2), random.range(0.2, 0.5));
    context.beginPath();
    context.fillStyle = color;
    context.rect(w * 0.5, random.range(0, -h * 0.5), w, h);
    context.fill();
    context.restore();

    // --- Arc ---
    context.save();
    context.translate(cx, cy);
    context.rotate(-angle);
    context.lineWidth = random.range(3, 14);
    context.beginPath();
    context.strokeStyle = color;
    context.arc(
      0, 0,
      radius * random.range(0.7, 1.3),
      slice * random.range(-8, 1),
      slice * random.range(1, 5)
    );
    context.stroke();
    context.restore();
  }
}

const sketch = () => {
  return ({ context, width, height }) => {
    // Background gradient
    const grd = context.createLinearGradient(0, 0, width, height);
    grd.addColorStop(0, '#fcfcfcff');
    grd.addColorStop(0.5, '#a3408eff');
    grd.addColorStop(1, '#6aaa6aff');

    context.fillStyle = grd;
    context.fillRect(0, 0, width, height);

    // Ukuran dasar untuk rect
    const w = width * 0.01;
    const h = height * 0.3;

    // Gambar beberapa lingkaran dengan posisi & ukuran berbeda
    drawCirclePattern(context, width * 0.5, height * 0.2, width * 0.3, 20, w, h, 'black'); // lingkaran pertama
    drawCirclePattern(context, width * 0.5, height * 0.5, width * 0.5, 30, w, h, 'white'); // lingkaran kedua
    drawCirclePattern(context, width * 0.2, height * 0.8, width * 0.5, 40, w, h, grd); // lingkaran ketiga
  };
};

canvasSketch(sketch, settings);

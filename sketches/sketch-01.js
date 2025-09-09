const canvasSketch = require('canvas-sketch');
const Color = require('canvas-sketch-util/color');

const settings = {
  dimensions: [1080, 1080],
  animate: true,
  duration: 6, // total durasi loop (detik)
  fps: 30
};

const sketch = () => {
  const cols = 5;
  const rows = 5;
  const shapes = [];

  const w = 1080 * 0.10;
  const h = 1080 * 0.10;
  const gap = 1080 * 0.03;
  const ix = 1080 * 0.17;
  const iy = 1080 * 0.17;
  const off = 1080 * 0.02;

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      const x = ix + (w + gap) * i;
      const y = iy + (h + gap) * j;
      const isCircle = Math.random() > 0.5;

      shapes.push({
        x,
        y,
        isCircle,
        color: Color.offsetHSL('crimson', Math.random() * 360, 0, 0).hex,
        lastUpdate: -1,
      });
    }
  }

  return ({ context, width, height, playhead }) => {
    context.fillStyle = '#146eb8ff';
    context.fillRect(0, 0, width, height);
    context.lineWidth = width * 0.01;

    const timeInSecond = Math.floor(playhead * settings.duration);

    shapes.forEach((shape) => {
      if (timeInSecond !== shape.lastUpdate) {
        shape.color = Color.offsetHSL(
          'crimson',
          Math.random() * 360,
          0,
          0
        ).hex;
        shape.isCircle = Math.random() > 0.5;
        shape.lastUpdate = timeInSecond;
      }

      context.beginPath();
      if (shape.isCircle) {
        context.arc(shape.x + w / 2, shape.y + h / 2, 30, 0, Math.PI * 2);
      } else {
        context.rect(shape.x + off / 2, shape.y + off / 2, w - off, h - off);
      }
      context.fillStyle = shape.color;
      context.fill();
      context.stroke();
    });
  };
};

canvasSketch(sketch, settings);

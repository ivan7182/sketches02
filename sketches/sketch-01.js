const canvasSketch = require('canvas-sketch');
const Color = require('canvas-sketch-util/color');

const settings = {
  dimensions: [ 1080, 1080 ]
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);
    context.lineWidth = width * 0.01;
    context.strokeStyle = 'hsla(300, 77%, 42%, 1.00)';
    
    const w = width * 0.10;
    const h = height * 0.10;
    const gap = width * 0.03;
    const ix = width * 0.17;
    const iy = height * 0.17;

    const off = width * 0.02;

    let x,y;

    for (let i = 0; i < 5; i++) {
        for (let j =0; j < 5; j++) {
             x = ix  + (w + gap) * i ;
             y = iy  + (h + gap ) * j;

            const randomColor = Color.offsetHSL('crimson', Math.random() * 360, 0, 0).hex;
            context.strokeStyle = randomColor;
            context.fillStyle = randomColor;

            if (Math.random() > 0.5) {
                context.beginPath();
                context.rect(x + off / 2, y + off / 2, w - off, h - off);
                context.fillStyle = 'crimpson';
                context.fill();
                context.stroke();
            } else {
                context.beginPath();
                context.arc(x + w / 2, y + h / 2 , 30 , 0 , Math.PI * 2);
                context.fillStyle = 'crimpson';
                context.fill();
                context.stroke();
            }
        }
      }
  };
};

canvasSketch(sketch, settings);

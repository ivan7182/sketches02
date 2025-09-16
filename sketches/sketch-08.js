const canvasSketch = require('canvas-sketch');
const { loadImage } = require('canvas');
const path = require('path');

const settings = {
  dimensions: [1080, 1080],
  animate: true
};

const sketch = ({ context, width, height }) => {
  let brightnessArray = [];
  let particlesArray = [];
  let imageLoaded = false;

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.velocity = Math.random() * 4 + 2;
      this.length = Math.random() * 10 + 10;
      this.brightness = 0;
    }

    update() {
      this.y += this.velocity;
      if (this.y >= height) {
        this.y = 0;
        this.x = Math.random() * width;
      }
      const pos = (Math.floor(this.y) * width + Math.floor(this.x));
      this.brightness = brightnessArray[pos] || 0;
    }

    draw(ctx) {
      ctx.beginPath();
      ctx.strokeStyle = `rgba(255,255,255,${this.brightness / 255})`;
      ctx.lineWidth = 1;
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.x, this.y + this.length);
      ctx.stroke();
    }
  }

  const imagePath = path.resolve(__dirname, '../onic.png');
  console.log('Mencoba load image dari:', imagePath);

  loadImage(imagePath).then(img => {
    console.log('Berhasil load image:', imagePath);

    context.drawImage(img, 0, 0, width, height);
    const imgData = context.getImageData(0, 0, width, height);

    for (let i = 0; i < imgData.data.length / 4; i++) {
      const red = imgData.data[i * 4];
      const green = imgData.data[i * 4 + 1];
      const blue = imgData.data[i * 4 + 2];
      const brightness = (red + green + blue) / 3;
      brightnessArray.push(brightness);
    }

    for (let i = 0; i < 3000; i++) {
      particlesArray.push(new Particle());
    }

    imageLoaded = true;
  }).catch(err => {
    console.error('Gagal load image:', imagePath, err);
  });


  return ({ context }) => {
    if (!imageLoaded) return;
    context.fillStyle = 'rgba(35,36,34,0.05)'; 
    context.fillRect(0, 0, width, height);
    particlesArray.forEach(p => {
      p.update();
      p.draw(context);
    });
  };
};

canvasSketch(sketch, settings);

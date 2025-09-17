const canvasSketch = require('canvas-sketch');
const { loadImage } = require('canvas');
const path = require('path');

const settings = {
  dimensions: [1080, 1080],
  animate: true
};

const sketch = ({ context, width, height }) => {
  let brightnessArray = [];
  let rgbArray = [];
  let particlesArray = [];
  let validPixels = [];
  let imageLoaded = false;

  class Particle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.velocity = Math.random() * 4 + 2;
      this.length = Math.random() * 10 + 10;
      this.brightness = 0;
      this.pos = 0;
    }

    update() {
      this.y += this.velocity;
      if (this.y >= height) {
        this.y = Math.random() * height;
        this.x = Math.random() * width;
      }

      this.pos = (Math.floor(this.y) * width + Math.floor(this.x));
      this.brightness = brightnessArray[this.pos] || 0;
    }

    draw(ctx) {
      ctx.beginPath();
      ctx.strokeStyle = rgbArray[this.pos] || "white";
      ctx.lineWidth = 1;
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.x, this.y + this.length);
      ctx.stroke();
    }
  }

  const imagePath = path.resolve(__dirname, '../onic.png'); // sesuaikan path
  console.log('Mencoba load image dari:', imagePath);

  loadImage(imagePath).then(img => {
    console.log('Berhasil load image:', imagePath);
    context.drawImage(img, 0, 0, width, height);
    const imgData = context.getImageData(0, 0, width, height);
    context.clearRect(0, 0, canvasSketch.width, canvasSketch.height);

    for (let i = 0; i < imgData.data.length / 4; i++) {
      const red = imgData.data[i * 4];
      const green = imgData.data[i * 4 + 1];
      const blue = imgData.data[i * 4 + 2];
      const brightness = (red + green + blue) / 3;
      brightnessArray.push(brightness);
      rgbArray.push(`rgb(${red}, ${green}, ${blue})`);

      if (brightness > 10) validPixels.push(i);
    }

    for (let i = 0; i < 3000; i++) {
      const idx = validPixels[Math.floor(Math.random() * validPixels.length)];
      const y = Math.floor(idx / width);
      const x = idx % width;
      const p = new Particle(x, y);
      particlesArray.push(p);
    }

    imageLoaded = true;
  }).catch(err => {
    console.error('Gagal load image:', imagePath, err);
  });

  // Render loop
  return ({ context }) => {
    if (!imageLoaded) return;

    context.fillStyle = 'rgba(0, 0, 0, 0.1)';
    context.fillRect(0, 0, width, height);

    particlesArray.forEach(p => {
      p.update();
      p.draw(context);
    });
  };
};

canvasSketch(sketch, settings);

const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 600, 600 ]
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    context.lineWidth = width * 0.01;

           // context.shadowBlur = 100;
          // context.shadowOffsetX = 30;
          // context.shadowOffsetY = 5;
          // context.shadowColor = 'rgba(190, 129, 129, 0.5)';

        //create gradient color
        const gradient = context.createLinearGradient(0,0,170,0);
        gradient.addColorStop(0.1, 'orange');       
        gradient.addColorStop(1, 'blue');
        gradient.addColorStop(0.1, 'yellow');

        context.strokeStyle = gradient;
        context.lineWidth = 8;

        const w = width * 0.10;
        const h = height * 0.10;
        const gap = width * 0.03;
        const ix = width * 0.16;
        const iy = height * 0.16;

        const off = width * 0.02;

        let x,y;
        for (let i = 0; i < 5; i ++ ){
            for (let j = 0; j < 5; j ++){
                x = ix + (w + gap) * i;
                y = iy +(h + gap) * j;

                context.beginPath();
                context.rect(x,y,w,h);
                context.stroke();


                if (Math.random() > 0.5){
                    context.beginPath();
                    context.rect(x + off / 2, y + off / 2, w - off , h - off );
                    context.stroke();
                }
            }
            
        }
  };
};

canvasSketch(sketch, settings);

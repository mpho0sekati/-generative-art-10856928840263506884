const canvasSketch = require('canvas-sketch');

const settings = {
  animate: true,
  duration: 4,
  dimensions: [ 640, 640 ],
  fps: 30
};

const sketch = () => {
  return ({ context, width, height, playhead }) => {
    const sky = context.createLinearGradient(0, 0, 0, height);
    sky.addColorStop(0, '#101632');
    sky.addColorStop(1, '#34466d');
    context.fillStyle = sky;
    context.fillRect(0, 0, width, height);

    // A soft field of stars, with a little twinkle in each loop.
    for (let i = 0; i < 48; i++) {
      const x = (i * 137.5 + 29) % width;
      const y = (i * 83.7 + 37) % 390;
      const twinkle = 0.45 + 0.55 * Math.sin(playhead * Math.PI * 2 + i);
      context.globalAlpha = twinkle;
      context.fillStyle = '#fff4cf';
      context.beginPath();
      context.arc(x, y, i % 5 === 0 ? 2 : 1.2, 0, Math.PI * 2);
      context.fill();
    }
    context.globalAlpha = 1;

    // Crescent moon.
    context.fillStyle = '#f9d879';
    context.beginPath();
    context.arc(350, 285, 88, 0, Math.PI * 2);
    context.fill();
    context.fillStyle = '#18213e';
    context.beginPath();
    context.arc(390, 250, 78, 0, Math.PI * 2);
    context.fill();

    // Distant rolling hills.
    context.fillStyle = '#263d4a';
    context.beginPath();
    context.moveTo(0, 445);
    context.quadraticCurveTo(170, 390, 330, 455);
    context.quadraticCurveTo(500, 510, 640, 425);
    context.lineTo(640, 640);
    context.lineTo(0, 640);
    context.closePath();
    context.fill();
    context.fillStyle = '#182f3b';
    context.beginPath();
    context.moveTo(0, 500);
    context.quadraticCurveTo(210, 445, 390, 520);
    context.quadraticCurveTo(530, 565, 640, 490);
    context.lineTo(640, 640);
    context.lineTo(0, 640);
    context.closePath();
    context.fill();

    // The cow follows a smooth arc from one side of the field to the other.
    const x = 105 + playhead * 430;
    const jump = Math.sin(playhead * Math.PI);
    const y = 405 - jump * 215;
    const legSwing = Math.sin(playhead * Math.PI * 2) * 0.18;

    context.save();
    context.translate(x, y);
    context.rotate(-jump * 0.08);
    drawCow(context, legSwing);
    context.restore();

    // Small caption in the lower sky.
    context.fillStyle = 'rgba(255, 244, 207, 0.82)';
    context.font = '18px sans-serif';
    context.textAlign = 'center';
    context.fillText('A little leap into the night', width / 2, 590);
  };
};

function drawCow (context, legSwing) {
  context.lineWidth = 4;
  context.lineJoin = 'round';
  context.strokeStyle = '#26313c';
  context.fillStyle = '#fff8e9';

  // Tail.
  context.beginPath();
  context.moveTo(-92, -15);
  context.quadraticCurveTo(-128, -25, -124, -55);
  context.quadraticCurveTo(-120, -40, -110, -42);
  context.stroke();

  // Body and head.
  context.beginPath();
  context.ellipse(0, 0, 83, 49, 0, 0, Math.PI * 2);
  context.fill();
  context.stroke();
  context.beginPath();
  context.ellipse(77, -32, 38, 31, 0.15, 0, Math.PI * 2);
  context.fill();
  context.stroke();

  // Ears and little horns.
  context.fillStyle = '#f3a5a0';
  context.beginPath();
  context.ellipse(54, -55, 20, 9, -0.5, 0, Math.PI * 2);
  context.fill();
  context.stroke();
  context.beginPath();
  context.ellipse(101, -55, 19, 9, 0.5, 0, Math.PI * 2);
  context.fill();
  context.stroke();
  context.fillStyle = '#f8e5b7';
  context.beginPath();
  context.moveTo(63, -57);
  context.lineTo(69, -73);
  context.lineTo(77, -56);
  context.closePath();
  context.fill();
  context.stroke();

  // Spots.
  context.fillStyle = '#48515b';
  context.beginPath();
  context.ellipse(-31, -13, 23, 18, -0.4, 0, Math.PI * 2);
  context.fill();
  context.beginPath();
  context.ellipse(20, 17, 18, 24, 0.35, 0, Math.PI * 2);
  context.fill();
  context.beginPath();
  context.ellipse(72, -39, 9, 7, 0, 0, Math.PI * 2);
  context.fill();

  // Muzzle, eye, and nostrils.
  context.fillStyle = '#efa9a1';
  context.beginPath();
  context.ellipse(105, -20, 22, 14, 0.12, 0, Math.PI * 2);
  context.fill();
  context.stroke();
  context.fillStyle = '#26313c';
  context.beginPath();
  context.arc(88, -39, 3.5, 0, Math.PI * 2);
  context.fill();
  context.beginPath();
  context.arc(99, -21, 2, 0, Math.PI * 2);
  context.arc(111, -21, 2, 0, Math.PI * 2);
  context.fill();

  // Four tucked, gently swinging legs and dark hooves.
  const legs = [
    { x: -55, y: 27, phase: 1 },
    { x: -20, y: 32, phase: -1 },
    { x: 35, y: 30, phase: 1 },
    { x: 58, y: 25, phase: -1 }
  ];
  legs.forEach(({ x, y, phase }) => {
    const bend = phase * legSwing * 18;
    context.strokeStyle = '#26313c';
    context.lineWidth = 12;
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x + bend, y + 23);
    context.lineTo(x - bend, y + 39);
    context.stroke();
    context.fillStyle = '#26313c';
    context.fillRect(x - bend - 7, y + 34, 15, 9);
  });
}

canvasSketch(sketch, settings);

import { createCanvas } from "https://deno.land/x/canvas/mod.ts";
import canvasSketch from "../dist/canvas-sketch.esm.mjs";

const settings = {
  dimensions: [2048, 1024],
  resizeCanvas: false,
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    const margin = 0;

    // Off-white background
    context.fillStyle = "hsl(0, 0%, 98%)";
    context.fillRect(0, 0, width, height);

    // Gradient foreground
    const fill = context.createLinearGradient(0, 0, 0, height);
    fill.addColorStop(0, "red");
    fill.addColorStop(1, "green");

    context.fillStyle = fill;
    context.fillRect(margin, margin, width - margin * 2, height - margin * 2);
  };
};

const canvas = createCanvas(settings.dimensions[0], settings.dimensions[1]);
const context = canvas.getContext("2d");

canvasSketch(sketch, {
  ...settings,
  canvas,
  context,
}).then(async (manager) => {
  await Deno.mkdir("tmp", { recursive: true });
  await Deno.writeFile("tmp/out.png", canvas.toBuffer());
});

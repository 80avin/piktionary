// const this={canvasRef:null}
import FloodFill from 'q-floodfill';

export const floodFillLibrary = (pos, color, ctx)=>{
  const imageData = ctx.getImageData(0,0,ctx.canvas.width, ctx.canvas.height);
  const floodFill = new FloodFill(imageData);
  floodFill.fill(color, Math.round(pos[0]), Math.round(pos[1]), 0);
  ctx.putImageData(floodFill.imageData, 0, 0);
}

export const floodFill = floodFillLibrary
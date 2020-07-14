export const getPosFromEvent = (e) => {
  if (typeof (e.pageX) !== "undefined") {
    return [
      (e.pageX) - e.target.offsetLeft - e.target.clientLeft,
      (e.pageY) - e.target.offsetTop - e.target.clientTop,
    ]
  }
  else if (e.touches) {
    return [
      (e.touches[0].pageX) - e.target.offsetLeft - e.target.clientLeft - (parseInt(e.target.style.paddingLeft) || 0),
      (e.touches[0].pageY) - e.target.offsetTop - e.target.clientTop - (parseInt(e.target.style.paddingTop) || 0),
    ]
  }
}

export const cssToNormalPos = (pos, ctx) => {
  return [100 * pos[0] / ctx.canvas.clientWidth, 100 * pos[1] / ctx.canvas.clientHeight];
}
export const normalToCanvasPos = (pos, ctx) => {
  return [pos[0] * ctx.canvas.width / 100, pos[1] * ctx.canvas.height / 100];
}
export const getRoundCursor = (size, color) => {
  const canv = document.createElement('canvas');
  canv.width = canv.height = size;
  const ctx = canv.getContext('2d');
  const rad = Math.round(size / 2);
  ctx.arc(rad, rad, rad, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
  return `url(${canv.toDataURL()}) ${rad} ${rad}`
}

export const linMap = (x, x1, y1, x2, y2) => (y2 - y1) / (x2 - x1) * (x - x1) + y1;
export const linearInterp = (frac, x1, x2) => Math.round(frac * (x2 - x1) + x1)

export const interpolateColor = (frac, color1, color2) => {
  return color1.map((c1, i) => Math.floor((color2[i] - color1[i]) * frac + color1[i]))
}

export const colorFromGradPicker = (value) => {
  const grad = [
    [255, 0, 0],
    [255, 255, 0],
    [0, 255, 0],
    [0, 255, 255],
    [0, 0, 255],
    [255, 0, 255],
    [255, 0, 0],
    [255, 255, 255],
    [0, 0, 0],
  ]
  const i_lower = Math.floor(value / 60);
  if (i_lower === grad.length-1) return rgbToHex(...grad[grad.length - 1]);
  return rgbToHex(...interpolateColor((value / 60) % 1, grad[i_lower], grad[i_lower + 1]));
}

export const rgbToHex = (r, g, b) => {
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
}
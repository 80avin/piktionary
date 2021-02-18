export const getPosFromEvent = (e) => {
  let x, y;
  if (typeof (e.pageX) !== "undefined") {
    [x, y] = [e.pageX, e.pageY];
  }
  else if (e.touches) {
    [x, y] = [e.touches[0].pageX, e.touches[0].pageY];
  }
  else
    return null;
  const boundingRect = e.target.getBoundingClientRect();
  return [
    (x) - boundingRect.left - (parseInt(e.target.style.paddingLeft) || 0),
    (y) - boundingRect.top - (parseInt(e.target.style.paddingTop) || 0),
    // (x) - e.target.offsetLeft - e.target.clientLeft,
    // (y) - e.target.offsetTop - e.target.clientTop,
  ]
}

export const cssToNormalPos = (pos, ctx) => {
  const bcr = ctx.canvas.getBoundingClientRect();
  return [100 * pos[0] / bcr.width, 100 * pos[1] / bcr.height];
}

export const normalToCanvasPos = (pos, ctx) => {
  return [Math.round(pos[0] * ctx.canvas.width / 100), Math.round(pos[1] * ctx.canvas.height / 100)];
}

let _cursorCanvas = null;
export const getRoundCursor = (size, color) => {
  _cursorCanvas = _cursorCanvas || document.createElement('canvas');

  _cursorCanvas.width = _cursorCanvas.height = size + 6;
  const ctx = _cursorCanvas.getContext('2d');
  const rad = Math.round(size / 2);
  ctx.beginPath()
  ctx.arc(rad + 3, rad + 3, rad, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.strokeStyle = 'white';
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.fill();
  ctx.closePath();
  ctx.beginPath();
  ctx.arc(rad + 3, rad + 3, rad + 2, 0, 2 * Math.PI);
  ctx.lineWidth = 1;
  ctx.strokeStyle = 'black'
  ctx.stroke();
  ctx.closePath();
  return `url(${_cursorCanvas.toDataURL()}) ${rad + 3} ${rad + 3}`
}

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
  if (i_lower === grad.length - 1) return rgbToHex(...grad[grad.length - 1]);
  return rgbToHex(...interpolateColor((value / 60) % 1, grad[i_lower], grad[i_lower + 1]));
}

export const rgbToHex = (r, g, b) => {
  const f = (x) => x.toString(16).padStart(2, '0');
  return `#${f(r)}${f(g)}${f(b)}`
}
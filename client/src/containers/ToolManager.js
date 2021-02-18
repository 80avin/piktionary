import FloodFill from 'q-floodfill';
import { getPosFromEvent, cssToNormalPos, normalToCanvasPos, getRoundCursor } from '../utils/canvasutils';

class ToolManager {
  constructor() {
    this.tools = {}
    this.fgColor = '#ff0000';
    this.bgColor = '#ffffff';
    this.currentPos = [0, 0];
    this.size = 10;
    this.activeTool = null;
    this.enabled = false;
    this.undoStack = [];
  }
  init(ctx, socket, props = {}) {
    this.ctx = ctx;
    this.socket = socket;
    this.activeTool = Object.keys(this.tools).length === 0 ? null : Object.keys(this.tools)[0];
    this.enabled = false;
    this.socket.on('drawing', data => this.draw(data));
    this.undoStack = []
  }
  setProp(prop, v) {
    if (!['fgColor', 'bgColor', 'size'].some(p => p === prop)) return;
    this[prop] = v;
    if (!['fgColor', 'size'].some(p => p === prop)) return;
    this.setCursor();
  }
  add(name, toolObject) {
    this.tools[name] = { name, ...toolObject };
  }
  select(name, e) {
    if (!this.tools[name]) return;
    this.tools[name].select(e, this);
    if (this.tools[name].sticky) this.activeTool = name;
    this.enabled = false;
    this.setCursor();
  }
  start(e) {
    if (!this.tools[this.activeTool]) return;
    this.tools[this.activeTool].start(e, this);
  }
  move(e) {
    if (!this.tools[this.activeTool]) return;
    this.tools[this.activeTool].move(e, this);
  }
  end(e) {
    if (!this.tools[this.activeTool]) return;
    this.tools[this.activeTool].end(e, this);
  }
  draw(data) {
    if (data.tool === 'image') {
      const img = new Image();
      img.src = data.src;
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
      img.onload = () => this.ctx.drawImage(img, 0, 0);
      return;
    }
    if (this.tools[data.tool]) {
      this.tools[data.tool].draw(data, this);
    }
  }
  setCursor() {
    if (!this.tools[this.activeTool]) return;
    const cursor = this.tools[this.activeTool].cursor(undefined, this);
    if (cursor) this.ctx.canvas.style.cursor = `${cursor}, auto`
  }
  getCursor() {
    if (!this.ctx) return 'url(123) a b'
    return this.tools['pen'].cursor(undefined, this);
  }
  emit(topic = 'drawing', data) {
    this.socket.emit(topic, data);
  }
  getCanvasScale() {
    // console.log('tm',this)
    if (!this.ctx) return 1;
    return this.ctx.canvas.width / this.ctx.canvas.getBoundingClientRect().width;
  }
}

const toolManager = new ToolManager();
toolManager.add('pen', {
  select: (e) => { },
  deselect: (e, tm) => { },
  start: (e, tm) => {
    tm.enabled = true;
    tm.undoStack.push(tm.ctx.canvas.toDataURL());
    const data = {
      tool: 'pen',
      to: cssToNormalPos(getPosFromEvent(e), tm.ctx),
      config: {
        size: tm.size,
        color: tm.fgColor,
        currentPos: cssToNormalPos(getPosFromEvent(e), tm.ctx),
        lineCap: 'round',
      }
    };
    tm.draw(data);
    tm.emit('drawing', data);
    tm.currentPos = data.to;
  },
  move: (e, tm) => {
    if (!tm.enabled) return;
    const data = {
      tool: 'pen',
      to: cssToNormalPos(getPosFromEvent(e), tm.ctx),
      config: {
        size: tm.size,
        color: tm.fgColor,
        currentPos: tm.currentPos,
        lineCap: 'round',
      }
    };
    tm.draw(data);
    tm.emit('drawing', data);
    tm.currentPos = data.to;
  },
  end: (e, tm) => { tm.enabled = false; },
  draw: (data, tm) => {
    tm.ctx.beginPath();
    tm.ctx.translate(0.5,0.5);
    const nm1 = [...normalToCanvasPos(data.config.currentPos, tm.ctx), ...normalToCanvasPos(data.to, tm.ctx)];
    console.log('half',nm1.find(f=>(f%1!==0)));
    tm.ctx.moveTo(...normalToCanvasPos(data.config.currentPos, tm.ctx));
    tm.ctx.lineTo(...normalToCanvasPos(data.to, tm.ctx));
    tm.ctx.strokeStyle = data.config.color;
    tm.ctx.lineWidth = data.config.size;
    tm.ctx.lineCap = data.config.lineCap || 'round';
    tm.ctx.stroke();
    tm.ctx.translate(-0.5,-0.5);
    tm.ctx.closePath();
  },
  cursor: (e, tm) => {
    const size = tm.size / tm.getCanvasScale();
    return getRoundCursor(size, tm.fgColor);//}) ${rad} ${rad}`;
  },
  sticky: true,
})
toolManager.add('eraser', {
  select: (e) => { },
  deselect: (e, tm) => { },
  start: (e, tm) => {
    tm.enabled = true;
    tm.undoStack.push(tm.ctx.canvas.toDataURL());
    const data = {
      tool: 'pen',
      to: cssToNormalPos(getPosFromEvent(e), tm.ctx),
      config: {
        size: tm.size,
        color: tm.bgColor,
        currentPos: cssToNormalPos(getPosFromEvent(e), tm.ctx),
        lineCap: 'round',
      }
    };
    tm.draw(data);
    tm.emit('drawing', data);
    tm.currentPos = data.to;
  },
  move: (e, tm) => {
    if (!tm.enabled) return;
    const data = {
      tool: 'pen',
      to: cssToNormalPos(getPosFromEvent(e), tm.ctx),
      config: {
        size: tm.size,
        color: tm.bgColor,
        currentPos: tm.currentPos,
        lineCap: 'round',
      }
    };
    tm.draw(data);
    tm.emit('drawing', data);
    tm.currentPos = data.to;
  },
  end: (e, tm) => { tm.enabled = false; },
  draw: (data, tm) => { },
  cursor: (e, tm) => {
    const size = tm.size / tm.getCanvasScale();
    return getRoundCursor(size, tm.bgColor);//}) ${rad} ${rad}`;
  },
  sticky: true,
})
toolManager.add('clear', {
  select: (e, tm) => {
    tm.undoStack.push(tm.ctx.canvas.toDataURL());
    const data = { tool: 'clear' };
    tm.draw(data);
    tm.emit('drawing', data);
  },
  deselect: (e, tm) => { },
  start: (e) => { },
  move: (e) => { },
  end: (e) => { },
  draw: (data, tm) => {
    tm.ctx.fillStyle = tm.bgColor;
    tm.ctx.fillRect(0, 0, tm.ctx.canvas.width, tm.ctx.canvas.height);
  },
  cursor: (e, tm) => { },
  sticky: false,
})
toolManager.add('undo', {
  select: (e, tm) => {
    const img = tm.undoStack.pop();
    const data = { tool: 'image', src: img };
    tm.draw(data);
    tm.emit('drawing', data);
  },
  deselect: (e, tm) => { },
  start: (e) => { },
  move: (e) => { },
  end: (e) => { },
  draw: (data) => { },
  cursor: (e, tm) => { },
  sticky: false,
})
toolManager.add('fill', {
  select: (e) => { },
  deselect: (e, tm) => { },
  start: (e, tm) => {
    tm.undoStack.push(tm.ctx.canvas.toDataURL());
    const data = {
      tool: 'fill',
      to: cssToNormalPos(getPosFromEvent(e), tm.ctx),
      color: tm.fgColor,
    }
    tm.draw(data);
    tm.emit('drawing', data);
  },
  move: (e) => { },
  end: (e) => { },
  draw: (data, tm) => {
    const pos = normalToCanvasPos(data.to, tm.ctx);
    const imageData = tm.ctx.getImageData(0, 0, tm.ctx.canvas.width, tm.ctx.canvas.height);
    const floodFill = new FloodFill(imageData);
    floodFill.fill(data.color, Math.round(pos[0]), Math.round(pos[1]), 10);
    tm.ctx.putImageData(floodFill.imageData, 0, 0);
  },
  cursor: (e, tm) => {
    const size = 5 / tm.getCanvasScale();
    return getRoundCursor(size, tm.fgColor);
  },
  sticky: true,
})

export default toolManager;
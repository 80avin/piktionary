import FloodFill from 'q-floodfill';

class ToolManager {
  constructor(){
    this.tools={}
    this.fgColor = '#ff0000';
    this.bgColor = '#ffffff';
    this.currentPos = [0, 0];
    this.size = 2;
    this.activeTool = null;
    this.enabled = false;
    this.undoStack=[]
  }
  init(ctx, socket) {
    this.ctx = ctx;
    this.socket = socket;
    this.fgColor = '#ff0000';
    this.bgColor = '#ffffff';
    this.currentPos = [0, 0];
    this.size = 2;
    this.activeTool = null;
    this.enabled = false;
    this.socket.on('drawing', data => this.draw(data));
    this.undoStack=[]
  }
  setProp(prop, v){
    if(!['fgColor','bgColor','size'].some(p=>p===prop)) return;
    this[prop]=v;
    if(!['fgColor','size'].some(p=>p===prop)) return;
    const cursor = this.tools[this.activeTool].cursor(undefined, this);
    if (cursor) this.ctx.canvas.style.cursor = `${cursor}, auto`
  }
  add(name, toolObject) {
    this.tools[name] = { name, ...toolObject };
  }
  select(name, e) {
    this.tools[name].select(e, this);
    if (this.tools[name].sticky) this.activeTool = name;
    this.enabled = false;
    const cursor = this.tools[name].cursor(e, this);
    if (cursor) this.ctx.canvas.style.cursor = `${cursor}, auto`
  }
  start(e) {
    // debugger
    this.tools[this.activeTool].start(e, this);
  }
  move(e) {
    this.tools[this.activeTool].move(e, this);
  }
  end(e) {
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
    if (Object.keys(this.tools).some(k=>k===data.tool)) {
      this.tools[data.tool].draw(data, this);
    }
  }
}

const toolManager = new ToolManager();
toolManager.add('pen', {
  select: (e) => { },
  deselect: (e, tm) => { },
  start: (e, tm) => { tm.enabled = true;
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
    tm.socket.emit('drawing', data);
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
    tm.socket.emit('drawing', data);
    tm.currentPos = data.to;
  },
  end: (e, tm) => { tm.enabled = false; },
  draw: (data, tm) => {
    // debugger
    tm.ctx.beginPath();
    tm.ctx.moveTo(...normalToCanvasPos(data.config.currentPos, tm.ctx));
    tm.ctx.lineTo(...normalToCanvasPos(data.to, tm.ctx));
    tm.ctx.strokeStyle = data.config.color;
    tm.ctx.lineWidth = data.config.size;
    tm.ctx.lineCap = data.config.lineCap || 'round';
    tm.ctx.stroke();
    tm.ctx.closePath();
  },
  cursor: (e, tm) => {
    const size = tm.size*tm.ctx.canvas.clientWidth/tm.ctx.canvas.width;
    return getRoundCursor(size, tm.fgColor);//}) ${rad} ${rad}`;
  },
  sticky: true,
})
toolManager.add('eraser', {
  select: (e) => { },
  deselect: (e, tm) => { },
  start: (e, tm) => { tm.enabled = true;
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
    tm.socket.emit('drawing', data);
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
    tm.socket.emit('drawing', data);
    tm.currentPos = data.to;
  },
  end: (e, tm) => { tm.enabled = false; },
  draw: (data, tm) => {},
  cursor: (e, tm) => {
    const size = tm.size*tm.ctx.canvas.clientWidth/tm.ctx.canvas.width;
    return getRoundCursor(size, tm.bgColor);//}) ${rad} ${rad}`;
  },
  sticky: true,
})
toolManager.add('clear', {
  select: (e, tm) => {
    tm.undoStack.push(tm.ctx.canvas.toDataURL());
    const data = { tool: 'clear' };
    tm.draw(data);
    tm.socket.emit('drawing', data);
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
    tm.socket.emit('drawing', data);
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
    tm.socket.emit('drawing', data);
  },
  move: (e) => { },
  end: (e) => { },
  draw: (data, tm) => {
    debugger
    const pos = normalToCanvasPos(data.to, tm.ctx);
    const imageData = tm.ctx.getImageData(0, 0, tm.ctx.canvas.width, tm.ctx.canvas.height);
    const floodFill = new FloodFill(imageData);
    floodFill.fill(tm.fgColor, Math.round(pos[0]), Math.round(pos[1]), 0);
    tm.ctx.putImageData(floodFill.imageData, 0, 0);
  },
  cursor: (e, tm) => { },
  sticky: true,
})

const getPosFromEvent = (e) => {
  if (typeof (e.pageX) !== "undefined") {
    return [
      (e.pageX) - e.target.offsetLeft - e.target.clientLeft,
      (e.pageY) - e.target.offsetTop - e.target.clientTop,
    ]
  }
  else if (e.touches) {
    return [
      (e.touches[0].pageX) - e.target.offsetLeft - e.target.clientLeft,
      (e.touches[0].pageY) - e.target.offsetTop - e.target.clientTop,
    ]
  }
}

const cssToNormalPos = (pos, ctx) => {
  return [100 * pos[0] / ctx.canvas.clientWidth, 100 * pos[1] / ctx.canvas.clientHeight];
}
const normalToCanvasPos = (pos, ctx) => {
  return [pos[0] * ctx.canvas.width / 100, pos[1] * ctx.canvas.height / 100];
}
const getRoundCursor=(size, color)=>{
  const canv = document.createElement('canvas');
  canv.width = canv.height = size;
  const ctx = canv.getContext('2d');
  const rad = Math.round(size / 2);
  ctx.arc(rad, rad, rad, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
  return `url(${canv.toDataURL()}) ${rad} ${rad}`
}


export default toolManager;
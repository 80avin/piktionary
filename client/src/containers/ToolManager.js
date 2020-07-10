class ToolManager {
  init(ctx, socket) {
    this.ctx = ctx;
    this.socket = socket;
    this.tools = {};
    this.fgColor = '#ff0000';
    this.bgColor = '#ffffff';
    this.currentPos = [0, 0];
    this.size = 2;
    this.activeTool = null;
    this.enabled = false;
    this.socket.on('drawing', data => this.draw(data));
  }

  add(name, toolObject) {
    this.tools[name] = { name, ...toolObject };
  }
  select(name, e) {
    this.tools[name].select(e, this);
    if (this.tools[name].sticky) this.activeTool = name;
    this.enabled = false;
  }
  start(e) {
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
    if (data.tool in Object.keys(this.tools)) {
      this.tools[this.activeTool].draw(data);
    }
  }
  cursor(e) {
    return this.tools[this.activeTool].cursor(e, this);
  }
}
const toolManager = new ToolManager();
toolManager.add('pen', {
  select: (e) => { },
  deselect: (e, tm) => { },
  start: (e, tm) => { tm.enabled = true; },
  move: (e, tm) => { tm.socket.emit('drawing',) },
  end: (e) => { },
  draw: (data) => { },
  cursor: (e, tm) => { },
  sticky: true,
})
toolManager.add('eraser', {
  select: (e) => { },
  deselect: (e, tm) => { },
  start: (e) => { },
  move: (e) => { },
  end: (e) => { },
  draw: (data) => { },
  cursor: (e, tm) => { },
  sticky: true,
})
toolManager.add('clear', {
  select: (e) => { },
  deselect: (e, tm) => { },
  start: (e) => { },
  move: (e) => { },
  end: (e) => { },
  draw: (data) => { },
  cursor: (e, tm) => { },
  sticky: false,
})
toolManager.add('undo', {
  select: (e) => { },
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
  start: (e) => { },
  move: (e) => { },
  end: (e) => { },
  draw: (data) => { },
  cursor: (e, tm) => { },
  sticky: true,
})

const getPosFromEvent=(e)=> {
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


export default toolManager;
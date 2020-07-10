import React, { Component } from 'react'
import Canvas from '../components/Canvas'
import { GithubPicker } from "react-color";

import {floodFill} from "./canvasUtil";

class CanvasContainer extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = null;
    this.config = {
      enabled: false,
      currentPos: [0, 0],
      color: '#ff0000',
      tool: 'line',
      size: '2',
      toolProps: { lineCap: 'round' }
    }
    this.socket = props.socket;
    this.colors = props.colors;
    this.undoStack = [];
  }
  componentDidMount() {
    this.socket.on('drawing', (data) => this.drawCanvas(data));
    this.socket.on('imageRequest', () => this.socket.emit('drawing', {
      config: { tool: 'image' },
      src: this.canvasRef.toDataURL()
    }))
    this.drawCanvas({ config: { ...this.config, tool: 'clear' } });
    window.onresize = (e) => { this.canvasRef.style.width = 'min' }
    this.socket.emit('imageRequest');
  }
  drawStart(e) {
    e.preventDefault();
    debugger
    // console.log('drawStart', { ...e });
    this.config.enabled = true;
    this.config.currentPos = this.cssToNormalPos(this.getPosFromEvent(e));
    this.undoStack.push(this.canvasRef.toDataURL());
    // this.drawCanvas({
    //   config: { ...this.config, tool: 'fill' },
    //   to: this.config.currentPos,
    // })
  }
  undoDrawing() {
    if (this.undoStack.length === 0) return;
    const imgDataURL = this.undoStack.pop();
    const data = {
      config: {
        tool: 'image'
      },
      src: imgDataURL,
    };
    this.drawCanvas(data);
    this.socket.emit('drawing', data);
  }
  drawEnd(e) {
    e.preventDefault();
    // console.log('drawEnd', { ...e });
    this.config.enabled = false;
  }
  drawMove(e) {
    e.preventDefault();
    if (!this.config.enabled) return;
    // console.log('drawMove', { ...e });

    const data = {
      config: this.config,
      to: this.cssToNormalPos(this.getPosFromEvent(e)),
    }

    if (this.config.enabled) {
      this.drawCanvas(data);
      this.socket.emit('drawing', data);
    }
    this.config = {
      ...this.config,
      currentPos: data.to
    };
  }
  getPosFromEvent(e) {
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
  drawCanvas(data,) {
    debugger
    const ctx = this.canvasRef.getContext('2d');
    switch (data.config.tool) {
      case 'line':
        ctx.beginPath();
        ctx.moveTo(...this.normalToCanvasPos(data.config.currentPos));
        ctx.lineTo(...this.normalToCanvasPos(data.to));
        for (var k of Object.keys(data.config.toolProps)) {
          ctx[k] = data.config.toolProps[k]
        }
        ctx.strokeStyle = data.config.color;
        ctx.lineWidth = data.config.size;
        ctx.stroke();
        ctx.closePath();
        break;
      case 'image':
        const img = new Image();
        img.src = data.src;
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        img.onload = () => ctx.drawImage(img, 0, 0);
        break;
      case 'fill':
        floodFill(this.normalToCanvasPos(data.to), /*this.hexToRgb*/(data.config.color), ctx);
        break;
      case 'clear':
        const tempFillStyle = ctx.fillStyle;
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.fillStyle = tempFillStyle
        break;
      default:
        break;
    }
  }
  floodFill(pos, targetColor) {
    let pixelStack = [[...pos]];
    while (pixelStack.length) {

    }
  }

  cssToNormalPos(pos) {
    return [100 * pos[0] / this.canvasRef.clientWidth, 100 * pos[1] / this.canvasRef.clientHeight];
  }
  normalToCanvasPos(pos) {
    return [pos[0] * this.canvasRef.width / 100, pos[1] * this.canvasRef.height / 100];
  }
  hexToRgb(hex) {
    return {
      r: parseInt(hex.substr(1, 2), 16),
      g: parseInt(hex.substr(3, 2), 16),
      b: parseInt(hex.substr(5, 2), 16),
    }
  }

  changeColor(color) {
    console.log({ color });
    this.config.color = color.hex;
  }

  render() {
    return (
      <>
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', backgroundColor: '#f3f3f3' }}>
          <Canvas
            setRef={inputRef => { this.canvasRef = inputRef; }}
            drawEnd={(e) => this.drawEnd(e)}
            drawMove={(e) => this.drawMove(e)}
            drawStart={(e) => this.drawStart(e)}
          />
          <GithubPicker
            color={this.config.color}
            onChangeComplete={(c) => this.changeColor(c)}
            triangle='hide'
            colors={this.colors}
          />
          <button onClick={(e) => this.undoDrawing()}>Undo</button>
        </div>
      </>
    )
  }
}
export default CanvasContainer;
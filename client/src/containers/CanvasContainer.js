import React, { Component } from 'react'
import Canvas from '../components/Canvas'
import { GithubPicker } from "react-color";
import Slider from "@material-ui/core/Slider";
import toolManager from './ToolManager'

class CanvasContainer extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = null;
    this.socket = props.socket;
    this.colors = props.colors;
  }
  componentDidMount() {
    toolManager.init(this.canvasRef.getContext('2d'), this.socket);
    toolManager.select('pen');
    toolManager.draw({ tool: 'clear' });
    this.socket.on('imageRequest', () =>
      this.socket.emit('drawing', {
        tool: 'image',
        src: this.canvasRef.toDataURL()
      }))
    // window.onresize = (e) => { this.canvasRef.style.width = 'min' } // TODO
    this.socket.emit('imageRequest');
  }
  drawStart(e) {
    e.preventDefault();
    toolManager.start(e);
    // console.log('drawStart', { ...e });
  }
  undoDrawing() {
    toolManager.select('undo');
  }
  drawEnd(e) {
    e.preventDefault();
    toolManager.end(e);
    // console.log('drawEnd', { ...e });
  }
  drawMove(e) {
    e.preventDefault();
    toolManager.move(e);
  }

  changeColor(color) {
    console.log({ color });
    toolManager.fgColor = color.hex
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
            color={toolManager.fgColor}
            onChangeComplete={(c) => toolManager.setProp('fgColor', c.hex)}
            triangle='hide'
            colors={this.colors}
          />
          <Slider
            defaultValue={toolManager.size}
            onChange={(e, v) => toolManager.setProp('size', v)}
            step={1}
            min={2}
            max={30}
            track={false}
            valueLabelDisplay='auto'
            style={{ width: '150px' }}
          />
          <div>
            <input type='button' onClick={e=>toolManager.select(e.target.value)} value='pen'/>
            <input type='button' onClick={e=>toolManager.select(e.target.value)} value='clear'/>
            <input type='button' onClick={e=>toolManager.select(e.target.value)} value='eraser'/>
            <input type='button' onClick={e=>toolManager.select(e.target.value)} value='fill'/>
            <input type='button' onClick={e=>toolManager.select(e.target.value)} value='undo'/>
          </div>
        </div>
      </>
    )
  }
}
export default CanvasContainer;
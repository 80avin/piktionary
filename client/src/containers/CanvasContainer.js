import React, { Component } from 'react'
import Canvas from '../components/Canvas'
import { GithubPicker } from "react-color";
import Slider from "@material-ui/core/Slider";
import toolManager from './ToolManager'
import ToolButtons from '../components/ToolButtons';

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

  sizeChange(e){
    e.preventDefault();
    const size = toolManager.size - Math.floor(e.deltaY/53*3);
    toolManager.setProp('size',Math.min(50, Math.max(5, size)));
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
            sizeChange={(e)=>this.sizeChange(e)}
          />
          <Slider
            defaultValue={toolManager.size}
            onChange={(e, v) => toolManager.setProp('size', v)}
            step={1}
            min={5}
            max={40}
            track={false}
            valueLabelDisplay='auto'
            style={{ width: '150px' }}
          />
          <ToolButtons toolManager={toolManager} colors={[
              '#B80000', '#DB3E00', '#FCCB00', '#008B02', '#006B76', '#1273DE', '#004DCF', '#5300EB',
              '#EB9694', '#FAD0C3', '#FEF3BD', '#C1E1C5', '#BEDADC', '#C4DEF6', '#BED3F3', '#D4C4FB',
              '#000000', '#222222', '#444444', '#666666', '#999999', '#bbbbbb', '#dddddd', '#ffffff',
            ]} />
        </div>
      </>
    )
  }
}
export default CanvasContainer;
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Canvas from '../../components/Canvas';
import toolManager from './../ToolManager';
import ToolButtons from '../../components/ToolButtons';
import SizeSlider from '../../components/SizeSlider';
import NetworkManager from '../../services/NetworkManager';
import ToolButtonGroup from '../../components/ToolButtonGroup';
import ColorPickerButton from '../../components/ColorPickerButton';
import BrushSizeButton from '../../components/BrushSizeButton';


import "./style.css"
import { ArtistSelector, amIArtist } from '../../store/reducers/game';

class CanvasContainer extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = null;
    this.socket = NetworkManager.getSocket();
    this.colors = props.colors;
  }
  componentDidMount() {
    toolManager.init(this.canvasRef.getContext('2d',{alpha:false}), this.socket);
    toolManager.select('pen');
    toolManager.draw({ tool: 'clear' });
    this.socket.on('imageRequest', () =>
      this.socket.emit('drawing', {
        tool: 'image',
        src: this.canvasRef.toDataURL()
      }))
    this.socket.emit('imageRequest');
  }
  drawStart(e) {
    // e.preventDefault();
    toolManager.start(e);
    // console.log('drawStart', { ...e });
  }
  undoDrawing() {
    toolManager.select('undo');
  }
  drawEnd(e) {
    // e.preventDefault();
    toolManager.end(e);
    // console.log('drawEnd', { ...e });
  }
  drawMove(e) {
    e.preventDefault();
    toolManager.move(e);
  }

  sizeChange(e) {
    e.preventDefault();
    const size = toolManager.size - Math.floor(e.deltaY / 53 * 3);
    toolManager.setProp('size', Math.min(50, Math.max(5, size)));
  }
  render() {
    if (false)
      return (
        <>
          {/* <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', flexDirection: 'column', position:'relative', }}> */}
          <div style={{/*flexGrow:'1',*/display: 'flex', width: '100%', height: '100%' }}>
            <Canvas
              setRef={inputRef => { this.canvasRef = inputRef; }}
              drawEnd={(e) => this.drawEnd(e)}
              drawMove={(e) => this.drawMove(e)}
              drawStart={(e) => this.drawStart(e)}
              sizeChange={(e) => this.sizeChange(e)}
            />
          </div>
          <div>
            <SizeSlider
              defaultValue={toolManager.size}
              onChangeCommitted={(e, v) => toolManager.setProp('size', v)}
              step={1}
              min={5}
              max={50}
              track={false}
              canvasScale={() => toolManager.getCanvasScale()}
            />
            <ToolButtons toolManager={toolManager} />
          </div>
          {/* </div> */}
        </>
      );
    return (
      <div className="canvas-window">
        {
          this.props.amIArtist ?
            (<ToolButtonGroup toolManager={toolManager} className="drawing-tools" />) :
            (<div className="drawing-tools"></div>)
        }
        <div className="canvas-div">
          <Canvas
            setRef={inputRef => { this.canvasRef = inputRef; }}
            drawEnd={(e) => this.drawEnd(e)}
            drawMove={(e) => this.drawMove(e)}
            drawStart={(e) => this.drawStart(e)}
            sizeChange={(e) => this.sizeChange(e)}
          />
        </div>
        <div className="drawing-subtools">
          {
            this.props.amIArtist ?
              (<>
                <ColorPickerButton toolManager={toolManager} />
                <BrushSizeButton toolManager={toolManager} />
              </>) :
              (<></>)
          }
        </div>
      </div>
    )
  }
}

CanvasContainer.propTypes = {
  // prop: PropTypes
}

const mapStateToProps = (state) => ({
  // artist:ArtistSelector(state),
  amIArtist: amIArtist(state),
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(CanvasContainer)


// export default CanvasContainer;
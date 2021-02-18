import React, { Component, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import PopperButton from '../PopperButton'
import GradColorPicker from '../GradColorPicker'
import toolManager from '../../containers/ToolManager'
import SizeSlider from '../SizeSlider'

export const BrushSizeButton = (props) => {
  const [size, setSize] = useState(toolManager.size);

  const changeSize = (c, commit = true) => {
    if (commit) props.toolManager.setProp('size', c);
    setSize(c)
  }
  useEffect(() => {
    setSize(props.toolManager.size)
  }, [props.toolManager.size])
  // const cssSize = toolManager.size
  console.log('btn')
  const buttonBody = () => (
    <div
      style={{
        width: '100%',
        height: '100%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
      }}>
      <svg width={(toolManager.size/toolManager.getCanvasScale())+'px'} className="siz" viewBox="0 0 100 100">
        <defs>
          <radialGradient id="grad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">

            <stop offset="0%" style={{stopColor:'rgb(50,50,50)',stopOpacity:'1'}}></stop>
            <stop offset="100%" style={{stopColor:'rgb(0,0,0)',stopOpacity:'1'}}></stop>
          </radialGradient>
        </defs>
        <circle className='cir' cx='50' cy='50' r='50' ></circle>
      </svg>
    </div>
  )
  const popperBody = () => (
    <div style={{ position: 'relative', width: '250px', height: '40px' }}>
      <SizeSlider
        // defaultValue={toolManager.size}
        value={toolManager.size}
        onChangeCommitted={(e, v) => changeSize(v)/*toolManager.setProp('size', v)*/}
        step={1}
        min={5}
        max={50}
        track={false}
        canvasScale={() => toolManager.getCanvasScale()}
      />
    </div>
  )
  return (
    <PopperButton
      buttonProps={{}}
      buttonBody={buttonBody()}
      popperProps={{}}
      popperBody={popperBody()}
    />
  )
}

BrushSizeButton.propTypes = {
  // prop: PropTypes
  toolManager: PropTypes.object,
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(BrushSizeButton)

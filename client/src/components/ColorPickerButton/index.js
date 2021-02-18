import React, { Component, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import PopperButton from '../PopperButton'
import GradColorPicker from '../GradColorPicker'
import toolManager from '../../containers/ToolManager'
import GridColorPicker from '../GridColorPicker'

export const ColorPickerButton = (props) => {
  const [selectedColor, setSelectedColor] = useState('#ff0000');
  const setColor = (e) => {
    let v = parseInt(e.currentTarget.value);
    v = Math.max(0, Math.min(15, v));
    let v1 = v.toString(16);
    let v2 = (15 - v).toString(16);
    setSelectedColor('#' + v1 + v1 + v2 + v2 + v1 + v1);
  }
  const changeColor = (c, commit = true) => {
    if (commit) props.toolManager.setProp('fgColor', c.color);
    // setSelectedColor(props.toolManager.fgColor)
    setSelectedColor(c.color)
  }
  useEffect(() => {
    setSelectedColor(props.toolManager.fgColor)
  }, [props.toolManager.fgColor])
  const buttonBody = () => (
    <div
      style={{
        width: '100%',
        height: '100%',
        border: `5px solid white`,
        borderRadius: '50%',
        boxSizing: 'border-box',
        backgroundColor: selectedColor
      }}>
    </div>
  )
  const popperBody = () => (
    <div style={{ position: 'relative', width: '50px', height: '100px' }}>
      <input type='range' min='0' max='15' onChange={setColor}
        style={{
          transform: 'rotate(270deg) translateX(-100%)',
          position: 'absolute',
          left: '0',
          top: '0',
          transformOrigin: 'top left',
          width: '100px'
        }} />
    </div>
  )
  const gradPicker = () => (
    <div style={{ position: "relative", width: '250px' }}>
      {/* <GradColorPicker */}
      <GridColorPicker
        onChange={(color) => changeColor(color,false)}
        onChangeComplete={(color) => changeColor(color,true)} />
    </div>
  )
  return (
    <PopperButton
      buttonProps={{}}
      buttonBody={buttonBody()}
      popperProps={{}}
      popperBody={gradPicker()}
    />
  )
}

ColorPickerButton.propTypes = {
  // prop: PropTypes
  toolManager:PropTypes.object,
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(ColorPickerButton)

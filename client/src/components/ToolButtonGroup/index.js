import React, { Component, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { ReactComponent as ClearIcon } from './assets/delete.svg';
import { ReactComponent as EraserIcon } from './assets/eraser.svg';
import { ReactComponent as FillIcon } from './assets/fill.svg';
import { ReactComponent as PenIcon } from './assets/pen.svg';
import { ReactComponent as UndoIcon } from './assets/undo.svg';

import "./style.css"

export const ToolButtonGroup = (props) => {
  const [activeTool, setactiveTool] = useState(props.toolManager.activeTool);
  const [fgColor, setFgColor] = useState(props.toolManager.fgColor)
  const handleChange = (e, v) => {
    v=e.currentTarget.value;
    // console.log({...e})
    props.toolManager.select(v);
    setactiveTool(props.toolManager.activeTool)
  }
  const changeColor = (c, commit = true) => {
    if (commit) props.toolManager.setProp('fgColor', c.color);
    // setFgColor(props.toolManager.fgColor)
    setFgColor(c.color)
  }
  useEffect(() => {
    setactiveTool(props.toolManager.activeTool);
    console.log('activetool hook');
  }, [props.toolManager.activeTool])
  useEffect(() => {
    setFgColor(props.toolManager.fgColor)
  }, [props.toolManager.fgColor])
  return (
    <div className={'toolButtonGroup ' + props.className || ''}>
      <button className={"toolButton "+(activeTool==='pen'?'selected':'')} value="pen" onClick={handleChange}>
        <PenIcon />
      </button>
      <button className={"toolButton "+(activeTool==='eraser'?'selected':'')} value="eraser" onClick={handleChange}>
        <EraserIcon />
      </button>
      <button className={"toolButton "+(activeTool==='fill'?'selected':'')} value="fill" onClick={handleChange}>
        <FillIcon />
      </button>
      <button className={"toolButton "+(activeTool==='undo'?'selected':'')} value="undo" onClick={handleChange}>
        <UndoIcon />
      </button>
      <button className={"toolButton "+(activeTool==='clear'?'selected':'')} value="clear" onClick={handleChange}>
        <ClearIcon />
      </button>
    </div>
  )
}

ToolButtonGroup.propTypes = {
  className: PropTypes.string,
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(ToolButtonGroup)

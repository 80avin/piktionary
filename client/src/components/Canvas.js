import React from 'react'
import PropTypes from 'prop-types'

const Canvas = props => {
  return (
    <canvas width='500' height='500'
      ref={props.setRef}
      onMouseDown={props.drawStart}
      onMouseUp={props.drawEnd}
      onMouseOut={props.drawEnd}
      onMouseMove={props.drawMove}

      onTouchStart={props.drawStart}
      onTouchEnd={props.drawEnd}
      onTouchCancel={props.drawEnd}
      onTouchMove={props.drawMove}

      style={{ width:'min(100vw,100vh)',height:'min(100vw,100vh)',border: '0px solid black', touchAction: 'none', backgroundColor:'white' }}
    />
  )
}

Canvas.propTypes = {
  setRef: PropTypes.func.isRequired,
  drawStart: PropTypes.func.isRequired,
  drawEnd: PropTypes.func.isRequired,
  drawMove: PropTypes.func.isRequired,
}

export default Canvas
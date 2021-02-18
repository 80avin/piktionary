import React from 'react'
import PropTypes from 'prop-types'

const Canvas = props => {
  const setRef = (ref) => {
    if (!ref) return;
    ref.addEventListener('wheel', props.sizeChange, { passive: false });
    props.setRef(ref);
  }
  return (
    <canvas width='1000' height='1000'
      ref={setRef}
      onMouseDown={props.drawStart}
      onMouseUp={props.drawEnd}
      onMouseOut={props.drawEnd}
      onMouseMove={props.drawMove}

      onTouchStart={props.drawStart}
      onTouchEnd={props.drawEnd}
      onTouchCancel={props.drawEnd}
      onTouchMove={props.drawMove}

      style={{
        touchAction: 'pinch-zoom',
        backgroundColor: 'white',
        borderRadius: '5px',
        margin: '0 auto',
        maxWidth: '100%', // 'calc( 100% - 4px )',
        maxHeight:'100%',
      }}
    />
  )
}

Canvas.propTypes = {
  setRef: PropTypes.func.isRequired,
  drawStart: PropTypes.func.isRequired,
  drawEnd: PropTypes.func.isRequired,
  drawMove: PropTypes.func.isRequired,
  sizeChange: PropTypes.func.isRequired,
}

export default Canvas
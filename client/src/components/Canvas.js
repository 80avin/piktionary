import React from 'react'
import PropTypes from 'prop-types'

const Canvas = props => {
  const setRef=(ref)=>{
    if(!ref) return;
    ref.addEventListener('wheel',props.sizeChange,{passive:false});
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

      // onWheelC={props.sizeChange}

      style={{ width:'min(70vw,70vh)',height:'min(70vw,70vh)',border: '0px solid black', touchAction: 'pinch-zoom', backgroundColor:'white' }}
    />
  )
}

Canvas.propTypes = {
  setRef: PropTypes.func.isRequired,
  drawStart: PropTypes.func.isRequired,
  drawEnd: PropTypes.func.isRequired,
  drawMove: PropTypes.func.isRequired,
  sizeChange : PropTypes.func.isRequired,
}

export default Canvas
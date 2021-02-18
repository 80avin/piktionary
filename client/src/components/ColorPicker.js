import React, { useState, useRef, useEffect } from 'react'
import { getPosFromEvent, rgbToHex } from "../utils/canvasutils";
import PropTypes from 'prop-types'

const ColorPicker = props => {
  const [color, setColor] = useState(props.color || 'red');
  const defaultColor = props.color || '#ff0000';
  const [prevColors, setPrevColors] = useState([defaultColor, ...(new Array(7).fill('white'))]);
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d',{alpha:false});
    // const ctx = new CanvasRenderingContext2D()
    const colorWidth = 30;
    const grad = ctx.createLinearGradient(0,0,8*colorWidth, 0);
    [0,1,2,3,4,5,6].forEach(i=>grad.addColorStop((i/8.0), `hsl(${(i*60.0)}, 100%, 50%)`));
    grad.addColorStop(7/8.0, `hsl(0,100%,100%)`)    // white
    grad.addColorStop(8/8.0, `hsl(0,100%,0%)`)      // black
    ctx.fillStyle = grad;
    ctx.fillRect(0,0,8*colorWidth, 20);
    ctx.strokeStyle='##ffffff';
    ctx.moveTo(0,21);
    ctx.lineTo(8*colorWidth,21);
    ctx.stroke();
    drawColorHistory()
    return () => {
      
    }
  }, []);
  useEffect(()=>{
    drawColorHistory()
  }, [prevColors])
  const drawColorHistory=()=>{
    const ctx = canvasRef.current.getContext('2d',{alpha:false});
    prevColors.forEach((c,i)=>{
      ctx.beginPath();
      ctx.fillStyle=c;
      ctx.strokeStyle='grey';
      // ctx.strokeRect(i*30,20,30,30);
      ctx.fillRect(i*30,20,30,30);
      // ctx.endPa  th();
    })
  }
  const selectColor=(e)=>{
    console.log({...e})
    console.log(getPosFromEvent(e))
    const ctx = canvasRef.current.getContext('2d',{alpha:false});
    // const ctx = new CanvasRenderingContext2D();

    const pixelData = ctx.getImageData(...getPosFromEvent(e),1,1);
    const [r,g,b,a] = pixelData.data;
    console.log({r,g,b,a})
    const selectedColor = rgbToHex(r,g,b);
    if(typeof(props.onChangeComplete)==='function')
    props.onChangeComplete({hex:selectedColor});
    updateColorHistory(selectedColor);
    // setColor(selectedColor);
  }
  const updateColorHistory = c =>{
    if(c===prevColors[0]) return;
    const _prevColors = [...prevColors];
    _prevColors.pop();
    _prevColors.unshift(c);
    setPrevColors(_prevColors);
  }

  return (
    <div style={{borderRadius:'5px',width:'fit-content', backgroundColor:'white',border:'1px solid grey'}}>
      <canvas 
      style={{margin:'10px', border:'0px solid black'}} 
      ref={canvasRef} 
      width='240' 
      height='50' 
      onMouseUp={e=>selectColor(e)} onTouchEnd={e=>selectColor(e)}/>
    </div>
  )
}

ColorPicker.propTypes = {

}

export default ColorPicker

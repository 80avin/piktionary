import React, { useRef, useEffect } from 'react'

const Canvas = () => {
  const canvasRef = useRef(null);
  const ctxRef = useRef();
  const configRef = useRef();
  useEffect(() => {
    const canvas = canvasRef.current;
    ctxRef.current = canvas.getContext('2d');
    configRef.current = {
      enabled: false,
      currentPos: [0, 0],
      color: '#ff0000',
      tool: 'line',
      size: '20',
      toolProps:{lineCap:'round'}
    }
    console.log(canvasRef, canvasRef.current);
  });

  const drawStart = (e) => {
    e.preventDefault();
    console.log('drawStart', {...e})
    configRef.current.enabled = true;
    configRef.current.currentPos=cssToNormalPos(getPosFromEvent(e));
    // console.log(configRef)
  }
  const drawEnd = (e) => {
    e.preventDefault();
    console.log('drawEnd', { ...e });
    configRef.current.enabled = false;
  }
  const drawMove = (e) => {
    e.preventDefault();
    if(!configRef.current.enabled) return;
    // console.log('drawMove', { ...e });
    const targetPos = cssToNormalPos(getPosFromEvent(e));
    
    const data = {
      config: configRef.current,
      to: targetPos,
    }

    if (configRef.current.enabled) {
      drawCanvas(data);
      // sendDraw(data);
    }
    configRef.current = {
      ...configRef.current,
      currentPos: data.to
    };
  }

  const getPosFromEvent = (e)=>{
    if( typeof(e.pageX)!=="undefined"){
      return [
        (e.pageX) - e.target.offsetLeft - e.target.clientLeft,
        (e.pageY) - e.target.offsetTop - e.target.clientTop,
      ]
    }
    else if(e.touches){
      return [
        (e.touches[0].pageX) - e.target.offsetLeft - e.target.clientLeft,
        (e.touches[0].pageY) - e.target.offsetTop - e.target.clientTop,
      ]
    }
  }
  const cssToNormalPos = (pos) => [100*pos[0]/canvasRef.current.clientWidth, 100*pos[1]/canvasRef.current.clientHeight];
  const normalToCanvasPos = (pos)=> [pos[0]*canvasRef.current.width/100, pos[1]*canvasRef.current.height/100];

  const drawCanvas = (data,) => {
    console.log({ data }, ctxRef);
    const ctx = ctxRef.current;
    // debugger
    switch (data.config.tool) {
      case 'line':
        ctx.beginPath();
        ctx.moveTo(...normalToCanvasPos(data.config.currentPos));
        ctx.lineTo(...normalToCanvasPos(data.to));
        for(var k of Object.keys(data.config.toolProps)){
          ctx[k]=data.config.toolProps[k]
        }
        ctx.strokeStyle=data.config.color;
        ctx.lineWidth=data.config.size;
        ctx.stroke();
        ctx.closePath();
        break;
      default:
        break;
    }
  }
  const floodFill = (pos, targetColor)=>{
    let pixelStack = [[...pos]];
    while(pixelStack.length){
      
    }
  }
  return (
      <canvas ref={canvasRef} width='500' height='500'
        onMouseDown={drawStart}
        onMouseUp={drawEnd}
        onMouseOut={drawEnd}
        onMouseMove={drawMove}

        onTouchStart={drawStart}
        onTouchEnd={drawEnd}
        onTouchCancel={drawEnd}
        onTouchMove={drawMove}

        style={{border:'1px solid black', touchAction:'none'}}
      />
  );
}

export default Canvas

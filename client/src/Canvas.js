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
      size: '2',
    }
    console.log(canvasRef, canvasRef.current);
  })

  const drawStart = (e) => {
    console.log('drawStart', {...e})
    configRef.current.enabled = true;

  }
  const drawEnd = (e) => {
    console.log('drawEnd', { ...e })
    configRef.current.enabled = false;
  }
  const drawMove = (e) => {
    // console.log('drawMove', { ...e });
    const targetPos = [e.clientX || e.touches[0].clientX, e.clientY || e.touches[0].clientY];
    targetPos[0]= targetPos[0]-e.target.offsetLeft;
    targetPos[1]= targetPos[1]-e.target.offsetTop;
    
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

  const drawCanvas = (data,) => {
    console.log({ data }, ctxRef);
    const ctx = ctxRef.current;
    // debugger
    switch (data.config.tool) {
      case 'line':
        ctx.beginPath();
        ctx.moveTo(...data.config.currentPos);
        ctx.lineTo(...data.to);
        ctx.strokeStyle=data.config.color;
        ctx.lineWidth=data.config.size;
        ctx.stroke();
        ctx.closePath();
        break;
      default:
        break;
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

        style={{border:'1px solid black'}}
      />
  );
}

export default Canvas

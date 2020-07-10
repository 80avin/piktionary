import React, { useRef, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client'
import CanvasContainer from './containers/CanvasContainer';

function App() {
  const socket = io(prompt('Enter room code', '/room'));
  return (
    <div>
      <CanvasContainer
        socket={socket}
        colors={[
          '#B80000', '#DB3E00', '#FCCB00', '#008B02', '#006B76', '#1273DE', '#004DCF', '#5300EB',
          '#EB9694', '#FAD0C3', '#FEF3BD', '#C1E1C5', '#BEDADC', '#C4DEF6', '#BED3F3', '#D4C4FB',
          '#000000', '#222222', '#444444', '#666666', '#999999', '#bbbbbb', '#dddddd', '#ffffff',
        ]} />
    </div>
  )
}

export default App;

import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import { colorFromGradPicker } from '../utils/canvasutils';

function ValueLabelComponent(props) {
  const { value } = props;
  return (
    <div title={value} style={{ height: 30, width: 30, color: colorFromGradPicker(value) }} >
      {props.children}
    </div>
  );
}
const grad = [
  ...[0, 1, 2, 3, 4, 5, 6].map(i => 'hsl(' + (i * 60) + ',100%,50%)'),
  '#ffffff',
  '#000000'
].join(',');

const gradBoxShadow =
  '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)';

const GradSlider = withStyles({
  root: {
    color: 'rgba(0,0,0,0)',
    background: 'linear-gradient(90deg, ' + grad + ')',
    height: 0,
    padding: '10px 0',
    borderRadius: '10px'
  },
  thumb: {
    height: 24,
    width: 24,
    border: '2px solid grey',
    boxShadow: gradBoxShadow,
    marginTop: -12,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        boxShadow: gradBoxShadow,
      },
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 12px)',
    top: -22,
  },
  rail: {
    height: 2,
    opacity: 0,
    backgroundColor: '#bfbfbf',
  },
})(Slider);

const GradColorPicker = props => {
  const [previousColors, setPreviousColors] = useState([
    { value: 0, color: '#ff0000' },
    { value: 60, color: '#ffff00' },
    { value: 120, color: '#00ff00' },
    { value: 180, color: '#00ffff' },
    { value: 240, color: '#0000ff' },
    { value: 300, color: '#ff00ff' },
    { value: 360, color: '#ff0000' },
    { value: 420, color: '#ffffff' },
    { value: 480, color: '#000000' },
  ]);
  const [colorValue, setColorValue] = useState(0)
  const gradSliderRef = useRef(null);

  const selectColorValue = (value, commit = true) => {
    // console.log(gradSliderRef.current)
    const color = colorFromGradPicker(value);
    setColorValue(value);
    if (commit) {

      const idx = previousColors.findIndex(el => el.value === value);
      let _pc = [...previousColors];
      if (idx === -1) {
        _pc.unshift({ color, value });
        while (_pc.length > 9) _pc.pop();
      }
      else {
        _pc.splice(idx, 1);
        _pc.unshift({ color, value });
      }
      setPreviousColors(_pc);
      props.onChangeComplete({ color, value });
    }
    else {
      props.onChange({ color, value });
    }
  }
  return (
    <div style={{ padding: '5px', borderRadius: '5px', backgroundColor: 'white', height: 'fit-content' }}>
      <GradSlider
        value={colorValue}
        ref={gradSliderRef}
        onChange={(e, c) => selectColorValue(c, false)}
        onChangeCommitted={(e, c) => selectColorValue(c, true)}
        aria-label="gradient slider"
        valueLabelDisplay='on'
        // defaultValue={0}
        min={0}
        max={480}
        ValueLabelComponent={ValueLabelComponent}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        {previousColors.map((el,i) => {
          return <button key={i} className="recent-color-buttons" style={{ backgroundColor: el.color }} onClick={e => selectColorValue(el.value)} ></button>
        })}
      </div>

    </div>
  )
}

GradColorPicker.propTypes = {
  onChange: PropTypes.func.isRequired,
  onChangeComplete: PropTypes.func.isRequired,
}

export default GradColorPicker

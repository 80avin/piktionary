import React from 'react'
import PropTypes from 'prop-types'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import {colorFromGradPicker} from '../utils/canvasutils';

function ValueLabelComponent(props) {
  const {value} = props;
  return (
    <div title={value} style={{height:30, width:30,color:colorFromGradPicker(value)}} >
      {props.children}
    </div>
  );
}
const grad = [
  ...[0,1,2,3,4,5,6].map(i=>'hsl('+(i*60)+',100%,50%)'),
  '#ffffff',
  '#000000'
].join(',');

const gradBoxShadow =
  '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)';

const GradSlider = withStyles({
  root: {
    color: 'rgba(0,0,0,0)',
    background:'linear-gradient(90deg, '+grad+')',
    height: 0,
    padding: '15px 0',
    borderRadius:'15px'
  },
  thumb: {
    height: 34,
    width: 34,
    border:'2px solid grey',
    boxShadow: gradBoxShadow,
    marginTop: -17,
    marginLeft: -17,
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
  mark: {
    backgroundColor: '#bfbfbf',
    height: 8,
    width: 1,
    marginTop: -3,
  },
  markActive: {
    opacity: 1,
    backgroundColor: 'currentColor',
  },
})(Slider);

const GradColorPicker = props => {
  return (
    <div>
    <GradSlider onChange={(e,c)=>props.onChangeComplete({hex:colorFromGradPicker(c)})} aria-label="ios slider" valueLabelDisplay='on' defaultValue={0} min={0} max={480} ValueLabelComponent={ValueLabelComponent}/>
    </div>
  )
}

GradColorPicker.propTypes = {

}

export default GradColorPicker

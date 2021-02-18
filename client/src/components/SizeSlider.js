import React from "react";
import PropTypes from "prop-types";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import Popper from "@material-ui/core/Popper";

function PP(props) {
  const { anchorEl, open, popperOptions, value } = props;
  return (
    <Popper
      transition={props.transition}
      placement={props.placement}
      className={props.className}
      popperOptions={popperOptions}
      anchorEl={anchorEl}
      open={open}
    >
      <div
        style={{
          marginBottom: "5px",
          padding:'5px',
          borderRadius: "50% 50% 50% 0",
          backgroundColor: "#909090",
          transform:'rotate(-45deg)',
        }}
      >
        <div style={{
          width:`${value/props.canvasScale()}px`,
          height:`${value/props.canvasScale()}px`,
          borderRadius:'50%',
          backgroundColor:'white',
          }}></div>
      </div>
    </Popper>
  );
}
function ValueLabelComponent(props) {
  const { children, open, value, canvasScale } = props;
  return (
    <Tooltip
      PopperComponent={PP}
      PopperProps={{ value, canvasScale }}
      open={open}
      enterTouchDelay={0}
      placement="top"
      style={{backgroundColor:'transparent'}}
    >
      {children}
    </Tooltip>
  );
}

ValueLabelComponent.propTypes = {
  children: PropTypes.element.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.number.isRequired,
  canvasScale: PropTypes.func.isRequired,
};

const SliderWithoutFocusEffect = withStyles({
  thumb: {
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    "&:focus, &:hover, &:active": {
      boxShadow: "none",
      '@media (hover: none)': {
        boxShadow: 'none',
      },
    }
  },
})(Slider);

const SizeSlider = props => {
  return (
      <SliderWithoutFocusEffect
        ValueLabelComponent={(props2)=><ValueLabelComponent {...props2} canvasScale={props.canvasScale}/>}
        ThumbComponent={'p'}
        defaultValue={props.defaultValue}
        onChangeCommitted={props.onChangeCommitted}
        step={props.step}
        min={props.min}
        max={props.max}
        track={props.track}
        valueLabelDisplay='auto'
        style={{width:'90%'}}
      />
  )
}

SizeSlider.propTypes = {
  // defaultValue:PropTypes.number.isRequired,
  onChangeCommitted:PropTypes.func.isRequired,
  step:PropTypes.number.isRequired,
  min:PropTypes.number.isRequired,
  max:PropTypes.number.isRequired,
  track:PropTypes.bool.isRequired,
  canvasScale:PropTypes.func.isRequired,
  // valueLabelDisplay='auto'
  // style={{ width: '150px' }}

}

export default SizeSlider

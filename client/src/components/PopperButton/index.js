import React, { Component, useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { usePopper } from 'react-popper';

import './style.css'

export const PopperButton = (props) => {
  const [popperOpened, setPopperOpened] = useState(false);
  const buttonRef = useRef(null);
  const popperRef = useRef(null);
  const pp = usePopper(buttonRef.current, popperRef.current, {
    placement: "left",
    strategy:"fixed",
    modifiers: [
      {
        name: "offset",
        options: { offset: [0, -1] }
      },
      // {
      //   name: "arrow",
      //   options: { element: arrowRef.current }
      // }
    ]
  });
  const closePopperIfOutside = (e) => {
    // console.debug(e)
    if (!popperRef.current) return;
    else if (
      !popperRef.current.contains(e.target) &&
      !buttonRef.current.contains(e.target)
    ) {
      setPopperOpened(false);
      // e.preventDefault();
    }
  }

  useEffect(() => {
    if (popperOpened && popperRef.current) {
      document.body.addEventListener('mousedown', closePopperIfOutside, {capture:false})
      document.body.addEventListener('touchstart', closePopperIfOutside)
    }
    return () => {
      document.body.removeEventListener('mousedown', closePopperIfOutside);
      document.body.removeEventListener('touchstart', closePopperIfOutside);
    }
  }, [popperOpened])
  // console.debug(pp)
  return (
    <div data-placement={pp.state && pp.state.placement} className="popperButton">
      <button
        data-open={popperOpened}
        ref={buttonRef}
        {...props.buttonProps}
        onClick={() => { setPopperOpened(!popperOpened); pp.update && pp.update() }}
      >{props.buttonBody}</button>
      <div className="popperEl" {...props.popperProps} ref={popperRef} style={{ ...pp.styles.popper, display: (popperOpened ? '' : 'none') }} >
        {props.popperBody}
      </div>
    </div>
  )
}

PopperButton.propTypes = {
  buttonProps: PropTypes.object,
  buttonBody: PropTypes.node,
  popperProps: PropTypes.object,
  popperBody: PropTypes.node,
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(PopperButton)

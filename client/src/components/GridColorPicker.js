import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const krazy_colors = [
  '#000000', '#FFFFFF', '#FFE210', '#FEE976', '#FFE0A7', '#F3B385', '#F48830', '#E26D5C', '#E84139', '#472D30',
  '#723D47', '#D79EAD', '#C0A8C0', '#D1C0D0', '#CDDDDA', '#A2C2CD', '#8FB0CF', ''
]

const colors = [
  '#000000', '#575757', '#A0A0A0', '#FFFFFF',
  '#2A4BD7', '#1D6914', '#814A19', '#8126C0',
  '#9DAFFF', '#81C57A', '#E9DEBB', '#AD2323',
  '#29D0D0', '#FFEE33', '#FF9233', '#FFCDF3',
]

export const GridColorPicker = (props) => {
  const selectColor = (color, commit = true) => {
    if (commit) {
      props.onChangeComplete({ color });
    }
    else {
      props.onChange({ color })
    }
  }
  return (
    <div style={{
      padding: '5px', borderRadius: '5px', backgroundColor: 'white', height: 'fit-content',
      display: 'inline-grid',
      // gridTemplateColumns: 'repeat(4, auto)',
      gridTemplateRows: 'repeat(4, auto)',
      gridGap: '5px',
      gridAutoFlow: 'column',
    }}>
      {colors.map(c => (
        <button
          key={c}
          onClick={e => selectColor(c)}
          className="recent-color-buttons"
          style={{ backgroundColor: c, width: '28px', height: '28px' }}
          value={c}
          name="color"></button>
      ))}
    </div>
  )
}

GridColorPicker.propTypes = {
  onChange: PropTypes.func.isRequired,
  onChangeComplete: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(GridColorPicker)

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Paper from '@material-ui/core/Paper'

export const CommentsBox = (props) => {
  return (
    <Paper className="comments-box" elevation={3} variant="outlined" style={{borderRadius:'10px',margin:'5px 0', color: 'green', overflowY: 'scroll', width: '100%', minHeight: '50px', /*padding:'2px 5px'*/ }}>
      <p>
        Falaana : guessed the word
        </p><p>
        Falaana-2 : liked
        </p>
    </Paper>
  )
}

CommentsBox.propTypes = {
  // prop: PropTypes
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentsBox)

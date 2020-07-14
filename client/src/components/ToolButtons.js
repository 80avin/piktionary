import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab'
import { GithubPicker } from 'react-color'
import ColorPicker from './ColorPicker'
import GradColorPicker from './GradColorPicker'

const ToolButtons = props => {
  const [activeTool, setactiveTool] = useState(props.toolManager.activeTool);
  const [fgColor, setFgColor] = useState(props.toolManager.fgColor)
  const handleChange = (e, v) => {
    props.toolManager.select(v);
    setactiveTool(props.toolManager.activeTool)
  }
  const changeColor = (c) => {
    props.toolManager.setProp('fgColor', c.hex);
    setFgColor(props.toolManager.fgColor)
  }
  useEffect(() => {
    setactiveTool(props.toolManager.activeTool);
  }, [props.toolManager.activeTool])
  useEffect(() => {
    setFgColor(props.toolManager.fgColor)
  }, [props.toolManager.fgColor])
  return (
    <div>
      <GithubPicker
        color={fgColor}
        onChangeComplete={changeColor}
        triangle='hide'
        colors={props.colors}
      />
      <ColorPicker
      onChangeComplete={changeColor}/>
      <GradColorPicker 
      onChangeComplete={changeColor} />
      <ToggleButtonGroup exclusive value={activeTool} onChange={handleChange} color="secondary" variant='outlined'>
        <ToggleButton value='pen' aria-label='pen'>
          <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M 14.5833 29.1667 C 11.125 29.1667 8.33334 31.9583 8.33334 35.4167 C 8.33334 38.1458 5.91667 39.5833 4.16667 39.5833 C 6.08334 42.125 9.35417 43.75 12.5 43.75 C 17.1042 43.75 20.8333 40.0208 20.8333 35.4167 C 20.8333 31.9583 18.0417 29.1667 14.5833 29.1667 Z" fill={props.toolManager.fgColor}></path>
            <path d="M 43.1458 9.64583 L 40.3542 6.85416 C 40.1614 6.66103 39.9325 6.50781 39.6805 6.40326 C 39.4284 6.29872 39.1583 6.2449 38.8854 6.2449 C 38.6126 6.2449 38.3424 6.29872 38.0904 6.40326 C 37.8383 6.50781 37.6094 6.66103 37.4167 6.85416 L 18.75 25.5208 L 24.4792 31.25 L 43.1458 12.5833 C 43.339 12.3906 43.4922 12.1617 43.5967 11.9096 C 43.7013 11.6576 43.7551 11.3874 43.7551 11.1146 C 43.7551 10.8417 43.7013 10.5716 43.5967 10.3195 C 43.4922 10.0675 43.339 9.83857 43.1458 9.64583 Z" fill="black"></path>
          </svg>
          {/*
          <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.5833 29.1667C11.125 29.1667 8.33334 31.9583 8.33334 35.4167C8.33334 38.1458 5.91667 39.5833 4.16667 39.5833C6.08334 42.125 9.35417 43.75 12.5 43.75C17.1042 43.75 20.8333 40.0208 20.8333 35.4167C20.8333 31.9583 18.0417 29.1667 14.5833 29.1667ZM43.1458 9.64583L40.3542 6.85416C40.1614 6.66103 39.9325 6.50781 39.6805 6.40326C39.4284 6.29872 39.1583 6.2449 38.8854 6.2449C38.6126 6.2449 38.3424 6.29872 38.0904 6.40326C37.8383 6.50781 37.6094 6.66103 37.4167 6.85416L18.75 25.5208L24.4792 31.25L43.1458 12.5833C43.339 12.3906 43.4922 12.1617 43.5967 11.9096C43.7013 11.6576 43.7551 11.3874 43.7551 11.1146C43.7551 10.8417 43.7013 10.5716 43.5967 10.3195C43.4922 10.0675 43.339 9.83857 43.1458 9.64583V9.64583Z" fill={props.toolManager.fgColor} />
</svg>*/}
        </ToggleButton>
        <ToggleButton value='eraser' >
          <svg width="49" height="50" viewBox="0 0 49 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M30.3285 6.25C29.3069 6.25 28.2853 6.66667 27.504 7.47917L5.18831 30.6875C3.62581 32.2917 3.62581 34.9375 5.18831 36.5833L10.0761 41.6667H25.4207L42.8886 23.4792C44.4712 21.875 44.4712 19.2292 42.8886 17.5833L33.1731 7.47917C32.3918 6.66667 31.3502 6.25 30.3285 6.25ZM34.0545 37.5L30.0481 41.6667H44.0705V37.5" fill="black" />
          </svg>
        </ToggleButton>
        <ToggleButton value='fill' >
          <svg width="51" height="50" viewBox="0 0 51 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0)">
              <path d="M34.5769 18.625L15.9519 0L13.0144 2.9375L17.9727 7.89583L7.24358 18.625C6.95131 18.9137 6.71926 19.2576 6.56088 19.6367C6.4025 20.0158 6.32095 20.4225 6.32095 20.8333C6.32095 21.2442 6.4025 21.6509 6.56088 22.03C6.71926 22.4091 6.95131 22.7529 7.24358 23.0417L18.7019 34.5C19.3061 35.1042 20.1186 35.4167 20.9102 35.4167C21.7019 35.4167 22.5144 35.1042 23.1186 34.5L34.5769 23.0417C35.8061 21.8333 35.8061 19.8542 34.5769 18.625ZM10.9311 20.8333L20.9102 10.8542L30.8894 20.8333H10.9311ZM39.6602 23.9583C39.6602 23.9583 35.4936 28.4792 35.4936 31.25C35.4936 33.5417 37.3686 35.4167 39.6602 35.4167C41.9519 35.4167 43.8269 33.5417 43.8269 31.25C43.8269 28.4792 39.6602 23.9583 39.6602 23.9583Z" fill="black" />
              <path d="M0.0769196 41.6667H50.0769V50H0.0769196V41.6667Z" fill={props.toolManager.fgColor} fillOpacity="1.0" />
            </g>
            <defs>
              <clipPath id="clip0">
                <rect width="50" height="50" fill="white" transform="translate(0.0769196)" />
              </clipPath>
            </defs>
          </svg>
        </ToggleButton>
        <ToggleButton value='undo' >
          <svg width="51" height="50" viewBox="0 0 51 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M26.1186 16.6667C20.5978 16.6667 15.5978 18.7292 11.7436 22.0833L7.80609 18.1458C6.49359 16.8333 4.24359 17.75 4.24359 19.6042V31.25C4.24359 32.3958 5.18109 33.3333 6.32692 33.3333H17.9728C19.8269 33.3333 20.7644 31.0833 19.4519 29.7708L15.4728 25.7917C18.3686 23.375 22.0561 21.875 26.1394 21.875C32.7228 21.875 38.4103 25.7083 41.1186 31.25C41.6811 32.4167 43.0144 33 44.2436 32.5833C45.7228 32.1042 46.4728 30.4167 45.8061 29C42.2228 21.7083 34.7644 16.6667 26.1186 16.6667Z" fill="black" />
          </svg>
        </ToggleButton>
        <ToggleButton value='clear' >
          <svg width="51" height="50" viewBox="0 0 51 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.5769 39.5833C12.5769 41.875 14.4519 43.75 16.7436 43.75H33.4103C35.7019 43.75 37.5769 41.875 37.5769 39.5833V18.75C37.5769 16.4583 35.7019 14.5833 33.4103 14.5833H16.7436C14.4519 14.5833 12.5769 16.4583 12.5769 18.75V39.5833ZM37.5769 8.33333H32.3686L30.8894 6.85417C30.5144 6.47917 29.9728 6.25 29.4311 6.25H20.7228C20.1811 6.25 19.6394 6.47917 19.2644 6.85417L17.7853 8.33333H12.5769C11.4311 8.33333 10.4936 9.27083 10.4936 10.4167C10.4936 11.5625 11.4311 12.5 12.5769 12.5H37.5769C38.7228 12.5 39.6603 11.5625 39.6603 10.4167C39.6603 9.27083 38.7228 8.33333 37.5769 8.33333Z" fill="black" />
          </svg>
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  )
}

ToolButtons.propTypes = {

}

export default ToolButtons

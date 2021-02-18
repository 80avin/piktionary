const initialState = {

}

export default (state = initialState, { type, payload }) => {
  switch (type) {

  case 'SET_SCORE':
    return { ...state, ...payload }

  default:
    return state
  }
}

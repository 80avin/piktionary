const initialState = null

export default (state = initialState, { type, payload }) => {
  switch (type) {

    case 'SET_WORD':
      return { ...payload }
    case 'CLEAR_WORD':
      return initialState;
    default:
      return state
  }
}

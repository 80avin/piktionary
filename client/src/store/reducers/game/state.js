const initialState = null

export default (state = initialState, { type, payload }) => {
  switch (type) {

    case 'SET_STATE':
      return { ...payload }
    case 'CLEAR_STATE':
      return initialState;
    default:
      return state
  }
}

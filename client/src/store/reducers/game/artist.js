const initialState = {id:99};

export default (state = initialState, { type, payload }) => {
  switch (type) {

    case 'SET_ARTIST':
      return { ...payload }
    case 'CLEAR_ARTIST':
      return initialState;
    default:
      return state
  }
}

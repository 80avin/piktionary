const initialState = {
  id:99,
  name:'Avinash Thakur',
}

export default (state = initialState, { type, payload }) => {
  switch (type) {

  case 'SET_ID':
    return { ...state, id:payload.id }

  default:
    return state
  }
}

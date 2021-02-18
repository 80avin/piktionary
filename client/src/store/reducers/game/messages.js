// const initialState = [];
const initialState = [{
  from:0,
  type:'GUESSED',
  text:'',
},{
  from:1,
  type:'CHAT',
  text:'Hello',
},{
  from:0,
  type:'CHAT',
  text:'How\'re you?',
}];

// type : 'GUESSED', 'CHAT', 'JOINED','LEFT',''

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'SET_MESSAGES':
      return [ ...payload ];
    case 'ADD_MESSAGES':
      return [...state,...payload];
    case 'REMOVE_MESSAGES':
      return [...state].filter(m=>!payload.some(m));
    case 'CLEAR_MESSAGES':
      return initialState;
    default:
      return state;
  }
}

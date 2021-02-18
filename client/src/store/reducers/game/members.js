const initialState = [
  {
    id:0,
    name:'Foo Bar',
    score:10,
  },
  {
    id:1,
    name:'Foos Bars',
    score:30,
  },
  {
    id:3,
    name:'Test user',
    score:20,
  },{
    id:99,
    name:'Avinash Thakur',
    score:50,
  }
];

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'SET_MEMBERS':
      return [...payload];
    case 'ADD_MEMBERS':
      return [...state, ...payload];
    case 'REMOVE_MEMBERS':
      return state.filter(m => !payload.some(p=>p.id===m.id));
    case 'CLEAR_MEMBERS':
      return initialState;
    case 'ADD_SCORE':
      return state.map(v => {
        if (v.id === payload.userid)
          v.score += payload.scoreDelta;
        return v;
      })
    default:
      return state
  }
}

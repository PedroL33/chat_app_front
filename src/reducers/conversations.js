const conversations = (state=[], action) => {
  let convo;
  switch(action.type) {
    case "ADD_CONVO":
      if(state.includes(action.payload)) {
        return state;
      }else {
        return [...state, action.payload]
      }
    case "CLOSE_CONVO":
      convo = state.filter(item => item !== action.payload);
      return [...convo];
    case "BRING_TO_FRONT":
      if(action.payload !== state[state.length-1]) {
        convo = state.filter(item => item !== action.payload);
        return [...convo, action.payload];
      }else {
        return state;
      }
    case "MAKE_RESPONSIVE":
      if(state.length > 0) {
        return [state[state.length-1]];
      }else {
        return [];
      }
    default:
      return state;
  }
}

export default conversations;
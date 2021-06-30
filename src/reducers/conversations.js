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
      convo = state.filter(item => item !== action.payload);
      convo.push(action.payload);
      return [...convo];
    default:
      return state;
  }
}

export default conversations;
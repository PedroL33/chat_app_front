const notifications = (state=[], action) => {
  switch(action.type) {
    case "ADD_NOTIFICATION":
      return [action.payload, ...state];
    case "CLEAR_NOTIFICATION":
      return [];
    default:
      return state;
  }
}

export default notifications;
const isConnected = (state=false, action) => {
  switch(action.type) {
    case "SET_IS_CONNECTED":
      return true;
    case "SET_IS_NOT_CONNECTED":
      return false;
    default:
      return state;
  }
}

export default isConnected;
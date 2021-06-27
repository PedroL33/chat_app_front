const openFriendPanel = (state=false, action) => {
  switch(action.type) {
    case "TOGGLE_FRIEND_PANEL":
      return !state;
    case "CLOSE_FRIEND_PANEL":
      return false;
    case "OPEN_FRIEND_PANEL":
      return true;
    default:
      return state;
  }
}

export default openFriendPanel;
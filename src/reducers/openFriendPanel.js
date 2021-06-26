const openFriendPanel = (state=false, action) => {
  switch(action.type) {
    case "TOGGLE_FRIEND_PANEL":
      return !state;
    default:
      return state;
  }
}

export default openFriendPanel;
const isResponsive = (state=false, action) => {
  switch(action.type) {
    case "IS_RESPONSIVE":
      return true;
    case "NOT_RESPONSIVE":
      return false;
    default: 
      return state;
  }
}

export default isResponsive;
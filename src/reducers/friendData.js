const friendDataReducer = (state={}, action) => {
    switch(action.type) {
        case "SET_FRIEND_DATA":
            return action.payload
        case "NEW_ONLINE_FRIEND":
            var online = state.online
            var offline = state.offline
            online.push(action.payload)
            if(offline.includes(action.payload)) {
                offline.splice(offline.indexOf(action.payload), 1);
            }
            return {online: online, offline: offline, requests: state.requests}
        case "NEW_OFFLINE_FRIEND":
            var online = state.online
            var offline = state.offline
            offline.push(action.payload)
            if(online.includes(action.payload)) {
                online.splice(online.indexOf(action.payload), 1);
            }
            return {online: online, offline: offline, requests: requests };
        case "REMOVE_REQUEST":
            var requests = state.requests
            requests.splice(requests.indexOf(action.payload, 1))
            return {online: state.online, offline: state.offline, requests: requests }
        case "NEW_REQUEST":
            var requests = state.requests
            requests.push(action.payload)
            return {online: state.online, offline: state.offline, requests: requests }
        default:
            return state
    }
}

export default friendDataReducer;
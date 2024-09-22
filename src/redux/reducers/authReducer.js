import { GRANTED_AUTHORIZATION, DENIED_AUTHORIZATION } from "../actions/authAction";

export default function authReducer(state = null, action) {
    switch (action.type) {
        case GRANTED_AUTHORIZATION:
            return action.authenticatedUser;
        case DENIED_AUTHORIZATION:
            return null;
        default:
            return state;
    }
}

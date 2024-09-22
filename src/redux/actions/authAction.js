export const GRANTED_AUTHORIZATION = "GRANTED_AUTHORIZATION";
export const DENIED_AUTHORIZATION = "DENIED_AUTHORIZATION";

export function login(authenticatedUser) {
    return {
        type: GRANTED_AUTHORIZATION,
        authenticatedUser,
    };
}

export function logout() {
    return {
        type: DENIED_AUTHORIZATION,
    };
}

export function handleLogin(selectedUser) {
    return (dispatch) => {
        dispatch(login(selectedUser));
    };
}

export function handleLogout() {
    return (dispatch) => {
        return dispatch(logout());
    };
}

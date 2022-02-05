import { csrfFetch } from './csrf';

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

const setUser = (user) => {
    return {
        type: SET_USER,
        user
    };
};

const removeUser = () => {
    console.log('Inside removeUser.')
    return {
        type: REMOVE_USER
    };
};

export const signup = (user) => async(dispatch) => {
    const { email, password, username, confirmPassword } = user;
    const response = await csrfFetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({
            email,
            password,
            confirmPassword,
            username
        })
    });

    const data = await response.json();
    const currentUser = data.user;
    dispatch(setUser(currentUser));
    return currentUser;
}

export const login = (user) => async (dispatch) => {
    const { credential, password } = user;
    const response = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({
            credential,
            password
        })
    });

    const data = await response.json();
    const currentUser = data.user;
    dispatch(setUser(currentUser));
    return currentUser;
};

export const logout = () => async (dispatch) => {
    console.log('Inside logout');
    const response = await csrfFetch('/api/session', {
        method: 'DELETE'
    });
    dispatch(removeUser());
    console.log('User should be null.')
    return response;
};

export const restoreUser = () => async (dispatch) => {
    const response = await csrfFetch('/api/session');
    const data = await response.json();
    const user = data.user;
    dispatch(setUser(user));
    return response;
}

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_USER:
            newState = {...state};
            newState.user = action.user;
            return newState;
        case REMOVE_USER:
            newState = {...state};
            newState.user = null;
            return newState;
        default:
            return state;
    }
};

export default sessionReducer;

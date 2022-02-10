import { csrfFetch } from './csrf';

const LOAD_HAUNTS = 'haunts/LOAD_HAUNTS';
const ADD_HAUNT = 'haunts/ADD_HAUNT';
const UPDATE_HAUNT = 'haunts/UPDATE_HAUNT';

const loadHaunts = hauntsList => {
    return {
        type: LOAD_HAUNTS,
        hauntsList
    };
};

const addHaunt = newHaunt => {
    return {
        type: ADD_HAUNT,
        newHaunt
    }
}

const updateHaunt = updatedHaunt => {
    return {
        type: UPDATE_HAUNT,
        updatedHaunt
    }
}

export const getHaunts = () => async(dispatch) => {
    const response = await csrfFetch('/api/haunts');
    if (response.ok) {
        const hauntsList = await response.json();
        const newState = dispatch(loadHaunts(hauntsList));
    }
}

export const createHaunt = (haunt) => async(dispatch) => {
    const response = await csrfFetch('/api/haunts', {
        method: 'POST',
        body: JSON.stringify(haunt)
    });
    if (response.ok) {
        const data = await response.json();
        const newHaunt = data.haunt;
        dispatch(addHaunt(newHaunt));
        return newHaunt;
    }
}

export const editHaunt = (haunt) => async(dispatch) => {
    const response = await csrfFetch(`/api/haunts/${haunt.id}`, {
        method: 'PUT',
        body: JSON.stringify(haunt)
    });

    if (response.ok) {
        const data = await response.json();
        const updatedHaunt = data.haunt;
        dispatch(updateHaunt(updatedHaunt));
        return updatedHaunt;
    }
}

const sortHaunts = haunts => haunts.sort((hauntA, hauntB) => hauntB.id - hauntA.id);

const hauntsReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case LOAD_HAUNTS:
            const allHaunts = {};
            action.hauntsList.forEach(haunt => {
                allHaunts[haunt.id] = haunt;
            });
            newState = {
                ...allHaunts,
                ...state,
                list: sortHaunts(action.hauntsList)
            };
            return newState;
        case ADD_HAUNT:
            newState = { ...state };
            newState[action.newHaunt.id] = action.newHaunt;
            newState.list = [ action.newHaunt, ...newState.list ];
            return newState;
        case UPDATE_HAUNT:
            newState = { ...state };
            newState[action.updatedHaunt.id] = action.updatedHaunt;
            return newState;
        default:
            return state;
    }
};

export default hauntsReducer;

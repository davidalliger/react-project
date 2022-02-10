import { csrfFetch } from './csrf';

const LOAD_HAUNTS = 'haunts/LOAD_HAUNTS';
const ADD_HAUNT = 'haunts/ADD_HAUNT';

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

export const getHaunts = () => async(dispatch) => {
    const response = await csrfFetch('/api/haunts');
    if (response.ok) {
        const hauntsList = await response.json();
        dispatch(loadHaunts(hauntsList));
    }
}

export const createHaunt = (haunt) => async(dispatch) => {
    const response = await csrfFetch('/api/haunts', {
        method: 'POST',
        body: JSON.stringify(haunt)
    });

    const data = await response.json();
    const newHaunt = data.haunt;
    dispatch(addHaunt(newHaunt));
    return newHaunt;
}

const sortHaunts = haunts => haunts.sort((hauntA, hauntB) => hauntB - hauntA);

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
            newState.haunts[action.newHaunt.id] = action.newHaunt;
            newState.haunts.list = [ action.newHaunt, ...newState.haunts.list ];
            return newState;
        default:
            return state;
    }
};

export default hauntsReducer;

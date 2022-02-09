import { csrfFetch } from './csrf';

const LOAD_HAUNTS = 'haunts/LOAD_HAUNTS';

const loadHaunts = hauntsList => {
    return {
        type: LOAD_HAUNTS,
        hauntsList
    };
};

export const getHaunts = () => async(dispatch) => {
    const response = await csrfFetch('/api/haunts');
    if (response.ok) {
        const hauntsList = await response.json();
        dispatch(loadHaunts(hauntsList));
    }
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
        default:
            return state;
    }
};

export default hauntsReducer;

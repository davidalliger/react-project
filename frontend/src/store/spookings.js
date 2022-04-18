import { csrfFetch } from './csrf';

const LOAD_SPOOKINGS = 'spookings/LOAD_SPOOKINGS';
const ADD_SPOOKING = 'spookings/ADD_SPOOKING';
const DELETE_SPOOKING = 'spookings/DELETE_SPOOKING';
const CLEAR_SPOOKINGS = 'spookings/CLEAR_SPOOKINGS';

const loadSpookings = spookingsList => {
    return {
        type: LOAD_SPOOKINGS,
        spookingsList
    };
};

const addSpooking = newSpooking => {
    return {
        type: ADD_SPOOKING,
        newSpooking
    }
}

const deleteSpooking = deletedSpookingId => {
    return {
        type: DELETE_SPOOKING,
        deletedSpookingId
    }
}

export const clearSpookings = () => {
    return {
        type: CLEAR_SPOOKINGS
    }
}

export const getSpookings = (user) => async(dispatch) => {
    const response = await csrfFetch(`/api/spookings?userId=${user.id}`);
    if (response.ok) {
        const spookingsList = await response.json();
        dispatch(loadSpookings(spookingsList));
    }
}

export const createSpooking = (spooking) => async(dispatch) => {
    const response = await csrfFetch('/api/spookings', {
        method: 'POST',
        body: JSON.stringify(spooking)
    });
    if (response.ok) {
        const data = await response.json();
        const newSpooking = data.spooking;
        dispatch(addSpooking(newSpooking));
        return newSpooking;
    }
}

export const destroySpooking = (spooking) => async(dispatch) => {
    const response = await csrfFetch(`/api/spookings/${spooking.id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        const data = await response.json();
        const deletedSpookingId = data.id;
        dispatch(deleteSpooking(deletedSpookingId));
    }
}

const sortAll = spookings => {
    const today = new Date();
    spookings.sort((spookingA, spookingB) => (new Date(spookingA.startDate)) - (new Date(spookingB.startDate)));
    const pastSpookings = spookings.filter(spooking => (new Date(spooking.startDate)) <= today);
    const futureSpookings = spookings.filter(spooking => (new Date(spooking.startDate)) > today);
    return [pastSpookings, futureSpookings];
}

const sortOneList = spookings => {
    const sorted = spookings.sort((spookingA, spookingB) => (new Date(spookingA.startDate)) - (new Date(spookingB.startDate)));
    return sorted;
}


const spookingsReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case LOAD_SPOOKINGS:
            const allSpookings = {};
            action.spookingsList.forEach(spooking => {
                allSpookings[spooking.id] = spooking;
            });
            const sortedSpookings = sortAll(action.spookingsList);
            newState = {
                ...allSpookings,
                ...state,
                pastSpookings: sortedSpookings[0],
                futureSpookings: sortedSpookings[1]
            };
            return newState;
        case ADD_SPOOKING:
            newState = { ...state };
            newState[action.newSpooking.id] = action.newSpooking;
            if (newState.futureSpookings) {
                const unsorted = [action.newSpooking, ...newState.futureSpookings];
                newState.futureSpookings = sortOneList(unsorted);
            } else {
                newState.futureSpookings = [ action.newSpooking ];
            }
            return newState;
        case DELETE_SPOOKING:
            newState = { ...state };
            delete newState[action.deletedSpookingId];
            return newState;
        case CLEAR_SPOOKINGS:
            newState = {};
            return newState;
        default:
            return state;
    }
};

export default spookingsReducer;

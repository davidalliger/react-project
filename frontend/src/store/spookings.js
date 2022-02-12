import { csrfFetch } from './csrf';

// const GET_SPOOKINGS = 'spookings/GET_SPOOKINGS';
const ADD_SPOOKING = 'spookings/ADD_SPOOKING';
// const UPDATE_SPOOKING = 'spookings/UPDATE_SPOOKING';
// const DELETE_SPOOKING = 'spookings/DELETE_SPOOKING';

// const loadHaunts = hauntsList => {
//     return {
//         type: LOAD_HAUNTS,
//         hauntsList
//     };
// };

const addSpooking = newHaunt => {
    return {
        type: ADD_SPOOKING,
        newHaunt
    }
}

// const updateHaunt = updatedHaunt => {
//     return {
//         type: UPDATE_HAUNT,
//         updatedHaunt
//     }
// }

// const deleteHaunt = deletedHauntId => {
//     return {
//         type: DELETE_HAUNT,
//         deletedHauntId
//     }
// }

// export const getHaunts = () => async(dispatch) => {
//     const response = await csrfFetch('/api/haunts');
//     if (response.ok) {
//         const hauntsList = await response.json();
//         const newState = dispatch(loadHaunts(hauntsList));
//     }
// }

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

// export const editHaunt = (haunt) => async(dispatch) => {
//     const response = await csrfFetch(`/api/haunts/${haunt.id}`, {
//         method: 'PUT',
//         body: JSON.stringify(haunt)
//     });

//     if (response.ok) {
//         const data = await response.json();
//         const updatedHaunt = data.haunt;
//         dispatch(updateHaunt(updatedHaunt));
//         return updatedHaunt;
//     }
// }

// export const destroyHaunt = (haunt) => async(dispatch) => {
//     const response = await csrfFetch(`/api/haunts/${haunt.id}`, {
//         method: 'DELETE'
//     });

//     if (response.ok) {
//         const data = await response.json();
//         const deletedHauntId = data.id;
//         dispatch(deleteHaunt(deletedHauntId));
//     }
// }

// const sortHaunts = haunts => haunts.sort((hauntA, hauntB) => hauntB.id - hauntA.id);

const spookingsReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        // case LOAD_HAUNTS:
        //     const allHaunts = {};
        //     action.hauntsList.forEach(haunt => {
        //         allHaunts[haunt.id] = haunt;
        //     });
        //     newState = {
        //         ...allHaunts,
        //         ...state,
        //         list: sortHaunts(action.hauntsList)
        //     };
        //     return newState;
        case ADD_SPOOKING:
            newState = { ...state };
            newState[action.newHaunt.id] = action.newHaunt;
            newState.list = [ action.newHaunt, ...newState.list ];
            return newState;
        // case UPDATE_HAUNT:
        //     newState = { ...state };
        //     newState[action.updatedHaunt.id] = action.updatedHaunt;
        //     return newState;
        // case DELETE_HAUNT:
        //     newState = { ...state };
        //     delete newState[action.deletedHauntId];
        //     return newState;
        default:
            return state;
    }
};

export default spookingsReducer;

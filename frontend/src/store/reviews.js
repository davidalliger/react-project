import { csrfFetch } from "./csrf";

const LOAD_REVIEWS = 'reviews/LOAD_REVIEWS';
const ADD_REVIEW = 'reviews/ADD_REVIEW';
const UPDATE_REVIEW = 'reviews/UPDATE_REVIEW';
const DELETE_REVIEW = 'reviews/DELETE_REVIEW';

const loadReviews = reviewsList => {
    return {
        type: LOAD_REVIEWS,
        reviewsList
    };
};

const addReview = newReview => {
    return {
        type: ADD_REVIEW,
        newReview
    };
};

const updateReview = updatedReview => {
    return {
        type: UPDATE_REVIEW,
        updatedReview
    };
};

const deleteReview = deletedReviewId => {
    return {
        type: DELETE_REVIEW,
        deletedReviewId
    };
};

export const getReviews = () => async(dispatch) => {
    const response = await csrfFetch('/api/reviews');
    if (response.ok) {
        const reviewsList = await response.json();
        dispatch(loadReviews(reviewsList));
    }
}

export const createReview = (review) => async(dispatch) => {
    const response = await csrfFetch('/api/reviews', {
        method: 'POST',
        body: JSON.stringify(review)
    });
    if (response.ok) {
        const data = await response.json();
        const newReview = data.review;
        dispatch(addReview(newReview));
        return newReview;
    }
}

export const editReview = (review) => async(dispatch) => {
    const response = await csrfFetch(`/api/reviews/${review.id}`, {
        method: 'PUT',
        body: JSON.stringify(review)
    });

    if (response.ok) {
        const data = await response.json();
        const updatedReview = data.review;
        dispatch(updateReview(updatedReview));
        return updatedReview;
    }
}

export const destroyReview = (review) => async(dispatch) => {
    const response = await csrfFetch(`/api/reviews/${review.id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        const data = await response.json();
        const deletedReviewId = data.id;
        dispatch(deleteReview(deletedReviewId));
    }
}

const sortReviews = reviews => reviews.sort((reviewA, reviewB) => reviewB.id - reviewA.id);

const reviewsReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case LOAD_REVIEWS:
            const allReviews = {};
            action.reviewsList.forEach(review => {
                allReviews[review.id] = review;
            });
            newState = {
                ...allReviews,
                ...state,
                list: sortReviews(action.reviewsList)
            };
            return newState;
        case ADD_REVIEW:
            newState = { ...state };
            newState[action.newReview.id] = action.newReview;
            newState.list = [ action.newReview, ...newState.list ];
            return newState;
        case UPDATE_REVIEW:
            newState = { ...state };
            newState[action.updatedReview.id] = action.updatedReview;
            return newState;
        case DELETE_REVIEW:
            newState = { ...state };
            delete newState[action.deletedReviewId];
            return newState;
        default:
            return state;
    }
};

export default reviewsReducer;

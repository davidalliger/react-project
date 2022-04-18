import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { destroyReview } from '../../store/reviews';
import { useHistory, useParams, } from 'react-router-dom';
import './DeleteReviewForm.css';

const DeleteReviewForm = ({setShowDeleteReviewModal, handleDelete, review}) => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [errors, setErrors] = useState([]);
    // const reviews = useSelector(state => state.reviews)
    // const { reviewId } = useParams();
    // const review = reviews[reviewId];
    const history = useHistory();


    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            await dispatch(destroyReview(review));
            setShowDeleteReviewModal(false);
            // await dispatch(getSpookings(sessionUser));
            // handleDelete();
            // history.push('/spookings');
        } catch (err) {
            let resBody = await err.json();
            setErrors(resBody.errors);
            document.getElementById('modal-content').scrollTop = 0;
        }
    }

    // useEffect(() => {
    //     if (!sessionUser) {
    //         history.push('/login');
    //     }
    // }, [sessionUser]);

    return (
        // <div className='form-page'>
            <form
                className='auth-form'
                onSubmit={handleSubmit}
            >
                <div className='auth-form-title'>
                    Delete Review?
                </div>
                <div id='delete-review-confirmation-div'>
                    Are you sure you want to delete your review? Please confirm.
                </div>
                <div id='delete-review-button-div'>
                    <button
                        type='button'
                        className='auth-button'
                        id='delete-review-back'
                        onClick={() => setShowDeleteReviewModal(false)}
                    >
                        Back
                    </button>
                    <button
                        type='submit'
                        className='auth-button'
                        id='delete-spooking-confirm'
                    >
                        Confirm
                    </button>
                </div>
            </form>
        // </div>
    )
}

export default DeleteReviewForm;

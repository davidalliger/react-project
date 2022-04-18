import {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createReview } from '../../store/reviews';
import './AddReviewForm.css'

const AddReviewForm = ({setShowAddReviewModal, haunt}) => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [rating, setRating] = useState('');
    const [content, setContent] = useState('');
    const [errors, setErrors] = useState([]);
    const possibleRatings = [5, 4, 3, 2, 1];

    const handleSubmit = async(e) => {
        e.preventDefault();
        setErrors([]);
        const review = {
            userId: sessionUser.id,
            hauntId: +haunt.id,
            rating,
            content
        };

        try {
            let newReview = await dispatch(createReview(review));
            if (newReview) {
                setShowAddReviewModal(false);
                // history.push(`/haunts/${newHaunt.id}`);
            }
        } catch (err) {
            let resBody = await err.json();
            setErrors(resBody.errors);
            document.getElementById('modal-content').scrollTop = 0;
        }
    }

    return (
        <form
            className='auth-form'
            id='add-review-form'
            onSubmit={handleSubmit}
        >
            <div className={errors.length ? 'review-errors-normal' : 'errors-hidden'}>
                <ul id='review-errors-ul'>
                    {errors.map((error, index) => (
                            <li key={index}>
                                {error}
                            </li>
                        ))}
                </ul>
            </div>
            <div className='auth-form-title'>
                Add Review
            </div>
            <div id='add-review-form-fields'>
                <div className='auth-form-field'>
                    <label htmlFor='rating'>
                        Give this haunt a rating:
                        <div className='auth-form-input'>
                            <select
                                id='rating'
                                name='rating'
                                className='auth-select'
                                onChange={e => setRating(e.target.value)}
                                value={rating}
                            >
                                <option value='' disabled>Please select a rating...</option>
                                {possibleRatings.map((rating, index) => (
                                    <option value={rating} key={index}>{rating}</option>
                                ))}
                            </select>
                        </div>
                    </label>
                </div>
                <div className='auth-form-field'>
                    <label htmlFor='content'>
                        Please enter your review below:
                        <textarea
                            id='content'
                            name='content'
                            className='auth-form-input'
                            onChange={e => setContent(e.target.value)}
                            placeholder='Describe your experience staying at this haunt.'
                            value={content}
                            />
                    </label>
                </div>
                <div id='add-review-button-div'>
                    <button
                        type='button'
                        className='auth-button'
                        id='add-review-back'
                        onClick={() => setShowAddReviewModal(false)}
                    >
                        Cancel
                    </button>
                    <button
                        type='submit'
                        id='add-review-submit'
                        className='auth-button'
                    >
                        Submit
                    </button>
                </div>
            </div>
        </form>
    )
}

export default AddReviewForm;

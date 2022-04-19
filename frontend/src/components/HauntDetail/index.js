import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CreateSpookingForm from '../CreateSpookingForm';
import EditHauntFormModal from '../EditHauntForm';
import DeleteHauntFormModal from '../DeleteHauntForm';
import AddReviewFormModal from '../AddReviewForm';
import EditReviewFormModal from '../EditReviewForm';
import DeleteReviewFormModal from '../DeleteReviewForm';
import './HauntDetail.css'

const HauntDetail = ({isLoaded, showLoginModal, setShowLoginModal}) => {
    const { hauntId } = useParams();
    const sessionUser = useSelector(state => state.session.user);
    const haunts = useSelector(state => state.haunts);
    let haunt = haunts[hauntId];
    const reviewState = useSelector(state => state.reviews.list);
    const reviews = reviewState.filter(review => {
        return +review.hauntId === +hauntId;
    });
    const spookings = useSelector(state => state.spookings)
    const [ isOwner, setIsOwner ] = useState(false);
    const [ showEditHauntModal, setShowEditHauntModal ] = useState(false);
    const [ showDeleteHauntModal, setShowDeleteHauntModal ] = useState(false);
    const [ reviewSection, setReviewSection ] = useState(false);
    const [pastSpookings, setPastSpookings] = useState([]);
    const [visited, setVisited] = useState(false);
    const [reviewed, setReviewed] = useState(false);
    const [showAddReviewModal, setShowAddReviewModal] = useState(false);
    const [showEditReviewModal, setShowEditReviewModal] = useState(false);
    const [showDeleteReviewModal, setShowDeleteReviewModal] = useState(false);
    const history = useHistory();

    useEffect(() => {
        if (reviews.length) {
            setReviewSection(true);
            if (sessionUser && visited) {
                const userReview = reviews.filter(review => {
                    return review.userId === sessionUser.id
                });
                if (userReview.length) {
                    setReviewed(true);
                } else {
                    setReviewed(false);
                }
            } else {
                setReviewed(false)
            }
        } else {
            setReviewed(false)
        }
    }, [reviews, visited, sessionUser])

    useEffect(() => {
        if (spookings.pastSpookings) {
            setPastSpookings(spookings.pastSpookings);
        } else {
            setPastSpookings([])
        }
    }, [spookings]);

    useEffect(() => {
        if (pastSpookings.length) {
            const pastVisits = pastSpookings.filter(spooking => {
                return +spooking.hauntId === +hauntId;
            });
            if (pastVisits.length) {
                setVisited(true);
            } else {
                setVisited(false);
            }
        } else {
            setVisited(false)
        }
    }, [pastSpookings]);

    useEffect(() => {
        if (sessionUser && isLoaded) {
            if(sessionUser.id === haunt.userId) {
                setIsOwner(true);
            } else {
                setIsOwner(false);
            }
        }
    }, [sessionUser, isLoaded]);

    const getReviewMonth = (date) => {
        const justDate = date.split('T')[0];
        const parts = justDate.split('-');
        return `${months[parts[1]-1]}`;
    }

    const getReviewYear = (date) => {
        const justDate = date.split('T')[0];
        const parts = justDate.split('-');
        return `${parts[0]}`;
    }

    const generateRating = (rating) => {
        const result = [];
        for (let i = 1; i <= rating; i++) {
            result.push(i);
        }
        return result;
    }

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    const defaultHauntUrl = '/images/hauntedhouse.jpg';
    const defaultUserUrl = '/images/user-icon-lavender.png';

    const handleDelete = () => {
        history.push('/haunts');
    }

    return (
        <>
            {isLoaded && (
                <div id='haunt-detail-container'>
                    <div id='haunt-detail-info-bar'>
                        <div id='haunt-detail-heading'>
                            <h1>{haunt?.name}</h1>
                            <h2 id='haunt-detail-location'>
                                {haunt?.city}, {haunt?.state && (
                                    <span>{haunt?.state}, </span>
                                )}{haunt?.country}
                            </h2>
                        </div>
                        {isOwner && (
                        <div id='haunt-detail-owner-buttons'>
                            {/* <Link to={`/haunts/${haunt.id}/edit`} > */}
                            <div>
                                <button
                                    id='haunt-detail-edit-button'
                                    className='auth-button'
                                    onClick={()=>setShowEditHauntModal(true)}
                                >
                                    Edit
                                </button>
                            </div>
                            {/* </Link> */}
                            {/* <Link to={`/haunts/${haunt.id}/delete`} > */}
                            <div>
                                <button
                                    id='haunt-detail-delete-button'
                                    className='auth-button'
                                    onClick={()=>setShowDeleteHauntModal(true)}
                                >
                                    Delete
                                </button>
                            </div>
                            {/* </Link> */}
                        </div>
                        )}
                    </div>
                    <div id='haunt-detail-image-grid'>
                        <div id='haunt-detail-image-one' style={{backgroundImage: `url(${haunt?.Images.length ? haunt?.Images[0].url : defaultHauntUrl})`}}></div>
                        <div id='haunt-detail-image-two' style={{backgroundImage: `url(${haunt?.Images.length > 1 ? haunt?.Images[1].url : defaultHauntUrl})`}}></div>
                        <div id='haunt-detail-image-three' style={{backgroundImage: `url(${haunt?.Images.length > 2 ? haunt?.Images[2].url : defaultHauntUrl})`}}></div>
                        <div id='haunt-detail-image-four' style={{backgroundImage: `url(${haunt?.Images.length > 3 ? haunt?.Images[3].url : defaultHauntUrl})`}}></div>
                        <div id='haunt-detail-image-five' style={{backgroundImage: `url(${haunt?.Images.length > 4 ? haunt?.Images[4].url : defaultHauntUrl})`}}></div>
                    </div>
                    <div id='haunt-detail-info-area'>
                        <div id='haunt-detail-text'>
                            <div id='haunt-host-info'>
                                <div>
                                    <h2>Hosted by {haunt?.User.username}</h2>
                                </div>
                                <div id='haunt-host-image' style={{backgroundImage: `url(${haunt?.User.Images.length ? haunt?.User.Images[0].url : defaultUserUrl})`}}></div>
                            </div>
                            <div id='haunt-description'>
                                <p>{haunt?.description}</p>
                            </div>
                            {(visited && !reviewed) && (
                                <div id='haunt-detail-review-button-div'>
                                    <button id='haunt-detail-review-button'
                                        onClick={() => setShowAddReviewModal(true)}
                                    >
                                        Add Review
                                    </button>
                                </div>
                            )}
                            {reviewSection && (
                                <div id='haunt-reviews'>
                                    {reviews?.map((review, index) => {
                                        return (
                                            <div className='haunt-detail-review' key={index}>
                                                <div className='haunt-detail-review-upper'>
                                                    <div className='haunt-detail-review-user'>
                                                        <div className='haunt-detail-review-image' style={{backgroundImage: `url(${review.User.Images[0].url})`}}></div>
                                                        <div className='haunt-detail-review-user-info'>
                                                            <div className='haunt-detail-review-user-username'>
                                                                {review.User.username}
                                                            </div>
                                                            <div className='haunt-detail-review-user-date'>
                                                                {getReviewMonth(review.updatedAt)} {getReviewYear(review.updatedAt)}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='haunt-detail-review-rating'>
                                                        <div>
                                                            {generateRating(review.rating).map((point, index) => {
                                                                return (
                                                                    <i id={point} key={index} className="fa-solid fa-spider"></i>
                                                                )
                                                            })}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='haunt-detail-review-lower'>
                                                    {review.content}
                                                </div>
                                                <div className='haunt-detail-review-edit-delete'>
                                                    {(review.userId === sessionUser?.id) && (
                                                        <>
                                                            <i className="fa-solid fa-pen haunt-detail-review-edit" onClick={()=>setShowEditReviewModal(true)}></i>
                                                            <i className="fa-solid fa-trash-can haunt-detail-review-delete" onClick={()=>setShowDeleteReviewModal(true)}></i>
                                                            <EditReviewFormModal showEditReviewModal={showEditReviewModal} setShowEditReviewModal={setShowEditReviewModal} haunt={haunt} review={review} />
                                                            <DeleteReviewFormModal showDeleteReviewModal={showDeleteReviewModal} setShowDeleteReviewModal={setShowDeleteReviewModal} haunt={haunt} review={review} />
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            )}
                        </div>
                        <div>
                            {(!sessionUser || sessionUser.id !== haunt?.userId) && (
                                <CreateSpookingForm haunt={haunt} showLoginModal={showLoginModal} setShowLoginModal={setShowLoginModal} />
                            )}
                        </div>
                    </div>
                </div>
            )}
            <EditHauntFormModal showEditHauntModal={showEditHauntModal} setShowEditHauntModal={setShowEditHauntModal} />
            <DeleteHauntFormModal showDeleteHauntModal={showDeleteHauntModal} setShowDeleteHauntModal={setShowDeleteHauntModal} handleDelete={handleDelete} />
            <AddReviewFormModal showAddReviewModal={showAddReviewModal} setShowAddReviewModal={setShowAddReviewModal} haunt={haunt} />
        </>
    )
}

export default HauntDetail;

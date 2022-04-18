import { useParams, Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import './SpookingDetailPage.css'
import DeleteSpookingFormModal from '../DeleteSpookingForm';
import AddReviewFormModal from '../AddReviewForm';
import EditReviewFormModal from '../EditReviewForm';
import DeleteReviewFormModal from '../DeleteReviewForm';

const SpookingDetailPage = () => {
    const { spookingId } = useParams();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const reviews = useSelector(state => state.reviews.list);
    console.log(reviews);
    const spookings = useSelector(state => state.spookings);
    const [futureSpooking, setFutureSpooking] = useState(false);
    const [pastSpooking, setPastSpooking] = useState(false);
    const [userReview, setUserReview] = useState(null);
    const [showDeleteSpookingModal, setShowDeleteSpookingModal] = useState(false);
    const [showAddReviewModal, setShowAddReviewModal] = useState(false);
    const [showEditReviewModal, setShowEditReviewModal] = useState(false);
    const [showDeleteReviewModal, setShowDeleteReviewModal] = useState(false);
    let spooking = spookings[spookingId];
    const today = new Date();

    useEffect(() => {
        const reviewed = reviews.filter(review => {
            return review.userId === sessionUser.id && review.hauntId === spooking.hauntId;
        });
        if (reviewed.length) {
            setUserReview(reviewed[0])
        } else {
            setUserReview(null);
        }
    }, [spooking, reviews])

    useEffect(() => {
        if (!spooking) {
            history.push('/spookings');
        }
    }, [spookings, spooking]);

    useEffect(() => {
        if (!sessionUser) {
            history.push('/');
        }
    }, [sessionUser, history]);

    useEffect(()=> {
        if ((new Date(spooking?.startDate)) > today) setFutureSpooking(true);
        else setPastSpooking(true);
    }, [spooking]);

    const generateRating = (rating) => {
        const result = [];
        for (let i = 1; i <= rating; i++) {
            result.push(i);
        }
        return result;
    }

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']


    const convertToCardinals = (latitude, longitude) =>{
        let latNum = Number(latitude);
        let longNum = Number(longitude);
        let latString;
        let longString;
        if (latitude >= 0) {
            latString = `${Math.abs(latNum)} N`;
        } else {
            latString = `${Math.abs(latNum)} S`;
        }
        if (longitude >= 0) {
            longString = `${Math.abs(longNum)} E`;
        } else {
            longString = `${Math.abs(longNum)} W`;
        }
        return `${latString}, ${longString}`;
    }

    const defaultHauntUrl = '/images/hauntedhouse.jpg';

    const formatDate = (date) => {
        const justDate = date.split('T')[0];
        const parts = justDate.split('-');
        return `${parts[1]}/${parts[2]}/${parts[0]}`;
    }

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

    const getDuration = (startDate, endDate) => {
        const start = new Date(startDate).getTime();
        const end = new Date(endDate).getTime();
        const day = 1000 * 60 * 60 * 24;
        const duration = Math.round((end-start)/day);
        return duration;
    }

    const getTotal = (startDate, endDate, rate) => {
        const duration = getDuration(startDate, endDate);
        const total = duration * rate + duration * 5;
        return total;
    }

    const handleDelete = () => {
        history.push('/spookings');
    }

    console.log(userReview);

    return (
        <>
            {spooking && (
                <div id='spooking-detail-container'>
                    <div id='spooking-detail-info-box'>
                        <div id='spooking-detail-heading'>
                            <h1>Your Trip</h1>
                            <h2 id='spooking-detail-location'>{spooking?.Haunt.name}</h2>
                        </div>
                        <div id='spooking-detail-duration'>
                            From {formatDate(spooking?.startDate)} to {formatDate(spooking?.endDate)}
                        </div>
                        <div id='spooking-detail-polterguests'>
                            {getDuration(spooking?.startDate, spooking?.endDate)} nights, {spooking?.polterguests} polterguest{(spooking?.polterguests > 1) && (<span>s</span>)}
                        </div>
                        <div id='spooking-detail-haunt-image' style={{backgroundImage: `url(${(spooking?.Haunt.Images.length > 0) ? spooking?.Haunt.Images[0].url : defaultHauntUrl})`}}></div>
                        <div id='spooking-detail-location-info'>
                            <div id='spooking-detail-address-one'>
                                {spooking?.Haunt.address}
                            </div>
                            <div id='spooking-detail-address-two'>
                                {spooking?.Haunt.city}, {spooking?.Haunt.state && (
                                        <span>{spooking?.Haunt.state}, </span>
                                )} {spooking?.Haunt.country}
                            </div>
                            <div id='spooking-detail-latlong'>
                                {convertToCardinals(spooking?.Haunt.latitude, spooking?.Haunt.longitude)}
                            </div>
                        </div>
                        <div id='spooking-other-info-div'>
                            <div id='spooking-detail-total-amount-div'>
                                Total amount: <span id='spooking-detail-dollar-amount'>
                                        ${getTotal(spooking?.startDate, spooking?.endDate, spooking?.Haunt.rate)}
                                    </span>
                            </div>
                            <div id='spooking-detail-buttons-div'>
                                {futureSpooking && (
                                    <div>
                                        {/* <Link to={`/spookings/${spooking?.id}/delete`}> */}
                                        <button id='spooking-detail-cancel-button'
                                            onClick={() => setShowDeleteSpookingModal(true)}
                                        >
                                            Cancel Trip
                                        </button>
                                        {/* </Link> */}
                                    </div>
                                )}
                                {pastSpooking && (
                                    <>
                                        {userReview && (
                                            <div id='spooking-detail-review'>
                                                <div id='spooking-detail-review-upper'>
                                                    <div id='spooking-detail-review-user'>
                                                        <div id='spooking-detail-review-image' style={{backgroundImage: `url(${userReview.User.Images[0].url})`}}></div>
                                                        <div id='spooking-detail-review-user-info'>
                                                            <div id='spooking-detail-review-user-username'>
                                                                {userReview.User.username}
                                                            </div>
                                                            <div id='spooking-detail-review-user-date'>
                                                                {getReviewMonth(userReview.updatedAt)} {getReviewYear(userReview.updatedAt)}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div id='spooking-detail-review-rating'>
                                                        <div>
                                                            {generateRating(userReview.rating).map((point, index) => {
                                                                return (
                                                                    <i id={point} key={index} className="fa-solid fa-spider"></i>
                                                                )
                                                            })}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div id='spooking-detail-review-lower'>
                                                    {userReview.content}
                                                </div>
                                                <div id='spooking-detail-review-edit-delete'>
                                                    <i className="fa-solid fa-pen spooking-detail-review-edit" onClick={()=> setShowEditReviewModal(true)}></i>
                                                    <i className="fa-solid fa-trash-can spooking-detail-review-delete"onClick={()=> setShowDeleteReviewModal(true)}></i>
                                                    <EditReviewFormModal showEditReviewModal={showEditReviewModal} setShowEditReviewModal={setShowEditReviewModal} haunt={spooking.Haunt} review={userReview} />
                                                    <DeleteReviewFormModal showDeleteReviewModal={showDeleteReviewModal} setShowDeleteReviewModal={setShowDeleteReviewModal} haunt={spooking.Haunt} review={userReview} />
                                                </div>
                                            </div>
                                        )}
                                        {!userReview && (
                                            <div>
                                                {/* <Link to={`/spookings/${spooking?.id}/delete`}> */}
                                                <button id='spooking-detail-review-button'
                                                    onClick={() => setShowAddReviewModal(true)}
                                                >
                                                    Add Review
                                                </button>
                                                {/* </Link> */}
                                            </div>
                                        )}
                                    </>
                                )}
                                <div>
                                    <button
                                        id='spooking-detail-back-button'
                                        onClick={history.goBack}
                                    >
                                        Back
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <DeleteSpookingFormModal showDeleteSpookingModal={showDeleteSpookingModal} setShowDeleteSpookingModal={setShowDeleteSpookingModal} handleDelete={handleDelete} />
            <AddReviewFormModal showAddReviewModal={showAddReviewModal} setShowAddReviewModal={setShowAddReviewModal} haunt={spooking.Haunt} />
        </>
    )
}

export default SpookingDetailPage;

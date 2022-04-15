import { useParams, Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import './SpookingDetailPage.css'
import DeleteSpookingFormModal from '../DeleteSpookingForm';
import AddReviewFormModal from '../AddReviewForm';

const SpookingDetailPage = () => {
    const { spookingId } = useParams();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const spookings = useSelector(state => state.spookings);
    const [futureSpooking, setFutureSpooking] = useState(false);
    const [pastSpooking, setPastSpooking] = useState(false);
    const [showDeleteSpookingModal, setShowDeleteSpookingModal] = useState(false);
    const [showAddReviewModal, setShowAddReviewModal] = useState(false);
    let spooking = spookings[spookingId];
    const today = new Date();

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
            <AddReviewFormModal showAddReviewModal={showAddReviewModal} setShowAddReviewModal={setShowAddReviewModal} />
        </>
    )
}

export default SpookingDetailPage;

import { useParams, Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const SpookingDetailPage = () => {
    const { spookingId } = useParams();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const spookings = useSelector(state => state.spookings);
    console.log('spookings is ', spookings);
    let spooking = spookings[spookingId];

    useEffect(() => {
        if (!sessionUser) {
            history.push('/login');
        }
    }, [sessionUser]);

    const defaultHauntUrl = '/images/hauntedhouse.jpg';
    const defaultUserUrl = '/images/user-icon-lavender.png';

    const formatDate = (date) => {
        const justDate = date.split('T')[0];
        const parts = justDate.split('-');
        return `${parts[1]}/${parts[2]}/${parts[0]}`;
    }

    return (
        <div id='spooking-detail-container'>
            <div id='spooking-detail-info-bar'>
                <div id='spooking-detail-heading'>
                    <h1>Your Trip</h1>
                    <h2 id='spooking-detail-location'>
                        {spooking.Haunt.name}
                    </h2>
                </div>
                <div>
                    From {formatDate(spooking.startDate)} to {formatDate(spooking.endDate)}
                </div>
                <div className='spooking-haunt-image' style={{backgroundImage: `url(${(spooking.Haunt.Images.length > 0) ? spooking.Haunt.Images[0].url : defaultHauntUrl})`}}></div>
                <div>
                    {spooking.Haunt.address}
                </div>
                <div>
                    {spooking.Haunt.city}, {spooking.Haunt.state && (
                            <span>{spooking.Haunt.state}, </span>
                    )} {spooking.Haunt.country}
                </div>
                <div>
                    {spooking.Haunt.latitude}, {spooking.Haunt.longitude}
                </div>
            </div>
        </div>
    )
}

export default SpookingDetailPage;

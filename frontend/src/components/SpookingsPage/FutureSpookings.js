import { useSelector } from 'react-redux';
import './SpookingsPage.css';
import { Link } from 'react-router-dom';

const FutureSpookings = ({futureSpookings}) => {
    const today = new Date();
    {debug()}
    // const futureSpookings = useSelector(state => state.spookings.futureSpookings);
    console.log(futureSpookings);
    const debug = () => console.log('So far so good!');

    const defaultHauntUrl = '/images/hauntedhouse.jpg';
    const defaultUserUrl = '/images/user-icon-lavender.png';

    const getDuration = (startDate, endDate) => {
        const start = new Date(startDate).getTime();
        const end = new Date(endDate).getTime();
        const day = 1000 * 60 * 60 * 24;
        const duration = Math.round((end-start)/day);
        return duration;
    }

    const formatDate = (date) => {
        const justDate = date.split('T')[0];
        const parts = justDate.split('-');
        return `${parts[1]}/${parts[2]}/${parts[0]}`;
    }

    return (
        <div id='future-spookings-container'>
            {(futureSpookings.length <= 0) && (
                <div id='no-spookings'>
                    <h2>
                        You haven't spooked a trip... yet.
                    </h2>
                    <div id='no-spookings-message'>
                        What are you waiting for? Have the time of your afterlife or just rest in peace at your new favorite haunt!
                    </div>
                    <Link to='/haunts'>
                        <button id='no-spookings-button'>
                            Start looking
                        </button>
                    </Link>
                </div>
            )}
            {(futureSpookings.length > 0) && (
                <div className='spookings-list-container'>
                    {futureSpookings.map(spooking => (
                        <div className='spooking-container' key={spooking.id}>
                            <div className='spooking-haunt-image' style={{backgroundImage: `url(${(spooking.Haunt.Images.length > 0) ? spooking.Haunt.Images[0].url : defaultHauntUrl})`}}></div>
                            <div className='spooking-info'>
                                <div className='spooking-city-div'>
                                    {(spooking.Haunt.city).toUpperCase()}
                                </div>
                                <div className='spooking-name-div'>
                                    {spooking.Haunt.name}
                                </div>
                                <div className='spooking-duration-div'>
                                    <div>
                                        {getDuration(spooking.startDate, spooking.endDate)} nights - {spooking.polterguests} polterguest{(spooking.polterguests > 1) && ( <span>s</span> )}
                                    </div>
                                    <div>
                                        From {formatDate(spooking.startDate)} to {formatDate(spooking.endDate)}
                                    </div>
                                </div>
                                <div className='spooking-address-div'>
                                    <div>
                                        {spooking.Haunt.address}
                                    </div>
                                    <div>
                                        {spooking.Haunt.city}, {(spooking.Haunt.state.lenth > 0) && (
                                            <span>{spooking.Haunt.state}, </span>
                                            )}{spooking.Haunt.country}
                                    </div>
                                </div>

                            </div>
                            <div className='spooking-host-div'>
                                <div id='spooking-host-image' style={{backgroundImage: `url(${spooking.Haunt.User.Images.length ? spooking.Haunt.User.Images[0].url : defaultUserUrl})`}}></div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default FutureSpookings;

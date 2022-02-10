import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOneHaunt } from '../../store/haunts';
import './HauntDetail.css'

const HauntDetail = () => {

    const { hauntId } = useParams();
    const sessionUser = useSelector(state => state.session.user);
    const haunts = useSelector(state => state.haunts);
    const haunt = haunts[hauntId];
    const [ isOwner, setIsOwner ] = useState(false);

    useEffect(() => {
        if (sessionUser) {
            if(sessionUser.id === haunt.userId) {
                setIsOwner(true);
            } else {
                setIsOwner(false);
            }
        }
    }, [sessionUser]);

    const defaultHauntUrl = '/images/hauntedhouse.jpg';
    const defaultUserUrl = '/images/user-icon-lavender.png';

    return (
        <div id='haunt-detail-container'>
            <div id='haunt-detail-info-bar'>
                <div id='haunt-detail-heading'>
                    <h1>{haunt.name}</h1>
                    <h2 id='haunt-detail-location'>
                        {haunt.city}, {haunt.state}, {haunt.country}
                    </h2>
                </div>
                {isOwner && (
                <div id='haunt-detail-owner-buttons'>
                    <Link to={`/haunts/${haunt.id}/edit`} >
                        <button>
                            Edit
                        </button>
                    </Link>
                    <button>
                        Delete
                    </button>
                </div>
                )}
            </div>
            <div id='haunt-detail-image-grid'>
                <div id='haunt-detail-image-one' style={{backgroundImage: `url(${haunt.Images.length ? haunt.Images[0].url : defaultHauntUrl})`}}></div>
                <div id='haunt-detail-image-two' style={{backgroundImage: `url(${haunt.Images.length > 1 ? haunt.Images[1].url : defaultHauntUrl})`}}></div>
                <div id='haunt-detail-image-three' style={{backgroundImage: `url(${haunt.Images.length > 2 ? haunt.Images[2].url : defaultHauntUrl})`}}></div>
                <div id='haunt-detail-image-four' style={{backgroundImage: `url(${haunt.Images.length > 3 ? haunt.Images[3].url : defaultHauntUrl})`}}></div>
                <div id='haunt-detail-image-five' style={{backgroundImage: `url(${haunt.Images.length > 4 ? haunt.Images[4].url : defaultHauntUrl})`}}></div>
            </div>
            <div id='haunt-host-info'>
                <div>
                    <h2>Hosted by {haunt.User.username}</h2>
                </div>
                <div id='haunt-host-image' style={{backgroundImage: `url(${haunt.User.Images.length ? haunt.User.Images[0].url : defaultUserUrl})`}}></div>
            </div>
            <div id='haunt-description'>
                <p>{haunt.description}</p>
            </div>
        </div>
    )
}

export default HauntDetail;

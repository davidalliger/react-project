import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOneHaunt } from '../../store/haunts';
import './HauntDetail.css'

const HauntDetail = () => {

    const { hauntId } = useParams();
    const haunts = useSelector(state => state.haunts);
    const haunt = haunts[hauntId];

    const defaultHauntUrl = '/images/hauntedhouse.jpg';
    const defaultUserUrl = '/images/user-icon-lavender.png';

    console.log(haunt.User);

    return (
        <div id='haunt-detail-container'>
            <h1>{haunt.name}</h1>
            <div id='haunt-detail-info-bar'>
                <span>
                    {haunt.city}, {haunt.state}, {haunt.country}
                </span>
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

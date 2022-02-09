import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOneHaunt } from '../../store/haunts';
import './HauntDetail.css'

const HauntDetail = () => {

    const { hauntId } = useParams();
    const haunts = useSelector(state => state.haunts);
    const haunt = haunts[hauntId];

    return (
        <div id='haunt-detail-container'>
            <h1>{haunt.name}</h1>
            <div id='haunt-detail-info-bar'>
                <span>
                    {haunt.city}, {haunt.state}, {haunt.country}
                </span>
            </div>
            <div id='haunt-detail-image-container'>
                {/* <img src={haunt.Images[0].url} /> */}
            </div>
            <p>Info</p>
            <p>Info</p>
            <p>Info</p>
            <p>Info</p>
            <p>Info</p>
            <p>Info</p>
            <p>Info</p>
            <p>Info</p>
            <p>Info</p>
            <p>Info</p>
            <p>Info</p>
            <p>Info</p>
        </div>
    )
}

export default HauntDetail;

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getHaunts } from '../../store/haunts';
import { Link } from 'react-router-dom';
import './HauntsPage.css';

const HauntsPage = () => {
    const haunts = useSelector(state => state.haunts.list);
    console.log(haunts);

    const defaultUrl = 'images/hauntedhouse.jpg';

    return (
        <div id='haunts-container'>
            {!haunts.length && (
                <div id='no-haunts'>
                    No haunts available right now.
                </div>
            )}
            {haunts.map(haunt => (
                <Link to={`/haunts/${haunt.id}`} className='haunt-link' key={haunt.id}>
                    <div className='haunt-div'>
                        <div className='haunt-image-container'>
                            <img src={haunt.Images.length ? haunt.Images[haunt.Images.length - 1].url : defaultUrl} className='haunt-image' />
                        </div>
                        <div className='haunt-label-div'>
                            <p className='haunt-name'>{haunt.city}, {haunt.state ? haunt.state : haunt.country}</p>
                            <p className='haunt-rate'>${Math.round(haunt.rate)} / night</p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
};

export default HauntsPage;

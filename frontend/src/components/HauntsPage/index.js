import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getHaunts } from '../../store/haunts';
import './HauntsPage.css';

const HauntsPage = () => {
    const dispatch = useDispatch();
    const hauntsList = useSelector(state => state.haunts);
    const haunts = Object.values(hauntsList);

    useEffect(async()=>{
        await dispatch(getHaunts());
    }, [dispatch])

    const defaultUrl = 'images/hauntedhouse.jpg';
    console.log(haunts[0]);

    const hauntImage = haunt => {
        return {
            backgroundImage: `url(${haunt.Images[0].url})`,
        };
    }

    return (
        <div id='haunts-container'>
            {!haunts.length && (
                <div id='no-haunts'>
                    No haunts available right now.
                </div>
            )}
            {haunts.map(haunt => (
                <div key={haunt.id} className='haunt-div'>
                    <div className='haunt-image-div' style={hauntImage(haunt)}></div>
                    <div className='haunt-label-div'>
                        <p className='haunt-name'>{haunt.city}, {haunt.state}</p>
                        <p className='haunt-rate'>${haunt.rate}/night</p>
                    </div>
                </div>
            ))}
        </div>
    )
};

export default HauntsPage;

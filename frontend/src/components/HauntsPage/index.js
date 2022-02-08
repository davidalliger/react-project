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

    return (
        <div id='haunts-container'>
            hello
            {!haunts.length && (
                <div id='no-haunts'>
                    No haunts available right now.
                </div>
            )}
            {haunts.map(haunt => (
                <div key={haunt.id} className='haunt-div'>
                    <img src={haunt.Images[0].url || defaultUrl} />
                    <div className='haunt-label-div'>
                        <p className='haunt-name'>{haunt.name}, {haunt.state}</p>
                        <p>${haunt.rate}/night</p>
                    </div>
                </div>
            ))}
        </div>
    )
};

export default HauntsPage;

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './HauntsPage.css';

const HauntsPage = ({searchTerm, searchCategory}) => {
    const hauntState = useSelector(state => state.haunts.list);
    const [haunts, setHaunts] = useState(hauntState);

    const defaultUrl = 'images/hauntedhouse.jpg';

    useEffect(()=> {
        const regex = new RegExp(searchTerm, 'i');
        console.log(regex);
        if (searchCategory === 'Location') {
            if (searchTerm) {
                const filteredHaunts = hauntState.filter(haunt => regex.test(haunt.country) ||
                                                regex.test(haunt.state) ||
                                                regex.test(haunt.city) ||
                                                regex.test(haunt.address));
                setHaunts(filteredHaunts);
            } else {
                setHaunts(hauntState);
            }
        } else if (searchCategory === 'Name') {
            if (searchTerm) {
                const otherHaunts = hauntState.filter(haunt => regex.test(haunt.name) ||
                                                regex.test(haunt.User.username));
                setHaunts(otherHaunts);
            } else {
                setHaunts(hauntState);
            }
        }
        console.log(haunts);

    }, [searchCategory, searchTerm])

    return (
        <>
            {!haunts.length && (
                <div id='no-haunts'>
                    No haunts available right now.
                </div>
            )}
            <div id='haunts-container'>
                {haunts.map((haunt, index) => (
                    <Link to={`/haunts/${haunt.id}`} className='haunt-link' key={haunt.id}>
                        <div className='haunt-div'>
                            <div className='haunt-image-container'>
                                <img alt={`haunt-${haunt.id}-${index + 1}`} src={haunt.Images.length ? haunt.Images[0].url : defaultUrl} className='haunt-image' />
                            </div>
                            <div className='haunt-label-div'>
                                <p className='haunt-name'>{haunt.city}, {haunt.state ? haunt.state : haunt.country}</p>
                                <p className='haunt-rate'>${Math.round(haunt.rate)} / night</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    )
};

export default HauntsPage;

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './HauntsPage.css';

const HauntsPage = () => {
    const haunts = useSelector(state => state.haunts.list);

    const defaultUrl = 'images/hauntedhouse.jpg';

    return (
        <div id='haunts-container'>
            {!haunts.length && (
                <div id='no-haunts'>
                    No haunts available right now.
                </div>
            )}
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
    )
};

export default HauntsPage;

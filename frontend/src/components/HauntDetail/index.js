import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CreateSpookingForm from '../CreateSpookingForm';
import EditHauntFormModal from '../EditHauntForm';
import DeleteHauntFormModal from '../DeleteHauntForm';
import './HauntDetail.css'

const HauntDetail = ({isLoaded, showLoginModal, setShowLoginModal}) => {
    const { hauntId } = useParams();
    const sessionUser = useSelector(state => state.session.user);
    const haunts = useSelector(state => state.haunts);
    let haunt = haunts[hauntId];
    const [ isOwner, setIsOwner ] = useState(false);
    const [ showEditHauntModal, setShowEditHauntModal ] = useState(false);
    const [ showDeleteHauntModal, setShowDeleteHauntModal ] = useState(false);
    const history = useHistory();

    useEffect(() => {
        if (sessionUser && isLoaded) {
            if(sessionUser.id === haunt.userId) {
                setIsOwner(true);
            } else {
                setIsOwner(false);
            }
        }
    }, [sessionUser, isLoaded]);

    const defaultHauntUrl = '/images/hauntedhouse.jpg';
    const defaultUserUrl = '/images/user-icon-lavender.png';

    const handleDelete = () => {
        history.push('/haunts');
    }

    return (
        <>
            {isLoaded && (
                <div id='haunt-detail-container'>
                    <div id='haunt-detail-info-bar'>
                        <div id='haunt-detail-heading'>
                            <h1>{haunt?.name}</h1>
                            <h2 id='haunt-detail-location'>
                                {haunt?.city}, {haunt?.state && (
                                    <span>{haunt?.state}, </span>
                                )}{haunt?.country}
                            </h2>
                        </div>
                        {isOwner && (
                        <div id='haunt-detail-owner-buttons'>
                            {/* <Link to={`/haunts/${haunt.id}/edit`} > */}
                            <div>
                                <button
                                    id='haunt-detail-edit-button'
                                    className='auth-button'
                                    onClick={()=>setShowEditHauntModal(true)}
                                >
                                    Edit
                                </button>
                            </div>
                            {/* </Link> */}
                            {/* <Link to={`/haunts/${haunt.id}/delete`} > */}
                            <div>
                                <button
                                    id='haunt-detail-delete-button'
                                    className='auth-button'
                                    onClick={()=>setShowDeleteHauntModal(true)}
                                >
                                    Delete
                                </button>
                            </div>
                            {/* </Link> */}
                        </div>
                        )}
                    </div>
                    <div id='haunt-detail-image-grid'>
                        <div id='haunt-detail-image-one' style={{backgroundImage: `url(${haunt?.Images.length ? haunt?.Images[0].url : defaultHauntUrl})`}}></div>
                        <div id='haunt-detail-image-two' style={{backgroundImage: `url(${haunt?.Images.length > 1 ? haunt?.Images[1].url : defaultHauntUrl})`}}></div>
                        <div id='haunt-detail-image-three' style={{backgroundImage: `url(${haunt?.Images.length > 2 ? haunt?.Images[2].url : defaultHauntUrl})`}}></div>
                        <div id='haunt-detail-image-four' style={{backgroundImage: `url(${haunt?.Images.length > 3 ? haunt?.Images[3].url : defaultHauntUrl})`}}></div>
                        <div id='haunt-detail-image-five' style={{backgroundImage: `url(${haunt?.Images.length > 4 ? haunt?.Images[4].url : defaultHauntUrl})`}}></div>
                    </div>
                    <div id='haunt-detail-info-area'>
                        <div id='haunt-detail-text'>
                            <div id='haunt-host-info'>
                                <div>
                                    <h2>Hosted by {haunt?.User.username}</h2>
                                </div>
                                <div id='haunt-host-image' style={{backgroundImage: `url(${haunt?.User.Images.length ? haunt?.User.Images[0].url : defaultUserUrl})`}}></div>
                            </div>
                            <div id='haunt-description'>
                                <p>{haunt?.description}</p>
                            </div>
                        </div>
                        <div>
                            {(!sessionUser || sessionUser.id !== haunt?.userId) && (
                                <CreateSpookingForm haunt={haunt} showLoginModal={showLoginModal} setShowLoginModal={setShowLoginModal} />
                            )}
                        </div>
                    </div>
                </div>
            )}
            <EditHauntFormModal showEditHauntModal={showEditHauntModal} setShowEditHauntModal={setShowEditHauntModal} />
            <DeleteHauntFormModal showDeleteHauntModal={showDeleteHauntModal} setShowDeleteHauntModal={setShowDeleteHauntModal} handleDelete={handleDelete} />
        </>
    )
}

export default HauntDetail;

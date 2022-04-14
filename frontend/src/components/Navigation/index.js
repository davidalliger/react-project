import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import AddHauntFormModal from '../AddHauntForm';
import './Navigation.css';

const Navigation = ({isLoaded}) => {
    const sessionUser = useSelector(state => state.session.user)
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showSignupModal, setShowSignupModal] = useState(false);
    const [showAddHauntModal, setShowAddHauntModal] = useState(false);

    const hostClick = () => {
        if (sessionUser) {
            setShowAddHauntModal(true);
        } else {
            setShowLoginModal(true);
        }
    }

    return (
        <>
            {isLoaded && (
                <nav id='nav-bar' className='normal'>
                    <div id='nav-container'>
                        <div id='nav-title-div'>
                            <NavLink exact to='/' id='nav-title-link'>
                                    <img src='/images/logo-white-20.png' id='nav-logo' />
                                    scarebnb
                            </NavLink>
                        </div>
                        <div id='nav-middle-div'>
                            <NavLink to='/haunts'>
                                <button id='nav-find-haunt'>
                                    Search for haunts
                                </button>
                            </NavLink>
                        </div>
                        <div id='nav-user-div'>
                            {/* <NavLink exact to='/haunts/new' id='nav-title-link'> */}
                            <button id='nav-share-haunt' onClick={hostClick}>
                                Host a ghost
                            </button>
                            {/* </NavLink> */}
                            <ProfileButton sessionUser={sessionUser} showLoginModal={showLoginModal} setShowLoginModal={setShowLoginModal} showSignupModal={showSignupModal} setShowSignupModal={setShowSignupModal} setShowAddHauntModal={setShowAddHauntModal}/>
                        </div>
                    </div>
                </nav>
            )}
            <LoginFormModal showLoginModal={showLoginModal} setShowLoginModal={setShowLoginModal} setShowSignupModal={setShowSignupModal} />
            <SignupFormModal showSignupModal={showSignupModal} setShowSignupModal={setShowSignupModal} setShowLoginModal={setShowLoginModal} />
            <AddHauntFormModal showAddHauntModal={showAddHauntModal} setShowAddHauntModal={setShowAddHauntModal} />
        </>
    );
}

export default Navigation;

import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import AddHauntFormModal from '../AddHauntForm';
import './Navigation.css';

const Navigation = ({isLoaded, showLoginModal, setShowLoginModal, showSignupModal, setShowSignupModal, searchTerm, setSearchTerm, searchCategory, setSearchCategory}) => {
    const sessionUser = useSelector(state => state.session.user)
    const [showAddHauntModal, setShowAddHauntModal] = useState(false);
    const [placeholder, setPlaceholder] = useState('')
    const location = useLocation()

    const hostClick = () => {
        if (sessionUser) {
            setShowAddHauntModal(true);
        } else {
            setShowLoginModal(true);
        }
    }

    useEffect(()=> {
        if (location.pathname !== '/haunts') {
            setSearchTerm('');
        }
    }, [location])

    const handleSubmit = e => {
        e.preventDefault();
        if (searchTerm === '') {
            setPlaceholder('Please enter a search term.')
        }
    }

    const handleType = e => {
        setSearchTerm(e.target.value);
        setPlaceholder('');
    }

    let middleDiv;
    if (location.pathname === '/haunts') {
        middleDiv = (
            <div id='nav-search-bar'>
                <form id='nav-search-form'
                    onSubmit={handleSubmit}
                >
                    <div id='nav-search-by'>
                        <div id='nav-search-select'>
                            Search by
                        </div>
                        <div id='nav-search-dropdown-div'>
                            <select id='nav-search-dropdown'
                                name='nav-search-category'
                                onChange={e => setSearchCategory(e.target.value)}
                                value={searchCategory}
                            >
                                <option
                                    value='Location'
                                >
                                    Location
                                </option>
                                <option
                                    value='Name'
                                >
                                    Name
                                </option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <input type='text' id='nav-search-field'
                            onChange={handleType}
                            value={searchTerm}
                            placeholder={placeholder}
                        />
                    </div>
                    <div id='nav-search-icon'>
                        <button id='nav-search-button'><i className="fa-solid fa-magnifying-glass"></i></button>
                    </div>
                </form>
            </div>
        )
    } else {
        middleDiv = (
            <NavLink to='/haunts'>
                <button id='nav-find-haunt'>
                    Search for haunts
                </button>
            </NavLink>
        )
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
                            {middleDiv}
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

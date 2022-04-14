import { useState } from 'react';
import LoginForm from "./LoginForm";
import Modal from '../Modal';

const LoginFormModal = ({ showLoginModal, setShowLoginModal }) => {
    // const [showModal, setShowModal] = useState(false);
    // const handleClick = () => {
    //     setShowModal(true);
    //     // setShowMenu(false);
    // }

    return (
        <>
            {showLoginModal && (
                <Modal onClose={()=> setShowLoginModal(false)}>
                    <LoginForm  setShowLoginModal={setShowLoginModal} />
                </Modal>
            )}
        </>
    )
}

export default LoginFormModal;

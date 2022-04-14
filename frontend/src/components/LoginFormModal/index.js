import LoginForm from "./LoginForm";
import Modal from '../Modal';

const LoginFormModal = ({ showLoginModal, setShowLoginModal, setShowSignupModal }) => {
    return (
        <>
            {showLoginModal && (
                <Modal onClose={()=> setShowLoginModal(false)}>
                    <LoginForm  setShowLoginModal={setShowLoginModal} setShowSignupModal={setShowSignupModal} />
                </Modal>
            )}
        </>
    )
}

export default LoginFormModal;

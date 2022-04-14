import SignupForm from "./SignupForm";
import Modal from '../Modal';

const SignupFormModal = ({ showSignupModal, setShowSignupModal, setShowLoginModal }) => {
    return (
        <>
            {showSignupModal && (
                <Modal onClose={()=> setShowSignupModal(false)}>
                    <SignupForm  setShowSignupModal={setShowSignupModal} setShowLoginModal={setShowLoginModal}/>
                </Modal>
            )}
        </>
    )
}

export default SignupFormModal;

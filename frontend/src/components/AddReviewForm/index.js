import AddReviewForm from "./AddReviewForm";
import Modal from '../Modal';

const AddReviewFormModal = ({ showAddReviewModal, setShowAddReviewModal }) => {
    return (
        <>
            {showAddReviewModal && (
                <Modal onClose={()=> setShowAddReviewModal(false)}>
                    <AddReviewForm setShowAddReviewModal={setShowAddReviewModal} />
                </Modal>
            )}
        </>
    )
}

export default AddReviewFormModal;

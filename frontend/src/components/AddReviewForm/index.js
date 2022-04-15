import AddReviewForm from "./AddReviewForm";
import Modal from '../Modal';

const AddReviewFormModal = ({ showAddReviewModal, setShowAddReviewModal, haunt}) => {
    return (
        <>
            {showAddReviewModal && (
                <Modal onClose={()=> setShowAddReviewModal(false)}>
                    <AddReviewForm setShowAddReviewModal={setShowAddReviewModal} haunt={haunt} />
                </Modal>
            )}
        </>
    )
}

export default AddReviewFormModal;

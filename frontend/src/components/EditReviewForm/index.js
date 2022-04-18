import EditReviewForm from "./EditReviewForm";
import Modal from '../Modal';

const EditReviewFormModal = ({ showEditReviewModal, setShowEditReviewModal, haunt, review}) => {
    return (
        <>
            {showEditReviewModal && (
                <Modal onClose={()=> setShowEditReviewModal(false)}>
                    <EditReviewForm setShowEditReviewModal={setShowEditReviewModal} haunt={haunt} review={review} />
                </Modal>
            )}
        </>
    )
}

export default EditReviewFormModal;

import DeleteReviewForm from "./DeleteReviewForm";
import Modal from '../Modal';

const DeleteReviewFormModal = ({ showDeleteReviewModal, setShowDeleteReviewModal, handleDelete, review }) => {
    return (
        <>
            {showDeleteReviewModal && (
                <Modal onClose={()=> setShowDeleteReviewModal(false)}>
                    <DeleteReviewForm setShowDeleteReviewModal={setShowDeleteReviewModal} handleDelete={handleDelete} review={review}/>
                </Modal>
            )}
        </>
    )
}

export default DeleteReviewFormModal;

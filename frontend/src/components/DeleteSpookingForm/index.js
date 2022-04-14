import DeleteSpookingForm from "./DeleteSpookingForm";
import Modal from '../Modal';

const DeleteSpookingFormModal = ({ showDeleteSpookingModal, setShowDeleteSpookingModal, handleDelete }) => {
    return (
        <>
            {showDeleteSpookingModal && (
                <Modal onClose={()=> setShowDeleteSpookingModal(false)}>
                    <DeleteSpookingForm setShowDeleteSpookingModal={setShowDeleteSpookingModal} handleDelete={handleDelete} />
                </Modal>
            )}
        </>
    )
}

export default DeleteSpookingFormModal;

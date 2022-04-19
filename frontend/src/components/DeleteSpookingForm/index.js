import DeleteSpookingForm from "./DeleteSpookingForm";
import Modal from '../Modal';

const DeleteSpookingFormModal = ({ showDeleteSpookingModal, setShowDeleteSpookingModal, handleDelete, spooking }) => {
    return (
        <>
            {showDeleteSpookingModal && (
                <Modal onClose={()=> setShowDeleteSpookingModal(false)}>
                    <DeleteSpookingForm setShowDeleteSpookingModal={setShowDeleteSpookingModal} handleDelete={handleDelete} spooking={spooking} />
                </Modal>
            )}
        </>
    )
}

export default DeleteSpookingFormModal;

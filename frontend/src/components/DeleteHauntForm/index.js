import DeleteHauntForm from "./DeleteHauntForm";
import Modal from '../Modal';

const DeleteHauntFormModal = ({ showDeleteHauntModal, setShowDeleteHauntModal, handleDelete }) => {
    return (
        <>
            {showDeleteHauntModal && (
                <Modal onClose={()=> setShowDeleteHauntModal(false)}>
                    <DeleteHauntForm setShowDeleteHauntModal={setShowDeleteHauntModal} handleDelete={handleDelete} />
                </Modal>
            )}
        </>
    )
}

export default DeleteHauntFormModal;

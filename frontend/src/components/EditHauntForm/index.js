import EditHauntForm from "./EditHauntForm";
import Modal from '../Modal';

const EditHauntFormModal = ({ showEditHauntModal, setShowEditHauntModal }) => {
    return (
        <>
            {showEditHauntModal && (
                <Modal onClose={()=> setShowEditHauntModal(false)}>
                    <EditHauntForm setShowEditHauntModal={setShowEditHauntModal} />
                </Modal>
            )}
        </>
    )
}

export default EditHauntFormModal;

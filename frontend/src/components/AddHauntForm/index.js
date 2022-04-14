import AddHauntForm from "./AddHauntForm";
import Modal from '../Modal';

const AddHauntFormModal = ({ showAddHauntModal, setShowAddHauntModal }) => {
    return (
        <>
            {showAddHauntModal && (
                <Modal onClose={()=> setShowAddHauntModal(false)}>
                    <AddHauntForm setShowAddHauntModal={setShowAddHauntModal} />
                </Modal>
            )}
        </>
    )
}

export default AddHauntFormModal;

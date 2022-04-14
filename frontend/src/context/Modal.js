import { createContext, useContext, useRef, useState, useEffect } from 'react';
import './Modal.css';

export const ModalContext = createContext();
export const useModal = () => useContext(ModalContext);

const ModalProvider = ({children}) => {
    const [value, setValue] = useState();
    const modalRef = useRef();

    useEffect(() => {
        setValue(modalRef.current);
    }, []);

    return (
        <>
            <ModalContext.Provider value={value}>
                {children}
            </ModalContext.Provider>
            <div ref={modalRef} />
        </>
    )
}

export default ModalProvider;

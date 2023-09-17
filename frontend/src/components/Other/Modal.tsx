import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideModal, selectIsModalVisible, selectModalProps, selectModalType } from '../../store/slices/other/modalSlice';

type DefaultModalProps = {
    // Some default props here if there are any
};

type InfoModalProps = DefaultModalProps & {
    // Specific props for InfoModal
};

type ConfirmModalProps = DefaultModalProps & {
    // Specific props for ConfirmModal
};

const InfoModal: React.FC<InfoModalProps> = () => {
    return <div>Info Modal</div>;
}

const ConfirmModal: React.FC<ConfirmModalProps> = () => {
    return <div>Confirmation Modal</div>;
}

// Sample modal types
const MODAL_COMPONENTS: {
    INFO_MODAL: React.FC<InfoModalProps>;
    CONFIRM_MODAL: React.FC<ConfirmModalProps>;
    // Add other modal types here
} = {
    INFO_MODAL: InfoModal,
    CONFIRM_MODAL: ConfirmModal,
    // Add other modal instances here
};

const Modal: React.FC = () => {
    const dispatch = useDispatch();
    const isVisible = useSelector(selectIsModalVisible);
    const modalType = useSelector(selectModalType);
    const modalProps = useSelector(selectModalProps);
    
    if (!isVisible || !modalType) return null;

    const SpecificModal = MODAL_COMPONENTS[modalType];
    if (!SpecificModal) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
            <SpecificModal {...(typeof modalProps === 'object' && modalProps !== null ? modalProps : {})} />
                <button onClick={() => dispatch(hideModal())}>Close</button>
            </div>
        </div>
    );
}

export default Modal;


import React from 'react';
import '../css/Modal.css'

const Modal = ({open, onClose}) => {
    if (!open) return null;

    return (
        <div className='modalContainer'>
            <div className='disclaimer'>
                <h3 className='disclaimer-title'>Thanks for checking out my solo project!</h3>

                <div className='disclaimer-description'>
                    <p>Unfortunately, this is not a real website.</p>
                    <p>These tickets are not real and cannot be used anywhere.</p>
                    <p>Do not buy anything!</p>
                </div>
            </div>

            <button className='closeBtn' onClick={onClose}>
                I understand
            </button>
        </div>
    );
}

export default Modal;
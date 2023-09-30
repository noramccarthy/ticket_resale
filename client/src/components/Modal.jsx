import React from 'react';

const Modal = ({open, onClose}) => {
    if (!open) return null;

    return (
        <div onClick={onClose} className='overlay'>
                <div
                    onClick={(e) => {
                    e.stopPropagation();
                    }}
                    className='modalContainer'
                >
                
                <div className='modalRight'>
                    <p className='closeBtn' onClick={onClose}>
                        X
                    </p>
                    <div className='content'>
                        <p>Do you want a</p>
                        <h1>$20 CREDIT</h1>
                        <p>for your first tade?</p>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}

export default Modal;
'use client';


interface ModalProps {
  children: React.ReactNode;
  title: string;
  id: string;
  buttonLabel: string;
  buttonClass?: string;
  submittable?: boolean;
  submitLabel?: string;
  handleClick?: () => void;
  disabled?: boolean;
  handleOpen?: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, title, id, buttonLabel, buttonClass, disabled, submittable, submitLabel, handleClick, handleOpen }) => {
  return (
    <>
      <label htmlFor={id}  className={buttonClass || 'btn btn-primary btn-xs md:btn-sm'}>
        {buttonLabel}
      </label>
      <input type='checkbox' onClick={handleOpen} id={id} className='modal-toggle' />
      <div className='modal modal-middle sm:modal-middle'>
        <div className='modal-box flex flex-col items-center'>
          <h3 className='font-bold text-lg'>{title}</h3>
          {children}
          <div className='modal-action flex flex-row items-center'>
            {submittable && <button onClick={handleClick} disabled={disabled} className="btn btn-sm">{submitLabel}</button>}
            <label htmlFor={id} className='btn btn-sm'>
              Close
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;

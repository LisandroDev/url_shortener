'use client';

interface ModalProps {
  children: React.ReactNode;
  title: string;
  id: string;
}

const Modal: React.FC<ModalProps> = ({ children, title, id }) => {
  return (
    <>
      <label htmlFor={id} className='btn btn-info'>
        Open Modal
      </label>
      <input type='checkbox' id={id} className='modal-toggle' />
      <div className='modal modal-bottom sm:modal-middle'>
        <div className='modal-box flex flex-col items-center'>
          <h3 className='font-bold text-lg'>{title}</h3>
          {children}
          <div className='modal-action flex flex-col items-center'>
            <label htmlFor={id} className='btn'>
              Close
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;

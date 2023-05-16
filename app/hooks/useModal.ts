import { useState } from 'react';

const useModal = () => {
  const [visible, setVisible] = useState<boolean>(false);

  const toggleModal = () => {
    setVisible(!visible);
  };

  return { toggleModal, visible };
};

export default useModal;

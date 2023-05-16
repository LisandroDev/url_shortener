import { IconType } from 'react-icons';

interface AuthSocialButtonProps {
  icon: IconType;
  onClick: () => void;
}

const AuthSocialButton: React.FC<AuthSocialButtonProps> = ({
  icon: Icon,
  onClick,
}) => {
  return (
    <button
      type='button'
      onClick={onClick}
      className='
            inline-flex
            btn
            btn-outline
            justify-center 
            rounded-md 
            px-4 
            py-2 
            shadow-sm 
            btn-md
            w-1/2
            focus:outline-offset-0
          '
    >
      <Icon size={22}/>
    </button>
  );
};

export default AuthSocialButton
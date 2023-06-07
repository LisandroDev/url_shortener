import ThemeButton from './themeButton/themeButton';
import User from './user/User';
import Link from 'next/link';
import Image from 'next/image';
import logo from './logo.svg'

const Navbar = () => {

  return (

    <header className="navbar bg-base-300">
  <div className="flex-1">
  <Link href="/" className="btn btn-ghost normal-case sm:text-sm md:text-xl">
        UrlShortener
        <Image src={logo} width={30} height={30} alt='url shortener logo' />
      </Link>
  </div>
  <div className="flex-none gap-2 mr-8">
  <ThemeButton />
    <User />
  </div>
</header>
  );
};

export default Navbar;

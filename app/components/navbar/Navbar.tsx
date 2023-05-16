import ThemeButton from './themeButton/themeButton';
import User from './user/User';

const Navbar = () => {

  return (

    <div className="navbar bg-base-300">
  <div className="flex-1">
  <a href="/" className="btn btn-ghost normal-case sm:text-sm md:text-xl">
        UrlShortener
      </a>
  </div>
  <div className="flex-none gap-2 mr-8">
  <ThemeButton />
    <User />
  </div>
</div>
  );
};

export default Navbar;

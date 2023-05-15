import ThemeButton from "./themeButton/themeButton";

const Navbar = () => {
  return (
    <nav className="navbar bg-base-300 ">
      <a className="btn btn-ghost normal-case sm:text-sm md:text-xl">
        UrlShortener
      </a>
      <ThemeButton />
    </nav>
  );
};

export default Navbar;

const Navbar = () => {
  return (
    <nav className="fixed left-0 top-0 z-50 w-full bg-white/80 shadow-sm backdrop-blur-sm">
      <div className="px-4 py-1 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between md:h-20">
          <a
            href="/"
            className="flex items-center transition-opacity duration-300 hover:opacity-80"
          >
            <img
              src="/Online_bla.svg"
              alt="Online Logo"
              className="h-8 w-auto md:h-12"
            />
          </a>

          <a
            href="/"
            className="flex items-center transition-opacity duration-300 hover:opacity-80"
          >
            <img
              src="/mkvg_small.png"
              alt="MKVG Logo"
              className="h-24 w-auto"
            />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

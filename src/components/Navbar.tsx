import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="fixed left-0 top-0 z-50 w-full bg-white/80 shadow-sm backdrop-blur-sm">
      <div className="px-4 py-1 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between md:h-20">
          <Link
            href="/"
            className="flex items-center transition-opacity duration-300 hover:opacity-80"
          >
            <Image
              src="/Online_bla.svg"
              alt="Online Logo"
              height={100}
              width={100}
              className="h-8 w-auto md:h-12"
            />
          </Link>

          <Link
            href="/"
            className="flex items-center transition-opacity duration-300 hover:opacity-80"
          >
            <Image
              src="/mkvg_small.png"
              height={100}
              width={100}
              alt="MKVG Logo"
              className="h-24 w-auto py-3"
            />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

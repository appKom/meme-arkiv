"use client";
import Link from "next/link";
import Image from "next/image";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "./ThemeContext";

const Navbar = () => {
  const { theme } = useTheme();
  const onlineLogoSrc =
    theme === "dark" ? "/Online_hvit.svg" : "/Online_bla.svg";

  return (
    <nav className="fixed left-0 top-0 z-50 w-full bg-white/80 dark:bg-slate-950/80 shadow-sm backdrop-blur-sm">
      <div className="px-4 py-1 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between md:h-20">
          <Link
            href="/"
            className="flex items-center transition-opacity duration-300 hover:opacity-80"
          >
            <Image
              src={onlineLogoSrc}
              alt="Online Logo"
              height={100}
              width={100}
              className="h-8 w-auto md:h-12"
            />
          </Link>
          <div className="flex flex-row gap-4 items-center">
            <ThemeToggle />
            <a
              href="https://app.slack.com/client/T03S8TX18/C01DG6JFNSG"
              className="items-center transition-opacity duration-300 hover:opacity-80 hidden md:flex"
            >
              <Image
                src="/mkvg_small.png"
                height={100}
                width={100}
                alt="MKVG Logo"
                className="h-16 w-16 py-3 object-cover bg-white/70 rounded-full"
              />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

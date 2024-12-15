import { Mail, ExternalLink, Bug } from "lucide-react";
import Image from "next/image";
import { SiSlack, SiFacebook, SiInstagram, SiGithub } from "react-icons/si";

const footerLinks = [
  { name: "Slack", icon: <SiSlack />, link: "https://onlinentnu.slack.com/" },
  {
    name: "Facebook",
    icon: <SiFacebook />,
    link: "http://facebook.com/LinjeforeningenOnline",
  },
  {
    name: "Instagram",
    icon: <SiInstagram />,
    link: "https://www.instagram.com/online_ntnu/",
  },
  { name: "Github", icon: <SiGithub />, link: "https://github.com/appKom" },
];

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-gray-300 bg-zinc-50 px-4 py-12 text-gray-700 md:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col items-center justify-between space-y-8 md:flex-row md:space-y-0">
          <div className="flex flex-col items-center space-y-4 md:items-start">
            <h2 className="text-2xl font-bold">Meme Arkiv</h2>
            <a
              href="mailto:onlinefondet@online.ntnu.no"
              className="hover:text-online-orange flex cursor-pointer items-center gap-2 transition-colors"
            >
              <Mail size={18} />
              appkom@online.ntnu.no
            </a>
          </div>

          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLScvjEqVsiRIYnVqCNqbH_-nmYk3Ux6la8a7KZzsY3sJDbW-iA/viewform"
            target="_blank"
            rel="noreferrer"
            className="flex h-full max-h-min items-center justify-center gap-3 rounded-lg bg-[#f3f4f6] p-1.5"
          >
            <div className="p-1 text-center text-gray-600">
              <div className="flex items-center justify-center gap-2">
                <p className="text-lg font-semibold">Debug</p>
                <Bug className="w-5" />
              </div>
              <p className="text-sm">Opplevd noe ugreit?</p>
              <p className="text-sm">Trykk her for mer info</p>
            </div>
          </a>

          <div className="flex flex-col items-center space-y-4 md:items-end">
            <div className="flex space-x-4">
              {footerLinks.map((link, index) => (
                <a
                  href={link.link}
                  key={index}
                  className="hover:text-online-orange cursor-pointer transition"
                  aria-label={link.name}
                >
                  {link.icon}
                </a>
              ))}
            </div>
            <div className="text-center text-sm md:text-right">
              <p>Skjedd en feil?</p>
              <a
                href="mailto:appkom@online.ntnu.no"
                className="hover:text-online-orange flex items-center justify-center space-x-1 transition hover:underline md:justify-end"
              >
                <span>Ta kontakt med Appkom</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between space-y-6 border-t border-gray-300 py-8 md:flex-row md:space-y-0">
          <div className="flex items-center space-x-6">
            <a
              href="https://online.ntnu.no/"
              target="_blank"
              className="transition hover:opacity-50"
            >
              <Image
                src={"/Online_bla.svg"}
                alt="Online logo"
                width={128}
                height={34}
              />
            </a>
          </div>
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Online Opptak reservert.
          </p>
        </div>
      </div>
    </footer>
  );
}

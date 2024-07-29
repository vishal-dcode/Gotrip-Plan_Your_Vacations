import { FaGithubAlt } from 'react-icons/fa';
import { FaLinkedinIn } from 'react-icons/fa';
import { FaMediumM } from 'react-icons/fa';

import logo from '../assets/gotrip.svg';

const links = [
  {
    icons: <FaLinkedinIn />,
    url: ''
  },
  {
    icons: <FaMediumM />,
    url: ''
  },
  {
    icons: <FaGithubAlt />,
    url: ''
  }
];
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border border-t-black border-x-0 border-b-0 p-5 xl:p-10 flex justify-between gap-5">
      <div className="flex flex-col items-start justify-between">
        <img src={logo} alt="Logo" className="h-12" />
        <p>© {year} All Rights Reserved</p>
      </div>
      <div className="text-right">
        <div className="mb-10">
          <h4 className="font-bold text-lg">About us</h4>
          <p className="max-w-[60ch]">
            At Gotrip, we believe that travel is not just about visiting new places, but about creating unforgettable
            memories and enriching lives. Our mission is to empower travelers to explore the world, share their
            experiences, and connect with fellow adventurers.
          </p>
        </div>

        {links.map((link, idx) => (
          <div key={idx} className="flex  float-end">
            <a href={link.url} className="text-lg ml-2">
              {link.icons}
            </a>
          </div>
        ))}
      </div>
    </footer>
  );
}

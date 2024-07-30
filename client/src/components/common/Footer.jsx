import { FaGithubAlt } from 'react-icons/fa';
import { FaLinkedinIn } from 'react-icons/fa';
import { FaMediumM } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import logo from '../../assets/gotrip.svg';

const links = [
  {
    icons: <FaLinkedinIn />,
    url: 'https://www.linkedin.com/in/vishal-s-vishwakarma/'
  },
  {
    icons: <FaMediumM />,
    url: 'https://medium.com/@vishaaal'
  },
  {
    icons: <FaGithubAlt />,
    url: 'https://github.com/vishal-dcode'
  }
];
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border border-top">
      <section className="flex flex-col  justify-between gap-5 p-5 xl:pt-10">
        <div className="flex gap-5 items-start justify-between max-sm:flex-col">
          <img src={logo} alt="Logo" className="h-12 max-xl:mt-2" />
          <div className="mb-5 sm:text-right">
            <h4 className="font-bold text-lg">About us</h4>
            <p className="max-w-[70ch]">
              At Gotrip, we believe that travel is not just about visiting new places, but about creating unforgettable
              memories and enriching lives. Our mission is to empower travelers to explore the world, share their
              experiences, and connect with fellow adventurers.
            </p>
          </div>
        </div>
        <div className="">
          <nav className="flex font-semibold items-center justify-between">
            <div className="flex gap-4">
              <Link to="/terms" className="hover:text-primary-400 whitespace-nowrap">
                Terms and conditions
              </Link>
              <a className="hover:text-primary-400" href="https://vishaal.vercel.app/">
                Portfolio
              </a>
            </div>
            <div>
              {links.map((link, idx) => (
                <div key={idx} className="flex float-end">
                  <a href={link.url} target="_blank" className="text-lg ml-2 hover:text-primary-400">
                    {link.icons}
                  </a>
                </div>
              ))}
            </div>
          </nav>
        </div>
      </section>
      <div className="bg-primary-400 text-sm text-white py-2 px-5 border-top">
        <p>© {year} All Rights Reserved</p>
      </div>
    </footer>
  );
}

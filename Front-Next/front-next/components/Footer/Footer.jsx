"use client";
import Link from "next/link";
import Logo from "../Navbar/Logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Mobfooter from "./Mobfooter";
import { socialLinks, contactNumbers, FooterLinks } from "@/data/Data";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <div
        onClick={() => {
          window.scroll({ top: 0, behavior: "smooth" });
        }}
        className="hover:cursor-pointer bg-gray-50 w-full flex items-center justify-center text-2xl py-3 text-gray-800/60 border-gray-300 border-y-[1px]"
      >
        <p>Back To Top</p>
      </div>
      <footer className=" pt-8 bg-gray-50">
        <div className="flex md:flex-row flex-col items-center justify-center container m-auto md:items-start">
          <div className="flex flex-col items-center justify-center">
            <Logo />
            <div className="flex flex-col mb-6 items-start justify-start">
              <h3 className="text-4xl font-bold leading-snug w-full">
                Let’s get in touch
              </h3>
              <p className="text-lg text-gray-700 text-start max-w-md my-3">
                Sign up for our newsletter to stay updated with the latest news,
                exclusive offers, and special promotions!
              </p>
              <form
                action="/subscribe"
                method="POST"
                className="flex rounded-xl bg-gray-200 items-center border-2 border-gray-500 overflow-hidden w-full max-w-md"
              >
                <span className="px-3 text-gray-500">
                  <FontAwesomeIcon icon={faEnvelope} />
                </span>
                <input
                  type="email"
                  name="email"
                  placeholder="Input your email"
                  className="flex-grow px-3 bg-gray-200 py-2 outline-none text-gray-700"
                  required
                />
                <button
                  type="submit"
                  className="hover:cursor-pointer hover:scale-105 main-bg-color px-4 py-2 text-black font-semibold hover:bg-yellow-500 transition"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          <div className="lg:flex container m-auto hidden justify-evenly items-start mb-6">
            {FooterLinks.map((section, index) => (
              <ul
                key={index}
                className="flex flex-col text-[14px] gap-3 justify-start items-start"
              >
                <h3 className="font-bold text-[20px]">{section.title}</h3>
                {section.links.map((link, i) => (
                  <li
                    key={i}
                    className="hover:scale-120 hover-main transition-transform"
                  >
                    {link.external ? (
                      <a
                        href={link.path}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.name}
                      </a>
                    ) : (
                      <Link href={link.path}>{link.name}</Link>
                    )}
                  </li>
                ))}
              </ul>
            ))}

            <ul>
              <h3 className="text-[20px] font-bold">Our Socials</h3>
              <a
                href="mailto:Info@alhayl.com"
                className="hover-main hover:scale-120 transition-all"
              >
                Info@alhayl.com
              </a>
              <div className="flex w-full justify-between mt-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    className={`${social.color} hover:scale-110 transition`}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FontAwesomeIcon icon={social.icon} />
                  </a>
                ))}
              </div>

              <div className="mt-6">
                <h3 className="text-[20px] font-bold">Call Us</h3>
                {contactNumbers.map((num, index) => (
                  <a
                    key={index}
                    href={`tel:${num}`}
                    className="hover:scale-120 hover-main transition-transform font-bold"
                  >
                    {num}
                  </a>
                ))}
              </div>
            </ul>
          </div>
        </div>

        <div className="lg:hidden ">
          <Mobfooter />
        </div>

        {/* <div className="w-full flex items-center justify-center text-2xl py-3 "> */}

        <div className="w-full bg-gray-50  text-gray-800/60 text-center text-sm py-3 mt-6 border-gray-300 border-y-[1px] ">
          <span>© {currentYear} www.Elhayl.com, All Rights Reserved.</span>
        </div>
      </footer>
    </>
  );
}

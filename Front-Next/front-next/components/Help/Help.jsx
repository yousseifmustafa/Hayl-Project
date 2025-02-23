"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import { MdOutlineContactSupport } from "react-icons/md";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { socialLinks, contactNumbers } from "../../Data/Data";

export default function Help() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    let timer;
    if (isHovered || isOpen) {
      setShowTooltip(true);
    } else {
      timer = setTimeout(() => setShowTooltip(false), 200);
    }
    return () => clearTimeout(timer);
  }, [isHovered, isOpen]);

  const toggleOpen = useCallback(() => setIsOpen((prev) => !prev), []);
  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  const socialLinksRender = useMemo(
    () =>
      socialLinks.map((social, index) =>
        social.url ? (
          <Link key={index} href={social.url} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={social.icon} size="lg" className="text-white hover:opacity-80" />
          </Link>
        ) : null
      ),
    []
  );

  const contactNumbersRender = useMemo(
    () =>
      contactNumbers.map((num, index) => (
        <a key={index} href={`tel:${num}`} className="block text-blue-300 font-bold hover:underline">
          {num}
        </a>
      )),
    []
  );

  return (
    <div className="fixed bottom-14 right-4 flex items-center gap-2 z-[100000]">
      {showTooltip && (
        <div
          className="relative bg-gray-800 text-white px-4 py-2 rounded-lg text-sm shadow-lg max-w-[200px] text-center leading-relaxed"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {isOpen && (
            <button className="absolute top-1 right-2 text-gray-300 hover:text-white text-lg" onClick={toggleOpen}>
              &times;
            </button>
          )}

          {isOpen ? (
            <>
              <h3 className="text-[18px] font-bold mb-2">Our Socials</h3>
              <a href="mailto:Info@alhayl.com" className="text-blue-300 hover:underline block mb-2">
                Info@alhayl.com
              </a>
              <div className="flex justify-center gap-4 my-2">{socialLinksRender}</div>
              <h3 className="text-[18px] font-bold mt-2">Call Us</h3>
              {contactNumbersRender}
            </>
          ) : (
            <>Need Help? <br /> Please press the button to contact us.</>
          )}

          <div className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-gray-800 rotate-45"></div>
        </div>
      )}

      <button
        className="bg-custom-yellow-4 text-white w-14 h-14 flex items-center justify-center rounded-full shadow-lg hover:opacity-90 transition-opacity duration-200"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={toggleOpen}
      >
        <MdOutlineContactSupport size={24} />
      </button>
    </div>
  );
}

"use client";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { useState } from "react";
import { FooterLinks, socialLinks, contactNumbers } from "@/data/Data";

export default function Mobfooter() {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="flex flex-col w-full justify-start items-start pb-6 p-4 rounded-lg">
      {FooterLinks.map((section, index) => (
        <div key={index} className="w-full border-b border-gray-300 py-3">
          <h3
            className="font-bold text-lg cursor-pointer flex justify-between items-center"
            onClick={() => toggleSection(section.title)}
          >
            {section.title}

            {openSection === section.title ? <FaMinus /> : <FaPlus />}
          </h3>
          {openSection === section.title && (
            <ul className="flex flex-col text-sm gap-3 mt-2">
              {section.links.map((link, i) => (
                <li key={i} className="hover-main transition-all">
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
          )}
        </div>
      ))}

      {/* Call Us Section */}
      <div className="w-full py-3 border-b border-gray-300">
        <h3
          className="font-bold text-lg cursor-pointer flex justify-between items-center"
          onClick={() => toggleSection("CALL US")}
        >
          CALL US
          {openSection === "CALL US" ? <FaMinus /> : <FaPlus />}
        </h3>
        {openSection === "CALL US" && (
          <ul className="flex flex-col text-sm gap-3 mt-2">
            {contactNumbers.map((num, index) => (
              <li key={index} className="hover-main transition-all font-bold">
                <a href={`tel:${num}`}>{num}</a>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Social Icons */}
      <div className="w-full py-3">
        <h3 className="font-bold text-lg mb-2">Our Socials</h3>
        <div className="flex space-x-4">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`${social.color} hover:scale-110 transition`}
            >
              <FontAwesomeIcon icon={social.icon} size="lg" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

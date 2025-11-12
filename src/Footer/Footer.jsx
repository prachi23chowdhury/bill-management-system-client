import React from "react";
import {  Mail } from "lucide-react";
import { BsInstagram, BsTwitterX } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-10">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Logo & Site Name */}
        <div>
          <h2 className="text-2xl font-bold text-white">PayWise Bill</h2>
          <p className="mt-2 text-sm">
            Simplify your billing experience — track, pay, and manage bills effortlessly.
          </p>

          {/* Social Icons */}
          <div className="flex space-x-4 mt-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition"
            >
              <FaFacebook size={22} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500 transition"
            >
              <BsInstagram size={22} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sky-400 transition"
            >
              <BsTwitterX size={22} />
            </a>
            <a
              href="mailto:info@paywisebill.com"
              className="hover:text-green-400 transition"
            >
              <Mail size={22} />
            </a>
          </div>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-3">Useful Links</h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/bills" className="hover:text-white">Bills</a></li>
            <li><a href="/about" className="hover:text-white">About Us</a></li>
            <li><a href="/contact" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* Short Description */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-3">About PayWise Bill</h3>
          <p className="text-sm">
            PayWise Bill helps users easily manage and pay their bills online. Secure, simple, and fast.
          </p>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} PayWise Bill — All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;

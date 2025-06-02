import React from "react";
import logo from "../assets/logo.png";

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  //   { label: "Categories", href: "#" },
  //   { label: "Discover App", href: "#" },
  //   { label: "Delivery", href: "#" },
  //   { label: "Savings", href: "#" },
  //   { label: "Support", href: "#" },
];

const Navbar: React.FC = () => {
  return (
    <nav className="flex items-center justify-between px-8 py-4">
      <div className="flex items-center">
        <img
          src={logo}
          alt="logo"
          className="w-40 h-auto"
          data-aos="zoom-in"
          data-aos-duration="1000"
        />
      </div>

      <div className="flex items-center space-x-8">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="text-gray-700 hover:text-green-500 transition-colors"
          >
            {item.label}
          </a>
        ))}
        <div data-aos="zoom-in" data-aos-duration="1000">
          <button className="bg-brand-tertiary cursor-pointer text-white px-6 py-2 rounded-full hover:bg-brand-secondary transition-all duration-300">
            Join the waitlist
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

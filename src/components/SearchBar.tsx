import React from "react";
import heroImg from "../assets/hero.png";

const SearchBar: React.FC = () => {
  return (
    <div className="relative w-full mx-auto h-[30rem]">
      <img
        src={heroImg}
        data-aos="fade-up"
        data-aos-duration="700"
        data-aos-delay="1000"
        alt="hero"
        className="w-full h-full object-cover rounded-2xl opacity-80"
      />
    </div>
  );
};

export default SearchBar;

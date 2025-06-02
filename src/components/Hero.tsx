import React from "react";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import SubscriptionCard from "../components/SubscriptionCard";
import backgroundImage from "../assets/background.png";

const Hero: React.FC = () => {
  return (
    <div
      className="pb-10 bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Content with relative positioning to appear above overlay */}
      <div className="relative">
        <Navbar />

        <main className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1
              className="text-5xl font-bold text-gray-900 mb-20"
              data-aos="fade-up"
              data-aos-duration="700"
              data-aos-delay="500"
            >
              From fresh produce to daily{" "}
              <span className="relative">
                essentials
                <div className="absolute -bottom-2 left-0 w-full h-3 bg-brand-primary -z-10 transform -rotate-1"></div>
              </span>
              , shop smarter!
            </h1>

            <div
              className="flex justify-center gap-4 mb-12"
              data-aos="fade-up"
              data-aos-delay="700"
              data-aos-duration="500"
            >
              <button className="bg-brand-tertiary text-white px-8 py-3 rounded-full hover:bg-brand-primary cursor-pointer transition-all duration-300">
                Join the waitlist
              </button>
            </div>

            <div className="relative" id="anchor1">
              <SearchBar />

              <SubscriptionCard />
              <div
                className="bg-white rounded-2xl p-6 shadow-lg max-w-xs absolute top-60 -right-20"
                data-aos="fade-left"
                data-aos-duration="700"
                data-aos-delay="1400"
                data-aos-anchor="#anchor1"
              >
                <div className="text-right">
                  <span className="text-sm text-gray-500">Receipt</span>
                  <h3 className="text-xl font-semibold">Italian Carbonara</h3>
                  <p className="text-sm text-gray-600">6 products · 30 min</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Hero;

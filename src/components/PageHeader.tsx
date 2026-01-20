import { Link } from "react-router-dom";
import Logo from "@/assets/logo-color.png";

export default function PageHeader() {
  const handleNavClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="border-b bg-white/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            onClick={handleNavClick}
            className="flex items-center gap-2 !no-underline"
          >
            <img src={Logo} alt="DailyFoods Logo" className="h-8 md:h-10 w-auto" />
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-6">
            <Link
              to="/"
              onClick={handleNavClick}
              className="!text-gray-700 hover:text-orange-600 font-medium text-sm md:text-base transition-colors"
            >
              Home
            </Link>
            <Link
              to="/help"
              onClick={handleNavClick}
              className="!text-gray-700 hover:text-orange-600 font-medium text-sm md:text-base transition-colors"
            >
              Help
            </Link>
            <Link
              to="/legal"
              onClick={handleNavClick}
              className="!text-gray-700 hover:text-orange-600 font-medium text-sm md:text-base transition-colors"
            >
              Legal
            </Link>
            <Link
              to="/contact"
              onClick={handleNavClick}
              className="!text-gray-700 hover:text-orange-600 font-medium text-sm md:text-base transition-colors"
            >
              Contact
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}

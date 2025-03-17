
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import DarkModeToggle from "./DarkModeToggle";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { title: "Impact Calculator", path: "/calculator" },
    { title: "Quiz", path: "/quiz" },
    { title: "Recipes", path: "/recipes" },
    { title: "Restaurants", path: "/restaurants" },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="fixed w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-50 border-b border-gray-100 dark:border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 font-semibold text-primary">
            <Link to="/" className="text-xl flex items-center">
              <span className="text-2xl mr-1">🌱</span> Vegan Impact
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.title}
                to={item.path}
                className={`transition-colors duration-200 ${
                  isActive(item.path)
                    ? "text-primary font-medium"
                    : "text-gray-600 dark:text-gray-300 hover:text-primary"
                }`}
              >
                {item.title}
              </Link>
            ))}
            <DarkModeToggle />
            <Link to="/calculator">
              <Button className="bg-primary hover:bg-primary/90">Get Started</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <DarkModeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden animate-fade-in-up">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.title}
                  to={item.path}
                  className={`block px-3 py-2 rounded-md ${
                    isActive(item.path)
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-gray-600 dark:text-gray-300 hover:text-primary"
                  } transition-colors duration-200`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.title}
                </Link>
              ))}
              <Link to="/calculator" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full bg-primary hover:bg-primary/90 mt-4">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

import { Link } from "react-router-dom";
import { HomeIcon } from "@heroicons/react/24/solid";

const Header = () => {
  return (
    <header className="bg-white shadow">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">

        {/* Logo + Title */}
        <div className="flex items-center gap-3">
          <img 
            src="/logo.jpg" 
            alt="Logo"
            className="w-20 h-20 object-contain"
          />
          
          <div>
            <h1 className="text-2xl font-bold text-emerald-600">Coding Challenge</h1>
            <p className="text-sm text-gray-500">Find Nearby Ambulances and Doctors</p>
          </div>
        </div>

        {/* Home Button */}
        <Link
          to="/"
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white 
          rounded-md hover:bg-emerald-700 transition"
        >
          <HomeIcon className="w-5 h-5" />
          <span>Home</span>
        </Link>

      </div>
    </header>
  );
};

export default Header;

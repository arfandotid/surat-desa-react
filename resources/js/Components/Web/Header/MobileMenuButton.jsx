// import icons
import { Menu, X } from "lucide-react";

export default function MobileMenuButton({ isMenuOpen, setIsMenuOpen }) {
    return (
        <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100"
        >
            {isMenuOpen ? (
                <X className="w-6 h-6" />
            ) : (
                <Menu className="w-6 h-6" />
            )}
        </button>
    );
}

import { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router";
import { StoreIcon } from "lucide-react";
import Desktop from "./Desktop";
import Mobile from "./Mobile";
import { useAppDispatch } from "../../store";
import { useSelector } from "react-redux";
import { logout, selectAuth } from "../../store/slices/auth_slice";

export function Header() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector(selectAuth);

  const handleUserLogout = useCallback(() => {
    dispatch(logout());
    navigate("/login");
  }, [navigate, dispatch]);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="bg-background border-b border-muted shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className="text-xl font-bold text-gray-500 hover:text-pink-500 flex d-flex items-center gap-1"
          >
            <StoreIcon className="text-pink-400" />
            TinyStore
          </Link>
          <Desktop
            isAuthenticated={isAuthenticated}
            user={user}
            isMenuOpen={isMenuOpen}
            onToggleMenu={toggleMenu}
            onCloseMenu={closeMenu}
            handleUserLogout={handleUserLogout}
          />
        </div>
        <Mobile
          isMenuOpen={isMenuOpen}
          isAuthenticated={isAuthenticated}
          user={user}
          onToggleMenu={toggleMenu}
          onCloseMenu={closeMenu}
          handleUserLogout={handleUserLogout}
        />
      </div>
    </header>
  );
}

export default Header;

import { Link } from "react-router";
import { ShoppingCart, User as UserIcon, LogOut, Menu, X } from "lucide-react";
import { toast } from "react-toastify";
import type { User } from "../../types";
import { useSelector } from "react-redux";
import { selectCart } from "../../store/slices/cart-slice";

interface HeaderDesktopProps {
  isAuthenticated: boolean;
  user: User | undefined;
  isMenuOpen: boolean;
  onToggleMenu: () => void;
  onCloseMenu: () => void;
  handleUserLogout: () => void;
}

export function Desktop({
  isAuthenticated,
  user,
  isMenuOpen,
  onToggleMenu,
  onCloseMenu,
  handleUserLogout,
}: HeaderDesktopProps) {
  const handleLogout = () => {
    handleUserLogout();
    toast.success("Logout realizado com sucesso!");
    onCloseMenu();
  };
  const { totalQuantity } = useSelector(selectCart);
  return (
    <>
      <nav className="hidden md:flex items-center gap-6">
        <Link
          to="/"
          className="text-gray-500 hover:text-pink-500 transition-colors"
        >
          Home
        </Link>
        <Link
          to="/products"
          className="text-gray-500 hover:text-pink-500 transition-colors"
        >
          Cursos
        </Link>
        <Link
          to="/courses"
          className="text-gray-500 hover:text-pink-500 transition-colors"
        >
          Meus Cursos
        </Link>
      </nav>
      <div className="hidden md:flex items-center gap-4">
        {isAuthenticated ? (
          <>
            <Link
              to="/cart"
              className="relative p-2 text-gray-500 hover:text-primary transition-colors"
            >
              <ShoppingCart className="w-6 h-6" color="red" />
              <span className="absolute -top-1 -right-1 bg-accent text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {totalQuantity}
              </span>
            </Link>
            <div className="flex items-center gap-2">
              <UserIcon className="w-5 h-5 text-secondary" />
              <span className="text-sm text-secondary">
                <strong>{user?.username}</strong>
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 px-3 py-2 text-sm text-destructive hover:bg-muted rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4 text-pink-400" />
              Sair
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="px-4 py-2 text-primary hover:bg-muted rounded-lg transition-colors"
            >
              Entrar
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition-colors"
            >
              Cadastrar
            </Link>
          </>
        )}
      </div>
      <button
        onClick={onToggleMenu}
        className="md:hidden p-2 text-gray-500"
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>
    </>
  );
}

export default Desktop;

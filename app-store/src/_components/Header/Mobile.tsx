import { Link, useNavigate } from "react-router";
import { ShoppingCart, LogOut, User as UserIcon } from "lucide-react";
import { toast } from "react-toastify";
import type { User } from "../../types";

interface HeaderMobileProps {
  isMenuOpen: boolean;
  isAuthenticated: boolean;
  user: User | undefined;
  onToggleMenu: () => void;
  onCloseMenu: () => void;
  handleUserLogout: () => void;
}

export function Mobile({
  isMenuOpen,
  isAuthenticated,
  user,
  onToggleMenu,
  onCloseMenu,
  handleUserLogout,
}: HeaderMobileProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    handleUserLogout();
    toast.success("Logout realizado com sucesso!");
    navigate("/");
    onCloseMenu();
  };

  return (
    <>
      {isMenuOpen && (
        <div className="md:hidden py-4 border-t border-muted">
          <nav className="flex flex-col gap-2">
            <Link
              to="/"
              onClick={onToggleMenu}
              className="px-4 py-2 text-gray-500 hover:text-pink-500 rounded-lg"
            >
              Home
            </Link>
            <Link
              to="/products"
              onClick={onToggleMenu}
              className="px-4 py-2 text-gray-500 hover:text-pink-500 rounded-lg"
            >
              Cursos
            </Link>
            <Link
              to="/courses"
              className="text-gray-500 hover:text-pink-500 transition-colors"
            >
              Meus Cursos
            </Link>
            {isAuthenticated ? (
              <>
                <div className="px-4 py-2 flex items-center gap-2 text-secondary">
                  <UserIcon className="w-5 h-5" />
                  <span className="text-sm">
                    <strong>{user?.username}</strong>
                  </span>
                </div>
                <Link
                  to="/cart"
                  onClick={onToggleMenu}
                  className="px-4 py-2 text-gray-500 hover:bg-muted rounded-lg flex items-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" color="red" />
                  Carrinho
                  <span className="absolute -top-1 -right-1 bg-accent text-xs w-5 h-5 rounded-full flex items-center justify-center"></span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-destructive hover:bg-muted rounded-lg text-left flex items-center gap-2"
                >
                  <LogOut className="w-5 h-5 text-pink-400" />
                  Sair
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={onToggleMenu}
                  className="px-4 py-2 text-primary hover:bg-muted rounded-lg"
                >
                  Entrar
                </Link>
                <Link
                  to="/register"
                  onClick={onToggleMenu}
                  className="px-4 py-2 bg-primary text-white rounded-lg text-center"
                >
                  Cadastrar
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </>
  );
}

export default Mobile;

import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { toast } from "react-toastify";
import { useAppDispatch } from "../store";
import { useMutation } from "@tanstack/react-query";
import type { AuthResponse } from "../types";
import { api } from "../services/api";
import { setCredentials } from "../store/slices/auth_slice";

export function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const location = useLocation();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  const loginMutation = useMutation({
    mutationFn: async () => {
      const response = await api.post<AuthResponse>("/auth/local", {
        identifier,
        password,
      });
      return response.data;
    },
    onSuccess: (data) => {      
      dispatch(setCredentials({ user: data.user, token: data.jwt }));

      toast.success(`Bem-vindo de volta, ${data.user.username}!`);
      navigate(from, { replace: true });
    },
    onError: () => {
      toast.error("Credenciais inválidas. Tente novamente.");
    },
  });

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIdentifier(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  // Toggle para mostrar/ocultar senha
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!identifier || !password) {
      toast.warn("Preencha todos os campos!");
      return;
    }

    loginMutation.mutate();
  };

  return (
    <div className="min-h-[calc(100vh-180px)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-gray-800 bg-opacity-40 rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-pink-400">
              Bem-vindo de volta
            </h1>
            <p className="text-secondary mt-2">
              Entre na sua conta para continuar
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Campo Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-500 mb-2"
              >
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary" />
                <input
                  id="email"
                  type="email"
                  value={identifier}
                  onChange={handleEmailChange}
                  placeholder="seu@email.com"
                  className="w-full pl-10 pr-4 py-3 bg-transparent border border-muted rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            {/* Campo Senha */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-500 mb-2"
              >
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="********"
                  className="w-full pl-10 pr-12 py-3 border bg-transparent border-muted rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-gray-500"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Botão Submit */}
            <button
              type="submit"
              disabled={loginMutation.isPending}
              className="w-full py-3 bg-primary text-white bg-pink-400 rounded-lg font-medium hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              {loginMutation.isPending ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Entrando...
                </>
              ) : (
                "Entrar"
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-secondary">
              Não tem uma conta?{" "}
              <Link
                to="/register"
                className="text-pink-400 font-medium hover:underline"
              >
                Cadastre-se
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

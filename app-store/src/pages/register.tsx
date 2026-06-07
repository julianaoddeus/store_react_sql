import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { toast } from "react-toastify";
import { useAppDispatch } from "../store";
import type { AuthResponse } from "../types";
import { useMutation } from "@tanstack/react-query";
import { setCredentials } from "../store/slices/auth_slice";
import { api } from "../services/api";

export function Register() {
  const dispatch = useAppDispatch();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const registerMutation = useMutation({
    mutationFn: async () => {
      const response = await api.post<AuthResponse>("/auth/local/register", {
        username,
        email,
        password,
      });
      return response.data;
    },
    onSuccess: (data) => {
      dispatch(setCredentials({ user: data.user, token: data.jwt }));
      
      toast.success("Cadastro realizado com sucesso!");
      navigate("/", { replace: true });
    },
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!username || !email || !password || !confirmPassword) {
      toast.warn("Preencha todos os campos!");
      return;
    }

    if (password !== confirmPassword) {
      toast.warn("As senhas não coincidem!");
      return;
    }

    if (password.length < 6) {
      toast.warn("A senha deve ter pelo menos 6 caracteres!");
      return;
    }

    registerMutation.mutate();
    
  };

  return (
    <div className="min-h-[calc(100vh-180px)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-gray-800 bg-opacity-40 rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-500">Criar conta</h1>
            <p className="text-secondary mt-2">
              Preencha os dados para se cadastrar
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Campo Username */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-500 mb-2"
              >
                Nome de usuário
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary" />
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="seunome"
                  className="w-full pl-10 pr-4 py-3 bg-transparent border border-muted rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                  className="w-full pl-10 pr-12 py-3 bg-transparent border border-muted rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
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

            {/* Campo Confirmar Senha */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-500 mb-2"
              >
                Confirmar senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary" />
                <input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repita a senha"
                  className="w-full pl-10 pr-4 py-3 bg-transparent border border-muted rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            {/* Botão Submit */}
            <button
              type="submit"
              disabled={registerMutation.isPending}
              className="w-full py-3 bg-pink-400 text-white rounded-lg font-medium hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              {registerMutation.isPending ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Cadastrando...
                </>
              ) : (
                "Cadastrar"
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-secondary">
              Já tem uma conta?{" "}
              <Link
                to="/login"
                className="text-pink-400 font-medium hover:underline"
              >
                Entrar
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;

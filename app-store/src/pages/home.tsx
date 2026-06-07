import { Link } from "react-router";
import { ShoppingBag, Tag, Shield } from "lucide-react";
import { useSelector } from "react-redux";
import { selectAuth } from "../store/slices/auth_slice";

export function Home() {
  const { isAuthenticated } = useSelector(selectAuth);
  return (
    <div className="flex flex-col">
      <section className="bg-gray-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance text-pink-400">
            Bem-vindo à TinyStore
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-pretty opacity-90">
            Encontre os melhores produtos com os melhores preços. Sua
            experiência de compra começa aqui.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/products"
              className="px-8 py-3 bg-pink-400 text-white rounded-lg font-medium hover:opacity-90 transition-colors"
            >
              Ver Produtos
            </Link>
            <Link
              to="/cart"
              className="px-8 py-3 border-2 border-pink-400 text-pink-400 rounded-lg font-medium hover:text-pink-500 hover:border-pink-500 hover:bg-opacity-10  transition-colors"
            >
              Explorar Suas Compras
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-500 mb-12">
            Por que escolher a TinyStore?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                <ShoppingBag className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-500 mb-2">
                Produtos de Qualidade
              </h3>
              <p className="text-secondary">
                Selecionamos os melhores produtos para você com garantia de
                qualidade.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                <Tag className="w-8 h-8 text-accent text-orange-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-500 mb-2">
                Melhores Preços
              </h3>
              <p className="text-secondary">
                Oferecemos preços competitivos e promoções exclusivas.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                <Shield className="w-8 h-8 text-green-400 " />
              </div>
              <h3 className="text-xl font-semibold text-gray-500 mb-2">
                Compra Segura
              </h3>
              <p className="text-secondary">
                Suas informações estão protegidas com criptografia de ponta a
                ponta.
              </p>
            </div>
          </div>
        </div>
      </section>

      {!isAuthenticated ? (
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-500 mb-4">
              Pronto para começar?
            </h2>
            <p className="text-secondary mb-8 max-w-xl mx-auto">
              Crie sua conta agora e aproveite ofertas exclusivas para novos
              clientes.
            </p>
            <Link
              to="/register"
              className="inline-block px-8 py-3 bg-pink-400 text-white rounded-lg font-medium hover:opacity-80 transition-colors"
            >
              Criar Conta Grátis
            </Link>
          </div>
        </section>
      ) : (
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-500 mb-4">
              Meus Cursos
            </h2>
            <p className="text-secondary mb-8 max-w-xl mx-auto">
              Comece a assistir suas aulas, não perca mais tempo e se torne o
              profissional mais desejado do mercado!
            </p>
            <Link
              to="/courses"
              className="inline-block px-8 py-3 bg-pink-400 text-white rounded-lg font-medium hover:opacity-80 transition-colors"
            >
              Começar
            </Link>
          </div>
        </section>
      )}

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-500 mb-4">
            O que esperar?
          </h2>
          <p className="text-secondary text-center mb-8 max-w-2xl mx-auto">
            A proposta dos cursos de React é te guiar passo a passo na
            construções de aplicações completas. Você aprenderá a desenvolver
            aplicações do absoluto zero utilizando ferramentas como TailwindCss,
            Styled-Components, Vite, Firebase, Typescript e muito mais.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Home;

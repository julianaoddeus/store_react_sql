# app-store

Frontend da plataforma de cursos, construído com React + TypeScript + Vite.

## Tecnologias

- **React 19** + **TypeScript**
- **Vite** — build e dev server
- **React Router v7** — roteamento
- **Redux Toolkit** — gerenciamento de estado (auth)
- **TanStack Query** — requisições e cache
- **Axios** — cliente HTTP
- **Tailwind CSS** — estilização
- **MUI** — componentes de UI
- **React Toastify** — notificações

## Estrutura

```
src/
├── _components/    # componentes reutilizáveis
├── hooks/          # hooks customizados
├── lib/            # configurações (ex: queryClient)
├── pages/          # páginas da aplicação
├── routers/        # definição de rotas
├── services/       # instância do axios e interceptors
├── store/          # Redux store e slices
└── types/          # tipos TypeScript
```

## Páginas

| Rota | Página | Autenticação |
|------|--------|--------------|
| `/` | Home | Não |
| `/login` | Login | Não |
| `/register` | Cadastro | Não |
| `/courses` | Lista de cursos | Não |
| `/courses/:id` | Detalhes do curso | Não |
| `/enrollments` | Minhas matrículas | Sim |

## Autenticação

O JWT é recebido do backend no login e armazenado no `localStorage`. O interceptor do Axios o envia automaticamente no header `Authorization: Bearer <token>` em todas as requisições. Em caso de resposta `401`, o usuário é deslogado automaticamente.

## Instalação e uso

```bash
npm install
npm run dev
```

A aplicação roda em `http://localhost:5173` e consome a API em `http://localhost:3001/api`.

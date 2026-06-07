# App Store — React + Strapi

Aplicação fullstack de e-commerce com catálogo de produtos, carrinho de compras e área de cursos.

## Tecnologias

**Frontend (`app-store`)**
- React 19 + TypeScript + Vite
- Redux Toolkit (autenticação, carrinho, cursos)
- TanStack Query (cache e requisições)
- Tailwind CSS + MUI
- React Router v7
- Axios

**Backend (`server`)**
- Strapi 5 (headless CMS)
- SQLite (banco de dados local)
- Plugin Users & Permissions (JWT)

## Estrutura do Projeto

```
projeto_react/
├── app-store/   # Frontend React
└── server/      # Backend Strapi
```

## Pré-requisitos

- Node.js >= 20
- npm >= 6

## Instalação e Execução

### Backend

```bash
cd server
npm install
cp .env.example .env   # configure as variáveis de ambiente
npm run dev
```

O servidor estará disponível em `http://localhost:1337`.  
O painel admin do Strapi em `http://localhost:1337/admin`.

### Frontend

```bash
cd app-store
npm install
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`.

## Funcionalidades

- Listagem e detalhe de produtos com paginação
- Carrinho de compras (rota protegida)
- Área de cursos (rota protegida)
- Autenticação com JWT (login e cadastro)
- Logout automático em caso de token expirado

## Rotas do Frontend

| Rota            | Descrição            | Protegida  |
------------------------------------------------------
| `/`             | Home                 | Não        |
| `/products`     | Listagem de produtos | Não        |
| `/products/:id` | Detalhe do produto   | Não        |
| `/login`        | Login                | Não        |
| `/register`     | Cadastro             | Não        |
| `/cart`         | Carrinho             | Sim        |
| `/courses`      | Cursos               | Sim        |

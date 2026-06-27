# server

API REST da plataforma de cursos, construída com Node.js + Express + PostgreSQL.

## Tecnologias

- **Node.js** + **Express**
- **Sequelize** — ORM
- **PostgreSQL** (Neon) — banco de dados
- **JWT** — autenticação
- **bcrypt** — hash de senhas
- **dotenv** — variáveis de ambiente

## Estrutura

```
server/
├── config/         # conexão com o banco (Sequelize)
├── controllers/    # lógica das rotas
├── middlewares/    # auth JWT e tratamento de erros
├── models/         # modelos Sequelize (users, courses, enrollments)
├── routes/         # definição das rotas
└── services/       # regras de negócio e queries
```

## Rotas

### Auth
| Método | Rota | Descrição | Auth |
|--------|------|-----------|------|
| POST | `/api/login` | Login com email/usuário e senha | Não |

### Usuários
| Método | Rota | Descrição | Auth |
|--------|------|-----------|------|
| GET | `/api/users` | Lista usuários | Não |
| POST | `/api/users` | Cria usuário | Não |

### Cursos
| Método | Rota | Descrição | Auth |
|--------|------|-----------|------|
| GET | `/api/courses` | Lista cursos (paginação + busca) | Não |
| GET | `/api/courses/:id` | Detalhes do curso | Não |
| GET | `/api/courses/enrollments/:userId` | Cursos matriculados do usuário | Sim |

### Matrículas
| Método | Rota | Descrição | Auth |
|--------|------|-----------|------|
| POST | `/api/enrollments/:id` | Cria matrícula | Sim |
| PUT | `/api/update/:id` | Atualiza matrícula | Sim |

## Variáveis de ambiente

Crie um arquivo `.env` na raiz do `server/`:

```env
DATABASE_URL=postgresql://user:password@host/dbname
JWT_SECRET=sua_chave_secreta
```

## Autenticação

O login aceita `identifier` (email ou username) + `password`. Retorna um JWT com payload `{ id, email, username }` com expiração de 1 dia. Rotas protegidas exigem o header `Authorization: Bearer <token>`.

## Instalação e uso

```bash
npm install
npm run dev   # desenvolvimento com nodemon
npm start     # produção
```

A API roda em `http://localhost:3001`.

# Tech4um - Frontend

Frontend do Tech4um, plataforma de fóruns e chat em tempo real. Projeto desenvolvido como parte do **Ninja Startup 2025**.

## Backend Integrado

- **Repositório**: [tech4um-ws](https://github.com/pedrohpimentel/tech4um-ws)
- **Base URL REST**: `http://localhost:8080/api`
- **Base URL WebSocket**: `ws://localhost:8080/ws`
- **Formato de dados**: `application/json`
- **Autenticação**: JWT Bearer Token

## Tecnologias Utilizadas

| Categoria | Tecnologias |
|-----------|-------------|
| **Framework** | Next.js 14 (App Router) |
| **UI** | Tailwind CSS, shadcn/ui |
| **Estado** | React Context (AuthContext, ChatContext, ThemeContext) |
| **HTTP** | Axios |
| **Notificações** | React Toastify |
| **Ícones** | Lucide React |
| **Formulários** | React Hook Form |
| **WebSocket** | WebSocket nativo (integração com STOMP) |

## Funcionalidades Implementadas

### Autenticação
-  **Login** (`POST /api/auth/login`) - Retorna JWT
-  **Cadastro** (`POST /api/auth/register`)
-  Logout e proteção de rotas
-  Persistência de token (localStorage)
-  Context global de autenticação

### Fóruns
-  **Listagem** (`GET /api/forums`)
-  **Detalhes** (`GET /api/forums/{id}`)
-  **Criação** (`POST /api/forums`) - Requer JWT
-  **Histórico** (`GET /api/forums/{id}/messages`) - Requer JWT
-  Busca em tempo real
-  Cards responsivos


### UI/UX
-  Dark Mode (ThemeContext)
-  Header responsivo
-  Modais (Login, CreateForum)
-  Glassmorphism e backdrop blur
-  Design mobile-first

## Endpoints Implementados

| Método | Endpoint | Descrição | Requer JWT |
|--------|----------|-----------|------------|
| POST | `/api/auth/register` | Cria novo usuário | Não |
| POST | `/api/auth/login` | Obtém token JWT | Não |
| GET | `/api/forums` | Lista fóruns | Não |
| GET | `/api/forums/{id}` | Detalhes do fórum | Não |
| POST | `/api/forums` | Cria fórum | Sim |
| GET | `/api/forums/{id}/messages` | Histórico de mensagens | Sim |

## Páginas/Rotas

| Rota | Descrição |
|------|-----------|
| `/` | Home - Lista de fóruns + busca |
| `/cadastro` | Cadastro de usuários |
| `/forum/:id` | Fórum específico + chat |


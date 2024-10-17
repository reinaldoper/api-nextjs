# API de Atletas

## Descrição
Este projeto é uma API desenvolvida com Next.js e TypeScript para gerenciar informações de atletas, esportes e usuários, incluindo operações de CRUD e funcionalidades para relacionar atletas com esportes. A API possui rotas para criar, listar, atualizar e deletar atletas e esportes, além de autenticação e gerenciamento de usuários.

Explore a documentação da API [aqui](https://apis-docs.codante.io/atletas-brasileiros).

## Tecnologias Utilizadas
- **Next.js**: Framework para React com suporte integrado para rotas de API.
- **TypeScript**: Superset de JavaScript que adiciona tipagem estática.
- **dotenv**: Gerenciamento de variáveis de ambiente.
- **bcrypt**: Para hash de senhas.
- **JWT**: Autenticação via JSON Web Tokens.
- **MySQL**: Banco de dados relacional para armazenar informações de atletas, esportes e usuários.
- **Docker**: Facilita a criação e gerenciamento de ambientes isolados.
- **REST API**: Estrutura de endpoints para operações de CRUD.

## Pré-requisitos
- **Node.js** (v18 ou superior)
- **npm** ou **yarn** para gerenciar pacotes
- Banco de dados MySQL configurado

## Instalação

1. Clone o repositório:
   ```bash
   git clone <URL>
   cd api-nextjs
   ```

2. Instale as dependências:
   ```bash
    npm install
   ```

3. Configure as variáveis de ambiente:

- Crie um arquivo .env na raiz do projeto com as seguintes variáveis:
  ```bash
  MYSQL_ROOT_PASSWORD=seu-nome-preferencia
  MYSQL_DATABASE=seu-nome-preferencia
  MYSQL_USER=seu-nome-preferencia
  MYSQL_PASSWORD=seu-nome-preferencia
  DB_HOST=localhost
  DB_DATABASE=seu-nome-preferencia
  DB_PASSWORD=seu-nome-preferencia
  DB_PORT=3306
  DB_USER=seu-nome-preferencia
  PORT=3001
  JWT_SECRET=seu-nome-preferencia
  ```

4. Scripts Disponíveis:

- npm run dev: Executa o projeto em modo de desenvolvimento.
- npm run build: Compila o projeto para produção.
- npm start: Executa a versão compilada em produção.
- docker-compose up -d: Sobe o contêiner Docker com o banco de dados.
- npm run dbreset: Inicializa ou reseta o banco de dados.

## Rotas Disponíveis

### Rotas de Atletas

1. Criar Atleta

- Rota: POST /api/athletes/athlete
- Descrição: Cria um novo atleta.

2. Listar Todos os Atletas

- Rota: PATCH /api/athletes/athlete
- Descrição: Retorna uma lista de todos os atletas.
- Parâmetros da Query:
- limit: Limita o número de resultados retornados (padrão: 10).

3. Obter Atleta por ID

- Rota: GET /api/athletes/[id]
- Descrição: Retorna detalhes de um atleta específico por ID.

4. Atualizar Atleta

- Rota: PUT /api/athletes/athlete
- Descrição: Atualiza os dados de um atleta existente.

5. Deletar Atleta

- Rota: DELETE /api/athletes/[id]
- Descrição: Deleta um atleta específico por ID.

6. Listar Atletas e Seus Esportes

- Rota: GET /api/athletes/sport/[id]
- Descrição: Retorna uma lista de atletas com detalhes dos esportes associados.


### Rotas de Esportes

1. Criar Esporte

- Rota: POST /api/sports/sport
- Descrição: Cria um novo esporte.

2. Listar Todos os Esportes

- Rota: GET /api/sports/sport
- Descrição: Retorna uma lista de todos os esportes.

3. Obter Esporte por ID

- Rota: GET /api/sports/[id]
- Descrição: Retorna detalhes de um esporte específico por ID.

4. Atualizar Esporte

- Rota: PUT /api/sports/[id]
- Descrição: Atualiza os dados de um esporte existente.

5. Deletar Esporte

- Rota: DELETE /api/sports/[id]
- Descrição: Deleta um esporte específico por ID.

### Rotas de Usuários

1. Registrar Usuário

- Rota: POST /api/auth/register
- Descrição: Cria um novo usuário.

2. Login de Usuário

- Rota: POST /api/auth/login
- Descrição: Autentica o usuário e gera um token JWT.

- services: Serviços que lidam com as operações no banco de dados.
- types: Definições de tipos TypeScript para as entidades.

### Contato
- Para mais informações ou feedback, entre em contato pelo email: reinaldoper83@gmail.com.
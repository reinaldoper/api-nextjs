# API de Atletas

## Este projeto é uma API desenvolvida com Next.js e TypeScript para gerenciar informações de atletas, incluindo operações de CRUD e funcionalidades para relacionar atletas com esportes. A API possui rotas para criar, listar, atualizar e deletar atletas, além de funções para retornar detalhes de esportes associados aos atletas.

## Tecnologias Utilizadas

- Next.js: Framework para React com suporte integrado para rotas de API.
- TypeScript: Superset de JavaScript para adicionar tipagem estática.
- dotenv: Carregamento de variáveis de ambiente a partir de um arquivo .env.
- bcrypt: Para hash de senhas.
- JWT: Autenticação via JSON Web Tokens.
- REST API: Implementação de endpoints para operações de CRUD.
- Pré-requisitos
- Node.js (v18 ou superior)
- npm ou yarn para gerenciar pacotes
- Banco de dados configurado (MySQL)

## Instalação
1. Clone o repositório:

```bash
git clone <URL>
cd api-atletas
```
2. Instale as dependências:

```bash
npm install
```
3. Configure as variáveis de ambiente:

- Crie um arquivo .env na raiz do projeto e adicione as seguintes variáveis:

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

4. Scripts Disponíveis

- npm run dev: Executa o projeto em modo de desenvolvimento.
- npm run build: Compila o projeto para produção.
- npm start: Executa a versão compilada em produção.
- npm run dbreset: Executa o banco de dados.

## Rotas Disponíveis

1. Criar Atleta
- Rota: POST /api/athletes/create
- Descrição: Cria um novo atleta.


2. Listar Todos os Atletas
- Rota: GET /api/athletes
- Descrição: Retorna uma lista de todos os atletas.
- Parâmetros da Query:
- limit: Limita o número de resultados retornados (padrão: 10).

3. Obter Atleta por ID
- Rota: GET /api/athletes/[id]
- Descrição: Retorna detalhes de um atleta específico por ID.

4. Atualizar Atleta
- Rota: PUT /api/athletes/[id]
- Descrição: Atualiza os dados de um atleta existente.

5. Deletar Atleta
- Rota: DELETE /api/athletes/[id]
- Descrição: Deleta um atleta específico por ID.

6. Listar Atletas e Seus Esportes
- Rota: GET /api/athletes/joinSports
- Descrição: Retorna uma lista de atletas com detalhes dos esportes associados.

7. Obter Atleta e Seus Esportes por ID
- Rota: GET /api/athletes/joinSportsById
- Descrição: Retorna detalhes de um atleta específico junto com os esportes associados por ID.

8. Obter Atletas por ID de Esporte
- Rota: GET /api/athletes/bySportId/[id]
- Descrição: Retorna atletas específicos para um determinado esporte.

## Estrutura do Projeto
```bash
/pages/api/athletes/
├── create.ts
├── index.ts
├── [id].ts
├── joinSports.ts
└── joinSportsById.ts
```

- controllers: Contém a lógica de controle para cada rota.
- services: Serviços que lidam com as operações no banco de dados.
- types: Definições de tipos TypeScript para as entidades.
- utils: Funções utilitárias e status codes HTTP.

### Contato
- Para mais informações ou feedback, entre em contato pelo email: reinaldoper83@gmail.com

- Esse README cobre a estrutura e funcionalidade do seu projeto e orienta sobre como configurá-lo e utilizá-lo. Se precisar de ajustes ou melhorias, estou à disposição!







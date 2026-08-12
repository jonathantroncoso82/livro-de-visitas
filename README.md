# Livro de Visitas - Museu

Aplicação web para registro e gestão de visitantes em museus.

## Stack


## Funcionalidades

### Ciclo 1 - Formulário de Visitantes

### Ciclo 2 - Painel Administrativo e Conformidade

## Como Executar

### Pré-requisitos

### Iniciar a Aplicação

```bash
docker compose up --build
```

A aplicação estará disponível em:

### Credenciais Padrão


## Estrutura do Projeto

```
.
├── backend/
│   ├── src/
│   │   └── index.js          # Servidor Express
│   ├── init.sql              # Schema do banco de dados
│   ├── package.json          # Dependências Node.js
│   └── Dockerfile            # Build do backend
├── frontend/
│   ├── src/
│   │   ├── components/       # Componentes React
│   │   ├── styles/           # Estilos CSS
│   │   ├── App.jsx           # Componente principal
│   │   └── main.jsx          # Entry point
│   ├── index.html            # HTML principal
│   ├── package.json          # Dependências React
│   ├── nginx.conf            # Configuração Nginx
│   └── Dockerfile            # Build do frontend
├── docker-compose.yml        # Orquestração de containers
└── README.md                 # Este arquivo
```

## Endpoints da API

### Autenticação

### Visitantes

### Relatórios

### Auditoria

## Variáveis de Ambiente

```
DB_USER=museum_user
DB_PASSWORD=museum_pass
DB_HOST=db
DB_PORT=5432
DB_NAME=museum_db
JWT_SECRET=dev-secret-key-change-in-production
PORT=3000
```

## Desenvolvimento

### Backend
```bash
cd backend
npm install
npm start
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Notas de Segurança

# Grêmio - Brasileirão 2025

Aplicação web full-stack que exibe a tabela de jogos do Grêmio no Campeonato Brasileiro de 2025, com visualização do primeiro e segundo turno e filtros para jogos em casa e fora.

## 🏗️ Arquitetura

O projeto utiliza uma arquitetura de microserviços com:

- **Frontend**: React com Vite
- **Backend**: FastAPI (Python)
- **Banco de Dados**: PostgreSQL
- **Containerização**: Docker e Docker Compose
- **Infraestrutura**: AWS com Terraform

## 🚀 Tecnologias

### Frontend
- React 19.x
- Vite
- CSS puro

### Backend
- FastAPI
- SQLAlchemy (ORM)
- Pydantic (DTOs)
- PostgreSQL

### DevOps
- Docker & Docker Compose
- Terraform (IaC)
- GitHub Actions (CI/CD)
- AWS (EC2, RDS)

## 📁 Estrutura do Projeto

```
gremio-brasileirao-2025/
├── src/                    # Frontend React
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── api/                    # Backend FastAPI
│   ├── main.py
│   ├── requirements.txt
│   └── Dockerfile
├── database/               # Scripts SQL
│   └── init.sql
├── Dockerfile              # Frontend
├── docker-compose.yml      # Orquestração
└── .github/workflows/      # CI/CD
```

## 🛠️ Funcionalidades

- Visualização dos jogos do Grêmio no Brasileirão 2025
- Navegação entre primeiro e segundo turno
- Filtros para jogos em casa e fora
- Design responsivo com estilos diferentes para jogos em casa e fora
- API RESTful com DTOs
- Banco de dados PostgreSQL com dados pré-carregados

## 🚀 Executando localmente

### Com Docker Compose (Recomendado)

1. Clone o repositório
2. Execute todos os serviços:
   ```bash
   docker-compose up --build
   ```
3. Acesse:
   - **Frontend**: http://localhost:8080
   - **API**: http://localhost:8000
   - **API Docs**: http://localhost:8000/docs

### Sem Docker

#### Backend
```bash
cd api
pip install -r requirements.txt
uvicorn main:app --reload
```

#### Frontend
```bash
npm install
npm run dev
```

#### Banco de Dados
```bash
# Instale PostgreSQL e execute:
psql -U postgres -d gremio_db -f database/init.sql
```

## 📡 Endpoints da API

- `GET /matches` - Lista todos os jogos
- `GET /matches/home` - Jogos em casa
- `GET /matches/away` - Jogos fora
- `GET /matches/turno/{turno}` - Jogos por turno (1 ou 2)
- `POST /matches` - Criar novo jogo

## 🐳 Serviços Docker

- **frontend**: React app (porta 8080)
- **api**: FastAPI (porta 8000)
- **postgres**: PostgreSQL (porta 5432)

## 🔧 Configuração de Ambiente

### Variáveis de Ambiente

#### Frontend
- `REACT_APP_API_URL`: URL da API (padrão: http://localhost:8000)

#### Backend
- `DATABASE_URL`: String de conexão PostgreSQL

#### Banco de Dados
- `POSTGRES_DB`: gremio_db
- `POSTGRES_USER`: gremio_user
- `POSTGRES_PASSWORD`: gremio_password

## 📊 Dados

O banco de dados é inicializado automaticamente com:
- 38 jogos (19 por turno)
- Resultados de jogos já realizados
- Informações completas de local, data e adversário

## 🚀 Deploy

### Com Docker
```bash
docker build -t gremio-brasileirao-2025 .
docker run -p 8080:80 gremio-brasileirao-2025
```

### Com Docker Compose
```bash
docker-compose up -d
```

## 🔍 Monitoramento

- **Health Check**: http://localhost:8000/
- **API Documentation**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## 🛡️ Segurança

- CORS configurado para desenvolvimento
- Validação de dados com Pydantic
- Prepared statements com SQLAlchemy
- Variáveis de ambiente para credenciais

### 🔐 Configuração de Segurança

**IMPORTANTE**: Antes de executar o projeto, configure as credenciais:

```bash
# 1. Copie o arquivo de exemplo
cp env.example .env

# 2. Edite com suas credenciais reais
nano .env

# 3. Configure senhas fortes
POSTGRES_PASSWORD=sua_senha_segura_aqui
```

**NUNCA** commite o arquivo `.env` no repositório!

Para mais detalhes sobre segurança, consulte [SECURITY.md](SECURITY.md).

## 📝 Desenvolvimento

### Adicionando novos jogos
```bash
# Via API
curl -X POST "http://localhost:8000/matches" \
  -H "Content-Type: application/json" \
  -d '{"rodada": 39, "data": "2025-12-15", "adversario": "Novo Time", "local": "Arena do Grêmio", "is_home": true}'
```

### Modificando dados
Edite o arquivo `database/init.sql` e reinicie os containers:
```bash
docker-compose down
docker-compose up --build
```

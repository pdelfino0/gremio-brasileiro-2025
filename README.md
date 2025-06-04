# Grêmio - Brasileirão 2025

Aplicação web que exibe a tabela de jogos do Grêmio no Campeonato Brasileiro de 2025, com visualização do primeiro e segundo turno e filtros para jogos em casa e fora.

## Tecnologias

- React
- Vite
- CSS puro
- Docker

## Funcionalidades

- Visualização dos jogos do Grêmio no Brasileirão 2025
- Navegação entre primeiro e segundo turno
- Filtros para jogos em casa e fora
- Design responsivo com estilos diferentes para jogos em casa e fora

## Executando localmente

### Sem Docker

1. Clone o repositório
2. Instale as dependências:
   ```
   npm install
   ```
3. Execute o servidor de desenvolvimento:
   ```
   npm run dev
   ```

### Com Docker

1. Clone o repositório
2. Construa e inicie o container:
   ```
   docker-compose up --build
   ```
3. Acesse a aplicação em `http://localhost:8080`

### Construindo apenas a imagem Docker

```bash
docker build -t gremio-brasileirao-2025 .
docker run -p 8080:80 gremio-brasileirao-2025
```

## Estrutura do projeto

- `src/App.jsx`: Componente principal com lógica e renderização
- `src/App.css`: Estilos da aplicação
- `Dockerfile`: Configuração para containerização
- `docker-compose.yml`: Configuração para orquestração de containers
# gremio-brasileiro-2025

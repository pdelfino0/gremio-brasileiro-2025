# Estágio de build
FROM node:20-alpine as build

# Definir argumento de build para a URL da API
ARG VITE_API_URL=http://localhost:8000

# Diretório de trabalho dentro do container
WORKDIR /app

# Copiar os arquivos de configuração
COPY package.json package-lock.json ./

# Instalar dependências
RUN npm ci

# Copiar o código fonte
COPY . .

# Definir a variável de ambiente para o build
ENV VITE_API_URL=$VITE_API_URL

# Construir a aplicação
RUN npm run build

# Estágio de produção
FROM nginx:alpine

# Copiar a configuração personalizada do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar os arquivos de build da etapa anterior para o diretório do Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Expor a porta 80
EXPOSE 80

# Comando para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"] 
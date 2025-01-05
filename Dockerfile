# Etapa 1: Construir o projeto
FROM node:18 AS builder

# Diretório de trabalho dentro do container
WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar o restante do projeto
COPY . .

# Compilar o TypeScript
RUN npm run build

# Etapa 2: Configuração do ambiente de produção
FROM node:18

# Diretório de trabalho dentro do container
WORKDIR /app

# Copiar apenas os arquivos necessários para produção
COPY package*.json ./

# Instalar dependências de produção
RUN npm install --only=production

# Copiar a build gerada na etapa anterior
COPY --from=builder /app/build ./build

# Porta que a aplicação vai expor
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["node", "build/shared/http/server.js"]

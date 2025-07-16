# Etapa 1: build
FROM node:18-alpine AS builder

RUN apk add --no-cache libc6-compat

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copia os arquivos corretos
COPY pnpm-lock.yaml package.json ./

# Instala dependências
RUN pnpm install --frozen-lockfile

# Copia o restante do projeto
COPY . .

# Build do projeto
RUN pnpm run build

# Etapa 2: imagem final leve
FROM node:18-alpine AS production

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

ENV NODE_ENV=production

CMD ["node", "dist/main"]

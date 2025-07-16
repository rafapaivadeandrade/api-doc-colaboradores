# Etapa 1: Build da aplicação com pnpm
FROM node:18-alpine AS builder

# Instala pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copia e instala dependências
COPY pnpm-lock.yaml package.json ./
RUN pnpm install --frozen-lockfile

# Copia restante do projeto
COPY . .

# Gera Prisma Client e build da aplicação NestJS
RUN pnpm prisma generate && pnpm build

# Etapa 2: Imagem final de produção
FROM node:18-alpine AS production

# Instala pnpm e apenas dependências de produção
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

COPY --from=builder /app/package.json /app/pnpm-lock.yaml ./
RUN pnpm install --prod --frozen-lockfile

# Copia apenas arquivos necessários da build
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

ENV NODE_ENV=production

EXPOSE 3000

CMD ["node", "dist/main"]

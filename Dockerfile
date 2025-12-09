FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY .nvmrc ./

RUN npm ci

COPY . .

RUN npm run build
RUN npm run prisma:generate

FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --only=production

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

# Copy prisma schema for migrations if needed in production container
COPY prisma ./prisma

EXPOSE 3000

CMD ["node", "dist/server.js"]

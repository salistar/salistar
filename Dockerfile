# ---- Builder ----
FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# ---- Runner ----
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Messages recus (formulaire + emails). Le repertoire est cree ET donne a
# `nextjs` AVANT le passage en utilisateur non root : un volume monte sur un
# chemin inexistant appartient a root, et le conteneur n'aurait alors pas le
# droit d'y ecrire — panne classique, qui ne se voit qu'au premier message.
RUN mkdir -p /data && chown nextjs:nodejs /data
VOLUME ["/data"]
ENV MESSAGES_FILE=/data/messages.json

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]

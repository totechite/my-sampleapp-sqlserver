FROM node:16-bullseye-slim

# DB接続情報
ARG DATABASE_URL
ARG DATABASE_PORT
ARG DB_NAME
ARG USER
ARG PASSWORD

COPY . .

RUN npm install \
    echo 'DATABASE_URL="${DATABASE_URL}:${DATABASE_PORT};database=${DB_NAME};user=${USER};password=${PASSWORD};integratedSecurity=true;trustServerCertificate=true;"' > .env \
    npx prisma db push \
    npx prisma generate \
EXPOSE 8000/tcp
CMD ["npm start"]
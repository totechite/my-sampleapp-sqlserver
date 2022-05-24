FROM node:16-bullseye-slim

# DB接続情報
ARG DATABASE_URL
ARG DATABASE_PORT
ARG DB_NAME
ARG USER
ARG PASSWORD

COPY . .

RUN npm install && \
    echo 'DATABASE_URL=$DATABASE_URL' > .env && \
    echo 'DATABASE_PORT=$DATABASE_PORT\' >> .env && \
    echo 'DB_NAME=$DB_NAME\' >> .env && \
    echo 'DB_USER=$DB_USER\' >> .env && \
    echo 'PASSWORD=$PASSWORD\' >> .env && \
    npm run build ; 
EXPOSE 8000/tcp
EXPOSE 8000/udp
CMD ["npm", "start"]
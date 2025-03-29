FROM node:22

WORKDIR /app

COPY package*.json ./
RUN npm install -g npm@latest
RUN npm install

COPY . .

COPY docker-start.sh /docker-start.sh
RUN chmod +x docker-start.sh

EXPOSE 5432

CMD ["/docker-start.sh"]
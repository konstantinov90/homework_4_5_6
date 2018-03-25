FROM node:latest
WORKDIR /usr/src/app
COPY . .
ENV NODE_ENV=production
RUN apt-get update
RUN npm install
RUN apt-get install webpack@3 -g
RUN npm run build
CMD npm start
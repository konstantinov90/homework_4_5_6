FROM node:latest
WORKDIR /usr/src/app
COPY . .
ENV NODE_ENV=production
RUN apt-get update
RUN npm install
RUN npm install --global webpack@3
RUN npm run build
CMD ["npm", "start"]
FROM node:latest
WORKDIR .
COPY . .
ENV NODE_ENV=production
RUN apt-get update
RUN npm install
RUN npm install --global webpack@3
RUN npm run build
CMD ["npm", "start"]
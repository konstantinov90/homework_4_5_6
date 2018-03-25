FROM node:latest

RUN npm config set https-proxy http://konstantinov:1474560@vm-squid.rosenergo.com:3128
RUN npm config set proxy http://konstantinov:1474560@vm-squid.rosenergo.com:3128
RUN git config --global url.https://github.com/.insteadof git://github.com/


ADD . /usr/src/app
WORKDIR /usr/src/app
ENV NODE_ENV=production
RUN apt-get update
RUN npm install
RUN npm install --global webpack@3
RUN npm run build
CMD ["npm", "start"]
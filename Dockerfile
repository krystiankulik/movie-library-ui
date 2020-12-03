FROM node:14.15
WORKDIR /usr/src/app
COPY tsconfig.json package.json package-lock.json ./
RUN npm ci --silent
ADD . /usr/src/app
CMD [ "npm", "start" ]

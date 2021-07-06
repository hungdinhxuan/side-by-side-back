FROM node:14
RUN mkdir -p /src/user/app
WORKDIR /src/user/app
COPY package*json ./
COPY . .
RUN yarn install
CMD ["node", "index.js"]
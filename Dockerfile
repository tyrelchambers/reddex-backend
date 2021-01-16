FROM alpine

WORKDIR /

# Create a group and user
RUN addgroup -S node && adduser -S node -G node

# Tell docker that all future commands should run as the appuser user

RUN mkdir -p /node_modules && chown -R node:node /node_modules

COPY --chown=node:node . .

RUN apk add --update nodejs npm

COPY package*.json ./

RUN npm install --prefix ./

RUN npm install -g sequelize-cli

COPY . .

EXPOSE 4000



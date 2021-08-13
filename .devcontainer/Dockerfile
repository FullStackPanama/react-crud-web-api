ARG NODE_VERSION=14.16.0
ARG ALPINE_VERSION=3.13
FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION}

ARG ENVIRONMENT=development
ENV NODE_ENV=${ENVIRONMENT}

RUN apk --update add --no-cache git

WORKDIR /app

COPY package*.json ./
RUN npm install --no-progress --ignore-optional

CMD ["sleep", "infinity"]

## Provide Node
FROM node:16.11.1

## Set CLI Arguments
ARG PORT_SERVER_DEV=3000
ARG PORT_HMR=24678
ARG PORT_DEV_DEBUG=3001

ARG PORT_SERVER_PROD=4000
ARG PORT_PROD_DEBUG=4001

ARG PORT_STORYBOOK=6006

## Set Environment
ENV NODE_ENV development
ENV HOST=0.0.0.0

## Set Working Directory
WORKDIR /usr/local

RUN rm -rf /usr/local/app/node_modules/*

## Provide PNPM
RUN curl -sL https://unpkg.com/@pnpm/self-installer | node

## Provide dumb-init (to pass process codes to child processes)
RUN wget https://github.com/Yelp/dumb-init/releases/download/v1.2.5/dumb-init_1.2.5_amd64.deb
RUN dpkg -i dumb-init_*.deb && rm dumb-init_*.deb

## Copy package info as less-privileged user
COPY --chown=node:node ["package.json", "./"]

## Install dependencies, logging only on errors
RUN pnpm i --reporter=silent

## Install Server Globally
RUN pnpm i -g @resistjs/server@latest pino-pretty --reporter=silent

## Add node_modules from parent directory to Environment $PATH
ENV PATH=/usr/local/node_modules/.bin:$PATH

## Set Working Directory
WORKDIR /usr/local/app

## Change to less-privileged user
#USER node TODO

## Copy source files as less-privileged user
COPY --chown=node:node . .

## If Production
## Build for production
RUN pnpm run build

## Expose ports

# Server (Dev)
EXPOSE ${PORT_SERVER_DEV}

# HMR
EXPOSE ${PORT_HMR}

# Node Debugger
EXPOSE ${PORT_DEBUG}

# Server (Dev)
EXPOSE ${PORT_SERVER_PROD}

## Start the production & dev server
CMD resist-server & pnpm run dev
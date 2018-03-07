FROM mhart/alpine-node:8.9.1

MAINTAINER cvstaa

WORKDIR /app
ADD . .

LABEL traefik.backend=loginservice
LABEL traefik.port=8889
LABEL traefik.docker.network=traefik_webgateway
LABEL traefik.frontend.rule=PathPrefix:/login

RUN yarn install

EXPOSE 8889

CMD ["yarn", "start:prod"]

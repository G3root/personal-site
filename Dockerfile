# base node image
FROM node:16-bullseye-slim as base

# set for base and all layer that inherit from it
ENV NODE_ENV production



# Install openssl for Prisma
RUN apt-get update && apt-get install -y openssl sqlite3

# Install all node_modules, including dev dependencies
FROM base as deps

WORKDIR /myapp

ADD package.json .npmrc ./
RUN npm install --production=false

# Setup production node_modules
FROM base as production-deps

WORKDIR /myapp

COPY --from=deps /myapp/node_modules /myapp/node_modules
ADD package.json .npmrc ./
RUN npm prune --production

# Build the app
FROM base as build

WORKDIR /myapp

COPY --from=deps /myapp/node_modules /myapp/node_modules

ADD prisma .
RUN npx prisma generate

RUN --mount=type=secret,id=GITHUB_CLIENT_ID \
    --mount=type=secret,id=GITHUB_CLIENT_SECRET \
    --mount=type=secret,id=SESSION_SECRET \
    --mount=type=secret,id=SITE_URL \
    export GITHUB_CLIENT_ID=$(cat /run/secrets/GITHUB_CLIENT_ID) && \
    export GITHUB_CLIENT_SECRET=$(cat /run/secrets/GITHUB_CLIENT_SECRET) && \
    export SESSION_SECRET=$(cat /run/secrets/SESSION_SECRET) && \
    export SITE_URL=$(cat /run/secrets/SITE_URL)  && \
    echo GITHUB_CLIENT_ID=$GITHUB_CLIENT_ID >> .env && \
    echo GITHUB_CLIENT_SECRET=$GITHUB_CLIENT_SECRET >> .env && \
    echo SESSION_SECRET=$SESSION_SECRET >> .env && \
    echo SITE_URL=$SITE_URL >> .env 

RUN test -f .env && echo 'It Exists'

ADD . .
RUN npm run build

# Finally, build the production image with minimal footprint
FROM base

ENV DATABASE_URL=file:/data/sqlite.db
ENV NODE_ENV="production"

# add shortcut for connecting to database CLI
RUN echo "#!/bin/sh\nset -x\nsqlite3 \$DATABASE_URL" > /usr/local/bin/database-cli && chmod +x /usr/local/bin/database-cli

WORKDIR /myapp

COPY --from=production-deps /myapp/node_modules /myapp/node_modules
COPY --from=build /myapp/node_modules/.prisma /myapp/node_modules/.prisma

COPY --from=build /myapp/.env /myapp/.env
COPY --from=build /myapp/dist /myapp/dist
COPY --from=build /myapp/server /myapp/server
COPY --from=build /myapp/public /myapp/public
COPY --from=build /myapp/package.json /myapp/package.json
COPY --from=build /myapp/start.sh /myapp/start.sh
COPY --from=build /myapp/prisma /myapp/prisma

ENTRYPOINT [ "./start.sh" ]
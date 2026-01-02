ARG NODE_VERSION=22.11.0
ARG YARN_VERSION=4.3.1
ARG PYTHON_VERSION=3.10.12

FROM debian:12-slim AS build

ARG NODE_VERSION
ARG YARN_VERSION
ARG PYTHON_VERSION

ENV DEBIAN_FRONTEND=noninteractive

# Install dependencies
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    ca-certificates \
    curl \
    git \
    jq \
    openssl \
    build-essential \
    libssl-dev \
    zlib1g-dev \
    libbz2-dev \
    libreadline-dev \
    libsqlite3-dev \
    curl \
    libncursesw5-dev \
    xz-utils \
    tk-dev \
    libxml2-dev \
    libxmlsec1-dev \
    libffi-dev \
    liblzma-dev

# Install mise and toolchains (Node.js + Python)
ENV PYTHONUNBUFFERED=1
ENV MISE_YES=1
ENV PATH=/root/.local/bin:/root/.local/share/mise/shims:$PATH
RUN curl -fsSL https://mise.run | sh
RUN mise install node@${NODE_VERSION} python@${PYTHON_VERSION}
RUN mise use -g --pin node@${NODE_VERSION} python@${PYTHON_VERSION}

# Activate the desired Yarn version via Corepack (ships with Node)
RUN corepack enable && corepack prepare yarn@${YARN_VERSION} --activate

WORKDIR /app

COPY yarn.lock package.json ./
COPY packages/backend/package.json ./packages/backend/package.json
COPY packages/app/package.json ./packages/app/package.json
COPY packages/backstage-theme-github/package.json ./packages/backstage-theme-github/package.json
COPY plugins/ plugins/
COPY .yarnrc.yml ./
RUN yarn install --immutable

COPY tsconfig.json ./
COPY lerna.json ./
COPY backstage.json ./
COPY packages/ packages/
COPY plugins/ plugins/
RUN yarn tsc

COPY app-config.yaml ./
RUN yarn build:backend

FROM debian:12-slim AS run

ARG NODE_VERSION
ARG YARN_VERSION
ARG PYTHON_VERSION

# Install dependencies
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    ca-certificates \
    curl \
    git \
    jq \
    unzip \
    openssl \
    build-essential \
    libssl-dev \
    zlib1g-dev \
    libbz2-dev \
    libreadline-dev \
    libsqlite3-dev \
    curl \
    libncursesw5-dev \
    xz-utils \
    tk-dev \
    libxml2-dev \
    libxmlsec1-dev \
    libffi-dev \
    liblzma-dev

# Install mise and toolchains (Node.js + Python)
ENV PYTHONUNBUFFERED=1
ENV MISE_YES=1
ENV PATH=/root/.local/bin:/root/.local/share/mise/shims:$PATH
RUN curl -fsSL https://mise.run | sh
RUN mise install node@${NODE_VERSION} python@${PYTHON_VERSION}
RUN mise use -g --pin node@${NODE_VERSION} python@${PYTHON_VERSION}

# Activate the desired Yarn version via Corepack
RUN corepack enable && corepack prepare yarn@${YARN_VERSION} --activate

WORKDIR /app

ENV NODE_ENV=production
ENV NODE_OPTIONS="--max-old-space-size=1000 --no-node-snapshot"

# Copy repo skeleton first, to avoid unnecessary docker cache invalidation.
# The skeleton contains the package.json of each package in the monorepo,
# and along with yarn.lock and the root package.json, that's enough to run yarn install.
COPY yarn.lock ./ 
COPY package.json ./
COPY --from=build /app/packages/backend/dist/skeleton.tar.gz ./
RUN tar xzf skeleton.tar.gz && rm skeleton.tar.gz

COPY .yarnrc.yml ./
RUN yarn workspaces focus --all --production && rm -rf "$(yarn cache clean)"

# Then copy the rest of the backend bundle, along with any other files we might want.
COPY --from=build /app/packages/backend/dist/bundle.tar.gz app-config*.yaml ./
RUN tar xzf bundle.tar.gz && rm bundle.tar.gz

# Copy any other files that we need at runtime
COPY app-config.yaml app-config.production.yaml ./
COPY examples/ examples/

# Cleanup
RUN rm -rf /var/lib/apt/lists/* \
    /tmp/* \
    /var/tmp/*

EXPOSE 7007

LABEL org.opencontainers.image.source="https://github.com/echohello-dev/backstage"
LABEL org.opencontainers.image.description="Backstage is an open platform for building developer portals."

WORKDIR /app/packages/backend

CMD ["node", ".", "--config", "../../app-config.yaml", "--config", "../../app-config.production.yaml"]

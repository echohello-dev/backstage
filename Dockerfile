ARG NODE_VERSION=18.19.1
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

# Install asdf
ENV ASDF_DIR=/root/.asdf
ENV PATH=$ASDF_DIR/bin:$ASDF_DIR/shims:$PATH
ENV ASDF_DEFAULT_TOOL_VERSIONS_FILENAME=../../root/.tool-versions
RUN git clone https://github.com/asdf-vm/asdf.git /root/.asdf --branch v0.14.0

# Install Python
ENV PYTHONUNBUFFERED=1
RUN asdf plugin add python && \
    asdf install python $PYTHON_VERSION && \
    asdf global python $PYTHON_VERSION

# Install Node.js
RUN asdf plugin add nodejs && \
    asdf install nodejs $NODE_VERSION && \
    asdf global nodejs $NODE_VERSION

ENV COREPACK_ROOT=/root/.corepack
ENV PATH=$COREPACK_ROOT:$PATH
RUN mkdir $COREPACK_ROOT && \
    corepack enable --install-directory $COREPACK_ROOT && \
    corepack prepare yarn@${YARN_VERSION} --activate && \
    asdf reshim nodejs

WORKDIR /app

COPY yarn.lock package.json ./
COPY packages/backend/package.json ./packages/backend/package.json
COPY packages/app/package.json ./packages/app/package.json
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

# Install asdf
ENV ASDF_DIR=/root/.asdf
ENV PATH=$ASDF_DIR/bin:$ASDF_DIR/shims:$PATH
RUN git clone https://github.com/asdf-vm/asdf.git /root/.asdf --branch v0.14.0

# Install Python
ENV PYTHONUNBUFFERED=1
RUN asdf plugin add python && \
    asdf install python $PYTHON_VERSION && \
    asdf global python $PYTHON_VERSION

# Install Node.js
RUN asdf plugin add nodejs && \
    asdf install nodejs $NODE_VERSION && \
    asdf global nodejs $NODE_VERSION

ENV COREPACK_ROOT=/root/.corepack
ENV PATH=$COREPACK_ROOT:$PATH
RUN mkdir $COREPACK_ROOT && \
    corepack enable --install-directory $COREPACK_ROOT && \
    corepack prepare yarn@${YARN_VERSION} --activate && \
    asdf reshim nodejs

WORKDIR /app

ENV NODE_ENV production
ENV NODE_OPTIONS "--max-old-space-size=1000 --no-node-snapshot"

# Copy repo skeleton first, to avoid unnecessary docker cache invalidation.
# The skeleton contains the package.json of each package in the monorepo,
# and along with yarn.lock and the root package.json, that's enough to run yarn install.
COPY yarn.lock ./ 
COPY package.json ./
COPY --from=build /app/packages/backend/dist/skeleton.tar.gz ./
RUN tar xzf skeleton.tar.gz && rm skeleton.tar.gz

RUN yarn workspaces focus --all --production && rm -rf "$(yarn cache clean)"

# Then copy the rest of the backend bundle, along with any other files we might want.
COPY --from=build /app/packages/backend/dist/bundle.tar.gz app-config*.yaml ./
RUN tar xzf bundle.tar.gz && rm bundle.tar.gz

# Copy any other files that we need at runtime
COPY app-config.yaml app-config.production.yaml ./

# Cleanup
RUN rm -rf /var/lib/apt/lists/* \
    /tmp/* \
    /var/tmp/*

EXPOSE 7007

LABEL org.opencontainers.image.source https://github.com/echohello-dev/backstage
LABEL org.opencontainers.image.description "Backstage is an open platform for building developer portals."

WORKDIR /app/packages/backend

CMD node . --config ../../app-config.yaml --config ../../app-config.production.yaml

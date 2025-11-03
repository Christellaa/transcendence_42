FROM debian:bookworm-slim

ENV DEBIAN_FRONTEND=noninteractive

WORKDIR /app

RUN apt-get update

RUN apt-get -y install curl tar gzip unzip bash ca-certificates && rm -rf /var/lib/apt/lists/*

RUN curl -fsSL https://bun.com/install | bash


RUN curl -L https://github.com/ava-labs/avalanchego/releases/latest/download/avalanchego-linux-amd64.tar.gz \
| tar -xz && mv avalanchego /usr/local/bin/ && mv plugins /usr/local/bin/plugins

COPY package.json ./
COPY script/start.sh /start.sh

RUN chmod +x /start.sh

ENV PATH="/root/.bun/bin"
RUN bun install

# CMD ["sleep", "infinity"]
# CMD ["bun", "--watch", "srcs/index.ts"]
CMD ["/start.sh"]

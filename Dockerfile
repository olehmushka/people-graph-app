# NOTE: pinned to node:22-alpine rather than the newer node:24-alpine used
# elsewhere in this project ecosystem. This service depends on the old,
# deprecated `grpc` package (pre-@grpc/grpc-js), whose native C++ addon
# genuinely fails to compile on Node 24 (Alpine's newer GCC rejects grpc's
# C-core std::memory_order usage). Verified empirically: node 14/16/18/20/22
# all compile it successfully; node 24 fails with real C++ errors every time.
# 22 is the newest version that actually works, and is itself a current
# Active LTS release. Revisit once this service migrates off `grpc`.
FROM node:22-alpine

WORKDIR /usr/src/app

# python3/make/g++ are required to compile grpc's native addon from source
# (no prebuilt binary exists for this Node/musl combination).
RUN apk add --no-cache python3 make g++

COPY . /usr/src/app
RUN yarn install --ignore-optional --silent

EXPOSE 3000
EXPOSE 3001

CMD ["yarn", "start"]

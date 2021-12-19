# build frontend
FROM node:16 as js-builder
ENV GENERATE_SOURCEMAP=false

WORKDIR /app
COPY . /app
RUN npm install
RUN npm run build

# build final image
FROM scratch
USER app
COPY --from=js-builder /app/build /frontend-build
FROM node:alpine as build

WORKDIR /app
COPY . .
RUN npm ci && npm run build

FROM nginx:alpine
COPY --from=build /app/dist/ghost-network-spa /usr/share/nginx/html/
EXPOSE 80

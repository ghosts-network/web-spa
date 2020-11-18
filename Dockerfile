FROM node:alpine as build

ARG configuration=production

WORKDIR /app
COPY . .
RUN npm ci && npm run build -- --configuration=production

FROM nginx:alpine
COPY --from=build /app/dist/ghost-network-spa /usr/share/nginx/html/
EXPOSE 80

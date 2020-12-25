FROM node:alpine as build

ARG configuration=production

WORKDIR /app
COPY . .
RUN npm ci && npm run build -- --configuration=configuration

FROM nginx:alpine
COPY --from=build /app/dist/ghost-network-spa /usr/share/nginx/html/
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

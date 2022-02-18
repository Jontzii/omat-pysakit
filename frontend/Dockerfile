# Build stage
FROM node:lts-alpine as build

WORKDIR /app
COPY . .
RUN npm run build

# Serve the page
FROM nginx:stable-alpine

WORKDIR /etc/nginx
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

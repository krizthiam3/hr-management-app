# Build Angular app
FROM node:18-alpine AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --configuration=production

# Serve con Nginx
FROM nginx:alpine
COPY --from=build /app/dist/angular-frontend /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

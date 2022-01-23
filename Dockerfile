# First we'll build project.
FROM node:alpine AS builder
ENV NODE_ENV production
WORKDIR /usr/calculator-frontend
COPY package*.json ./
COPY tsconfig*.json ./
RUN npm install --production
COPY . .
RUN npm run build

# Lets collect assets and run with nginx.
FROM nginx:alpine
ENV NODE_ENV production
COPY --from=builder /usr/calculator-frontend/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
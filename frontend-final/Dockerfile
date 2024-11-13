# Stage 1: Build the React app
FROM node:14 AS build
WORKDIR /app
COPY package*.json ./

# Install dependencies including react-router-dom
RUN npm install react-router-dom && npm install

COPY . .

# Build the React app for production
RUN npm run build

# Stage 2: Serve the app using Nginx
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


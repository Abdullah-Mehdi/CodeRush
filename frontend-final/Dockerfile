# Stage 1: Build the React app
FROM node:14 AS build
WORKDIR /app

# Install dependencies including @monaco-editor/react, axios, and react-router-dom
COPY package*.json ./
RUN npm install @monaco-editor/react axios react-router-dom react-helmet && npm install

COPY . .

# Build the React app for production
RUN npm run build

# Stage 2: Serve the app using Nginx with a custom configuration
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom nginx config file to handle client-side routing for React Router
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]




# Base image
FROM node:22-alpine

# Install PostgreSQL client tools (pg_isready, psql, etc.)
RUN apk add --no-cache postgresql-client

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Install TypeScript globally (optional, if needed for CLI use)
RUN npm install -g typescript

# Make init script executable
RUN chmod +x scripts/init-db.sh

# Compile TypeScript to JavaScript
RUN npm run build

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["node", "dist/index"]

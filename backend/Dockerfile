# Use the official Node.js 14 image as base
FROM node:20

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (if present) to /app
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Command to run the application
CMD ["npm", "run", "dev"]

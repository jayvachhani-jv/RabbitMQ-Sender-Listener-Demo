FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application files
COPY . .

# Expose port (optional, for any web interface)
EXPOSE 3000

# Default command (can be overridden)
CMD ["npm", "run", "start:listener"] 
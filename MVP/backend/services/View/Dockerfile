# Use a node image as the base
FROM node

# Set the working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy TypeScript and other files
COPY . .


# Build TypeScript files
RUN npx tsc

# Expose port
EXPOSE 4002

# Start the server
CMD ["node", "dist/app.js"]

# Use stable Node image
FROM node

# Set app directory
WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install only prod dependencies
RUN npm install --omit=dev

# Copy the entire app
COPY . .

# Expose your app port (change if needed)
EXPOSE 3000

# Run the app
CMD ["node", "app.mjs"]

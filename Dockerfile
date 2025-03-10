FROM oven/bun

# Set working directory
WORKDIR /app

# Copy package.json and bun.lock
COPY package.json bun.lock ./

# Install dependencies
RUN bun install

# Copy all files
COPY . .

# Expose port
EXPOSE 3000

# Start the app
CMD ["bun", "start"]
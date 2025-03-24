# Use the latest Node.js image
FROM node:latest

# Set up a working directory inside the container
WORKDIR /src/app

# Copy package.json and package-lock.json first (for efficient caching)
COPY package.json package-lock.json /src/app/

# Install dependencies
RUN npm install

# Install `nodemon` globally for hot-reloading
RUN npm install -g nodemon

# Copy the rest of the application code
COPY . /src/app

# Ensure the script for waiting on the database is set up
RUN apt update && apt install -y bash
COPY wait-for-it.sh /usr/local/bin/wait-for-it.sh
RUN chmod +x /usr/local/bin/wait-for-it.sh

# Expose the port your app runs on
EXPOSE 8081

# Use nodemon to watch for file changes (including tests)
CMD ["sh", "-c", "wait-for-it.sh db:5432 -- npx knex migrate:rollback --all && npx knex migrate:latest && npx knex seed:run && npm start"]

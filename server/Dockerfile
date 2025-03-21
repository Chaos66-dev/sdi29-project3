# What image do you want to start building on?
FROM node:latest

# Make a folder in your image where your app's source code can live
RUN mkdir -p /src/app

# Tell your container where your app's source code will live
WORKDIR /src/app

# What source code do you what to copy, and where to put it?
COPY . /src/app

# Does your app have any dependencies that should be installed?
RUN npm install

# ensures that we don't try to seed/create tables until our db container is ready
RUN apt update && apt install -y bash
COPY wait-for-it.sh /usr/local/bin/wait-for-it.sh
RUN chmod +x /usr/local/bin/wait-for-it.sh

# What port will the container talk to the outside world with once created?
EXPOSE 8081

# How do you start your app?
CMD ["sh", "-c", "wait-for-it.sh db:5432 -- npx knex migrate:latest && npx knex seed:run && npm start"]
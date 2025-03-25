# Readiness Tracker

## Team Galvanized Guardians Roster Fix

## Setup

1. Clone down this project
    - Click on the code button at the top copy the link provided
    - Run 
    ```
    git clone URL
    ```
2. Run
    ```
    cd sdi29-project3
    ```
3. Run
    ```
    docker-compose up --build
    ```
4. In a browser navigate to 
    ```
    localhost:1000
    ```

You should now have a test data filled application that will provide you with a look at what the site can do.

When finished with the app/server
- Hit `ctrl-c` to shut down the server
- Run
```
docker-compose down --rmi all
```

## Site Functionality

The Readiness Tracker keeps track of multiple units and the peronnel in those units tracking trainings due and readiness status.

On first load you will be greeted by:

<homescreen image>

Where you will sign in based on your personnel ID.

This ID code will set your information in the database for the initial run with no additional data added this will have to be a number between 1 and 3.

When signed in with a valid ID you can then navigate to the personnel, units or training button to view the information about the ID you have entered. 

### Home

When clicked will take you back to the main page allowing you to either sign in to a new id or sign out

### Personnel

If logged in with a valid ID will present you all the peronal information associated with the ID you logged in with

### Units

If logged in with a valid ID will present you all the unit information associated with the ID you logged in with

### Training

If logged in with a valid ID will present you all the training information associated with the ID you logged in with

### Create

Takes you to a list of input fields that will allow a user to add in new informatiom into the database.

There are tabs under the navigation buttons that will set you to the type of information you are trying to create:

- Unit
- Peronnel
- Trainings

## Testing
Logging into user 5 will set your account to our admin user that will be able to see all information availiable to the site

Running the tests that are included works as follows:

1. Compose the docker image with
```
docker-compose up --build
```
2. Testing the server 
    - In a seperate console with the docker compose running
```
docker exec -it project-3-server
```
The above command will log you into the docker server container that is running from the docker-compose
```
npm test
```
3. Testing the ui 
    - In a seperate console with the docker compose running
```
docker exec -it project-3-ui
```
The above command will log you into the docker ui container that is running from the docker-compose
```
npm test
```
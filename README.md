# Technical Test

The project structure is changed to hold the frontend and backend part of the code separately. Each part has its own dockerfile. The docker compose uses respective docker file during the build process.

# Installation

The frontend and backend uses their own specific node_modules. Both are configured to use yarn. Feel free to change the package manager according to your needs.

Backend:

```
# cd into backend folder
cd backend
# install node_modules
yarn
# copy env file. please feel free to change the env variables to suit your needs
cp .env.sample .env
# start the server
yarn dev
```

The backend server should be running on the specified port.(8000 by default)

Frontend:

```
# cd into frontend
cd frontend
# install node_modules
yarn
# copy env file
cp .env.sample .env
# start in development mode
yarn dev
```

This should run the frontend in the default port 3000.

# Getting everything up with docker compose

**(Please make sure that docker daemon is up and running!)**
The root directory has a docker compose file with which we can get everything up and running in the docker.
To use the docker compose file, we can use the following command:
`docker-compose up`

# Running tests

The test file for backend is inside the `backend/src/__tests__` directory. Jest will automatically detect it and load when running tests.

Since our backend is dependent on mongodb and wiremock, we have to get it running first before we can attempt to run tests.

```
docker-compose up wiremock
docker-compose up mongodb
```

This will create the wiremock and mongodb instances we can use for running tests.
Finally execute the test script

`yarn test`

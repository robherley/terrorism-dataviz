# HST-325 Final Project

## Running Locally

Download the [Global Terrorism Database](https://www.kaggle.com/START-UMD/gtd) (as a csv), and load the data into a SQLite database named `terror.sqlite` and place it in `/backend/db`.

Add an environment variable for [mapbox](https://www.mapbox.com/) as `REACT_APP_MAPBOX_TOKEN`.

Start the server (port 3001): `npm start --prefix backend/`

Start the frontend (port 3000): `npm start --prefix frontend/`

**NOTE**: Uses IndexedDB for caching, so second page load will be ~2 sec instead
of ~7 seconds.

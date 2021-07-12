# Equine Register Test

Thanks for giving me a shot a this.

## Installation

The project consists of an express server and a react client. Both projects can be installed and run from the root directory.

To install dependencies run:

### `npm install`

For the client project you will have to manually create a file and add the mapbox api key.

### `cd client`

### `touch .env.local`

Then add your api environment variable in this file - like so:

### `REACT_APP_MAPBOX_ACCESS_TOKEN=your-token-here`

Then from the root of the project run

### `npm start`

The application will be available to view on http://localhost:3000/

## Tests

There is a basic test which simulates a user performing a search and tests that the ui renders some details from a mocked response.

Run the test from the client directory:

### `cd client`

### `npm t`

## Todo

Validation, accessibility, refactor components. Also a separate branch for heatmap (wip - not working)

![image](https://user-images.githubusercontent.com/17351828/125252450-4c982580-e2f0-11eb-9dc3-238774f717f2.png)

![image](https://user-images.githubusercontent.com/17351828/125254386-51f66f80-e2f2-11eb-8559-876101d2d9dc.png)


<h2 align="center">Product Development Team Challenge</h2>

The app pulls data about launches from the space-x public REST API [https://github.com/r-spacex/SpaceX-API/tree/master/docs/v4](https://github.com/r-spacex/SpaceX-API/tree/master/docs/v4).
You should be able to easily find the information there that you need to make the necessary API calls and extract the data needed.

### 1) Fixed bugs
Filter launches by mission name and throttled searches.
Filter ignores letter case.  
Moved hover panel next to rocket name.
Fix title and search/sort form and only have the launches scroll when overflowing.

### 2) Added features
Sorting of the launches by Launch Name and Rocket Name. Rocket name returned leveraging query and populate.

## To Be Done
Add tests
Fix hover panel which is positioned next to rocket name. 1) switch cursor to pointer 2) hover on an info icon for clarity
Refactor for clarity and add comments
Add and test a feature where clicking on any given launch will load and display information about the rocket.
used in that launch in a modal window on the same page. Include the images of the rocket referenced in the api. 
Fix dependencies with high vulnerabilities
With the scrolling overflow, the launch popover fails to show.

## App Setup

### Available Scripts

In the project directory, you can run:

### `npm i` or `yarn`

Installs dependencies. You'll need to do this prior to starting the app.

### `npm start` or `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test` or `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## Docker

If you have problems starting the app, you can try running it inside a docker container:

### `docker build -t challenge:dev .`
### `docker run -it --rm -p 3000:3000 challenge:dev`

When using docker, you need to rebuild and rerun for any changes to the code to take effect.

<h2 align="center">Outlier Product Development Team Challenge</h2>

Welcome to the Outlier Product Development Team Developer Challenge.

This repo contains a small UI project written in React and Redux. The repo is designed to be simple to start and run with just npm
(or yarn). If you do have trouble running the app, there are instructions for running it in Docker. All the tools 
for writing tests and code should be included, but feel free to add additional dependencies if you find that helps you.
(See the setup instructions below to build, run and test the app.)

You don't have to be a React pro to complete the challenge but you will need at least a working knowledge of these
frameworks in order to progress in the allotted time. Your code should be a demonstration of the best coding practices you
know for working on large scale apps with large teams (despite the fact this is a small one-page app you are working on yourself -- 
work like you are developer-zero establishing best practices on a project you expect to grow in size on a team that will quickly scale).
 
## Instructions

The app pulls data about launches from the space-x public REST API [https://github.com/r-spacex/SpaceX-API/tree/master/docs/v4](https://github.com/r-spacex/SpaceX-API/tree/master/docs/v4).
You should be able to easily find the information there that you need to make the necessary API calls and extract the data needed.

Your task consists of the following (in order of importance):

### 1) Fix bugs

The input above the list of launches is intended to filter by mission name. If you enter a value in the input
 we only want to see missions whose names include that value. Currently, filtering only occurs after a click on the
 'sort' toggle. Filtering should instead occur as we type into the input. Even when it works, filtering doesn't 
 handle capitalization well. 
 
 Note the sort feature wasn't completed... (see Feature A below)
 
When hovering over the launch names, a hovering panel appears showing launch details. This panel is stuck
at the top of the page for every launch, the panel should appear next to the launch.

Currently the entire page scrolls when viewing the launches. According to the design we want the other UI elements to stay in
place and always visible and only have the launches scroll when overflowing.

### 2) Add new features

#### Feature A
Finish the work to make sorting of the launches by Launch Name and Rocket Name. Note the launch api returns rocket id, not rocket name.

#### Feature B
If you still have time, add and test a feature where clicking on any given launch will load and display information about the rocket 
used in that launch in a modal window on the same page. Include the images of the rocket referenced in the api. 


## General Guidance

As you go about completing your assigned tasks, feel free to add files, breakup components or modularize and generally
clean up code to conform to your idea of best coding practices. The provided code is intentionally problematic
and should definitely not be taken as an existing preferred style or pattern to adhere to.

Write the tests that you think are appropriate to the work you have done. We have included some empty tests in 
`LaunchCollectionReducer.test.js` and `LaunchAction.test.js` that you can fill in to get you started as well as at least
the minimum of test libraries. You can add other test libraries or extensions if you like and/or rename the test files. 
Since there is a limited amount of time we'd like you to spend on this challenge, be prepared to explain to us why you 
focused on testing whatever it is that you tested.

Don't worry too much about styling (colors, fonts etc.). Do make the end product usable and minimal. Ideally the final product
 should be visually appealing, but place more emphasis on usability than graphic design, code with the assumption that 
 colors, borders, backgrounds and margins
might change according to forthcoming design requirements and your job is make a clean flexible and re-usable layout.

Finally, we want to be respectful of your time, so we don't expect you to spend more than 4 hours on this. If you'd like to
you can, just let us know the total time spent and what you spent the additional time on. If you're very close to finishing and
you need an additional half hour or so that's also fine. We just don't have the expectation that you'd spend an entire day on this.

When you're done, open a pull request on the repo for us to review your work.

Good Luck!

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

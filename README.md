# Scoreboard

Simple application to display scoreboard of ongoing matches based on [sport data api](https://app.sportdataapi.com/documentation#matches).

To make it run you need an apikey from the API provider. If you want to use my key for testing, please contact me.

Some assumed business requirements:

- it displays ongoing matches based on their statusCode (for the sake of presentation it shows also matches that have finished or haven't started yet)
- matches are ordered by their total score (from the highest) and date (from the most recent one) - if the score or date is invalid the game is still displayed if status code sis valid (invalid score causes game to show as the last one, invalid date doesn't change order)

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

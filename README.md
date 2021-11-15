# Strength^N

## Project Summary

Strength^n is a randomization algorithm that allows an administrator to make combinations from a list of participants. The goal of this project is to create a user interface to allow scheduling with your new combination, visualizing your growing network of meaningful connections, and maybe even texting functionality.

## Getting Started

### Prerequisites

- Heroku account
- Svelte install (steps below)
- Copy repo from Github

```javascript
// install npm packages
npm i

```

- Running locally:

```javascript
// run local svelte env
npm run dev

```

> Note: the `@next` is temporary

### Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```javascript
npm run dev

// or start the server and open the app in a new browser tab
npm run dev -- --open
```

### Building

Before creating a production version of your app, install an [adapter](https://kit.svelte.dev/docs#adapters) for your target environment. Then:

```bash
npm run build
```

> You can preview the built app with `npm run preview`, regardless of whether you installed an adapter. This should _not_ be used to serve your app in production.

## Testing

We use Jest as our testing platform. We have tests for the back-end analyzing the core capibilties of the project. The command "npm run test" will run the tests while "npm test --coverage" will dispaly a detailed coverage report

## Deployment

In order to deploy out project, we hooked our repo up to Herkou and created a Procfile that runs a command to serve up a build on heroku servers

Where does the production system live? How would a new developer get access to it? Lives on Github and deployed with Heroku. Front-end and back-end run in different repos

Are there any staging or pre-production environments that developers can use? No just main

What are the various pieces that the fully deployed software uses? For example, with Heroku, what addons does the app use?

Uses Heroku Postgres for cloud database

Is continuous integration or continuous deployment enabled? If so, where does it live?
Yes, everytime you push to main Heroku restarts build

## Technologies used

- Heroku
- Svelte
- Postgres

## Contributing

In order to contribute to the project, you have to request access to the repository or do pull requests with specific features. In order to learn more about styling conventions and other details, please see our site page to learn more.

https://tarheels.live/strengthn/

## Authors

Leon Lash
Sena Atay
Wali Khan

## License

MIT License

## Acknowledgements

We want to acknoledge out mentor Thomas for his continuous guidance!

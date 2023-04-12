# Front-end of shimpeko's personal website

## Development

### Setup development environment

#### Install NodeJS

Check the existing installation by running the following command;
```
node --version
npm --version
```

It is recommended to install node and npm with a version manager like `nvm`. See https://github.com/nvm-sh/nvm#installing-and-updating.

Check https://docs.npmjs.com/downloading-and-installing-node-js-and-npm for more about node installation.

#### Install packages

```
npm install
```

### Run HTTP server locally

```
npx next dev
```

You can confirm by accessing http://localhost:3000 with your browser.

## Deploy

This app is using Cloudflare Pages.

Changes to the main branch will be deployed automatically via CI.

## Manual deploy

Login to Cloudflare.
```
$ npx wrangler login
```

Run deploy script.
```
$ ./script/deploy.sh
```

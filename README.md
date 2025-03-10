# What's My IP? API

A simple service that tells you your IP address. Built with [Hono](https://hono.dev/) and [Bun](https://bun.sh/).

## Features

- Shows your current public IP address
- Clean UI with copy-to-clipboard functionality
- Simple JSON API endpoint

## Installation

To install dependencies:

```sh
bun install
```

## Running Locally
to run the development server with hot reload:
```sh
bun run dev
```

For production:
```sh
bun run start
```

Open http://localhost:3000 in your browser to see the application

## Api Endpoints

- `GET / ` - Main page with UI
- `GET /ip4` - Returns your IP address as plain text

## Docker
Build the docker image
```sh
docker build -t ip-api .
```

Run the Docker container
```sh
docker run -p 3000:3000 ip-api
```

Access the application at http://localhost:3000
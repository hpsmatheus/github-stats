## GitHub Stats

Tech Stack: [Node.js](https://nodejs.org/en/docs/), [Typescript](https://www.typescriptlang.org/docs/), [Nest.js](https://docs.nestjs.com/)

## Requirements

- Node v16.13.2 or higher

## Run Application Locally

```bash
$ git clone
```

```bash
$ npm install
```

```bash
$ npm run start:dev
```

## API Docs

[Swagger] http://localhost:300/api-docs

## Tests

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

## Linter and formatting

```bash
# find problems
$ npm run lint

# find and fix problems automatically
$ npm run lint:fix

# format code
$ npm run format
```

## Folder Structure

The API design follows the basic Nest.js structure with modules, controllers and services. Clients are used to interact with external APIs. Nest.js interceptors are used to monitor the request flow, catch errors and log operations. Nest.js validation pipes are used to validate input to API endpoints.

```
> src
  > clients                         (clients to interact with external APIs, ex: GitHub API)
  > core                            (files that are used all over the API)
     > error                        (files to do the error handling and format API errors)
     > request-interceptor          (Nest.js interceptor to catch errors and do API logging)
     > api-validation.pipe.ts       (Nest.js pipe to validate DTOs)
     > swagger-response.ts          (abstraction to add and reuse swagger responses)

  > modules             (the modules of the application separated by domain, ex.: commits)


  > typings             (contains all the API typings)
  > main.ts             (application entrypoint)

> test
  > integration      (integration tests mocking github external api)
  > mocks            (mocks used all over the tests)
  > unit             (unit tests)


```

## Improvements

**Interaction with GitHub API**: a personal token with read-only permission to public repos
is being used to interact with the GitHub API. As is necessary to generate a bundle
file, the token is hard coded on a local file (not commited to GitHub repo).
A better solution here would be having this token stored in a secrets manager or in a vault, and in the local environment using a environment variable.

**Performance**: limiting the periods for searches or receiving pagination parameters in the backend could avoid performance issues.

**Dates**: validating the date formats could avoid internal errors.

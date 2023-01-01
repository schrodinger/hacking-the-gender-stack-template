# Schrodinger Hackathon - frontend

The frontend is a [React](https://beta.reactjs.org/) single page application written using [TypeScript](https://www.typescriptlang.org/) and [SCSS](https://sass-lang.com/) and bundled/served using [Vite](https://vitejs.dev/).

For the best development experience we recommend using VSCode as your editor with the pre-configured development environment.

## Usage

_All commands mentioned in this README should be executed in the `frontend` directory_

- Install all dependencies

```sh
$> npm install
```

- Start the development server

```sh
$> npm run dev
```

- Lint all files for errors

```sh
$> npm run lint
```

- Bundle a production build

```sh
$> npm run build
```

## Development

### Build system

The build system tooling for an application encapsulates everything from setting up a development environment, tools to enhance development experience all the way to packaging and optimizing an application for production. As such, most developers don't need to dive too deep into how the build system works to contribute code to their application. If you're not planning on making any changes to the pre-configured development environment, you do not necessarily need to read through this section of the documentation. But if you'd like to make changes to your development environment or if you're just curious about things happening under the hood, this documentation should help you get a high level idea of the frontend tooling.

The build system for the frontend relies on the following tools to orchestrate a smooth development experience (these tools are pre-configured for you with sensible defaults but you can always update the configuration to suit your needs):

#### [TypeScript](https://www.typescriptlang.org/)

TypeScript is the language we use to write all of our application code for the frontend. TypeScript is a superset of JavaScript with a strong type system to prevent common errors and encourage exhaustive handling of edge cases. TypeScript has native support in most editors like VSCode which means you can see type-checking output in your editor as you code.

#### [Vite](https://vitejs.dev/)

Vite is the bundler we use to transform and compile all of our separate TypeScript modules into a final production ready JavaScript bundle that can be shipped to a browser. Beyond that, vite also provides us with a server that we can use while developing the application to see our code changes in real time without having to constantly rebuild the application. We also orchestrate type checking and linting during development through the vite development server.

#### [ESLint](https://eslint.org/)

ESLint is a linter (static code analyzer) for JavaScript and TypeScript that can help identify and fix potentially problematic code. It also helps us enforce a consistent code style across the application which can be very helpful when you're working on an team with multiple developers. We've configured ESLint to run alongside our development server so we can see any linting errors in our terminal and browser as we code but you can also run ESLint to lint through the application code manually by running `npm run lint:es` in your terminal. We've also configured VSCode to display and fix lint errors in the editor itself with the help of the [ESLint extension for VSCode](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint).

#### [Stylelint](https://stylelint.io/)

Stylelint is a linter (static code analyzer) for CSS-like syntaxes (SCSS in our case) in the same way that ESLint is a linter for JavaScript and TypeScript. Therefore we use it in much the same way as we use ESLint - it is run alongside our vite development server and you can run it manually by running the command `npm run lint:css` in your terminal. VSCode integration for Stylelint is provided by the [Stylelint extension for VSCode](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint).

#### [Prettier](https://prettier.io/docs/en/index.html)

Prettier is an opinionated code formatter for almost all languages used in frontend development like JavaScript, TypeScript, CSS, SCSS, HTML, etc. While prettier doesn't analyze our code for potential errors and bugs like the rest of our toolchain, it helps us enforce consistent stylistic formatting of our code (spaces vs tabs for indentation, character limits on individual lines, single quotes vs double quotes, etc.). By doing this, prettier ensures that the code throughout our application stays predictable and consistent over time. Unlike all of our other tools so far the only way we run prettier on our application files is through the editor via the [Prettier for VSCode extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) which formats your files every time you save them.

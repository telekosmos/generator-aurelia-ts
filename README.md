# generator-aurelia-ts

[![Build Status](https://secure.travis-ci.org/kristianmandrup/generator-aurelia-ts.png?branch=master)](https://travis-ci.org/kristianmandrup/generator-aurelia-ts)

Generate an [Aurelia](aurelia.io) Quick Start project with:
- [Aurelia CLI](http://www.programwitherik.com/what-is-aurelia-cli-how-does-it-work/)
- [SASS](http://sass-lang.com/) or [Stylus](https://learnboost.github.io/stylus/) CSS extenstion language
- TypeScript definitions
- A popular UI framework of your choice
- Plugins of your choice installed

### Status

All tests pass!
Generator Tested on MacOSX via `npm link` and all generators now work as expected :)

- aurelia-ts
- aurelia-ts:plugins
- aurelia-ts:typescript

### CSS Frameworks

This generator currently supports:
- [Bootstrap](http://getbootstrap.com) 3.3.x
- [Zurb Foundation](http://foundation.zurb.com/) 5.5.x
- [Semantic UI](semantic-ui.com) 2.0.x
- [Framework7 - F7*](http://www.idangero.us/framework7)

Make a pull request to make the generator support your favorite alternative UI framework (see *Contributing* below).

### TypeScript

We currently use [Aurelia Typings](https://github.com/cmichaelgraham/aurelia-typescript-atom/tree/master/skel-nav-ts/typings/aurelia) as of *July 24th, 2015*.

We would like to soon integrate use of the [aurelia-amd-bundler](https://github.com/cmichaelgraham/aurelia-amd-bundler)

Ideas ror how to best achieve TypeScript support are most welcome!

Please submit pull requests for further TypeScript Definition updates or help integrate with auto generation (when mature).

## Install

To install generator-aurelia-ts from npm, run:

```bash
npm install -g generator-aurelia-ts
```

## Run

Create a folder for your app:

```bash
mkdir my-app
cd my-app
```

Initiate the app generator (default):

```bash
yo aurelia-ts
```

Alternatively pass application name as first argument

```bash
yo aurelia-ts my-app
```

Answer the prompts in order for the generator to generate your Aurelia project to suit your preferences.

### Generator options

Run with TypeScript `--ts` and Plugins `--plugins` generators auto enabled.

```bash
yo aurelia-ts --ts --plugins
```

### CSS language extension options

The generator also supports *SCSS* and *Stylus* via `--scss` and `--stylus` options

```bash
yo aurelia-ts --stylus
```

### UI framework option

You can also pass the UI framework as a `--ui` option

```bash
yo aurelia-ts --stylus --ui sem
```

The ui can take any of these shorthands:
- `bs` Bootstrap
- `zurb` Zurb Foundation
- `sem` Semantic-UI
- `f7` Framework7

### Prompts

You will be prompted for the following:
- Your application name
- Yourapplication title
- Your github account
- Your email
- Your name
- UI Framework:
  - Bootstrap 3.3.x
  - Foundation 5.5.x
  - Semantic UI 2.0.x
  - Framework7 1.2.x
- Install Aurelia CLI (default: no)

## TypeScript

After setting up the basic project structure, the main generator will ask you to call the `aurelia-ts:typescript` generator.

If you skip TypeScript, know that you can always add TypeScript later using the `typescript` sub-generator.

```bash
yo aurelia-ts:typescript
```

### Plugins

Experimental support for installing various Aurelia plguins:

`yo aurelia-ts:plugins`

Plugins list:
- [Flux](https://github.com/tfrydrychewicz/aurelia-flux)
- [Authentication](https://github.com/paulvanbladel/aureliauth)
- [Validation](https://github.com/aurelia/validation)
- [i18next](https://github.com/zewa666/aurelia-i18next)
- [Computed properties](https://github.com/jdanyow/aurelia-computed/)
- [Bootstrap Modal])https://github.com/PWKad/aurelia-bs-modal) (if Bootstrap)
- [Rethink DB bindings](https://github.com/kristianmandrup/aurelia-rethink-bindtable)
- [Breeze bindings](https://github.com/jdanyow/aurelia-breeze)
- (TODO: Add YOUR favorite plugins...)

See [jspm registry](https://github.com/jspm/registry/blob/master/registry.json) for predefined entries setup to be installed by name,such as: `jspm install semantic-ui`

## Frameworks

### Semantic-UI

For *Semantic-UI* you should reference `/semantic/dist` in `app.js`

```js
// import '../semantic/dist'; // your themes and customizations
```

You can then customize your layout from within the `/semantic` folder using:
- [Build tools](http://semantic-ui.com/introduction/build-tools.html)
- [Theming](http://semantic-ui.com/usage/theming.html)
- [Recipes](http://semantic-ui.com/introduction/advanced-usage.html)

### Contributing

As you add features, add [yeoman tests](http://yeoman.io/authoring/testing.html)

`npm test`

Use [npm link](http://justjs.com/posts/npm-link-developing-your-own-npm-modules-without-tears) to install it locally to test it as you develop ;)

Create a symbolic link to your local generator:

`npm link generator-aurelia-ts`

Now use the linked package and test it

`yo aurelia-ts`

Profit!

### Adding your Favorite Framework to the generator

Example [F7](http://www.idangero.us/framework7):

For the `app` generator:

In `_package.json` insert the `"framework7"` as a jspm dependency. Note that it includes the [systemjs/plugin-css](https://github.com/systemjs/plugin-css) at the end, which is the [SystemJS](https://github.com/systemjs/systemjs) CSS loader.

```json
  "jspm": {
    "dependencies": {
      ...
    <% if (framework7) { %>
    "framework7": "github:nolimits4web/Framework7@^1.2.0",
    <% } %>
    "css": "github:systemjs/plugin-css@^0.1.9"
  },
```

Add the [JSPM](jspm.io) imports to `templates/src/app.js`.
JSPM can load css via the [JSPM css loader](https://github.com/geelen/jspm-loader-css)

See the [framework7 distribution folder](https://github.com/nolimits4web/Framework7/tree/master/dist) and use it to guide your ES2015 module imports.

Also check out the [package.json](https://github.com/nolimits4web/Framework7/tree/master/package.json) for the project.

We can see, it has a `main` entry pointing to `dist/js/framework7.js` so we can safely import the js via `import 'framework7';`

The `css` imports needs to reference the `dist` folder structure directly.

We add the following to `src/app.js`

```js
<% if (framework7) { %>
import 'framework7';
import 'framework7/css/framework7.ios.css!';
import 'framework7/css/framework7.ios.colors.css!';
<% } %>
```

For the `typescript` generator insert the same imports in `src/app.ts`.

For a finishing touch you can add/customize the Application load spinner in `_index.html`

```html
  <% if (framework7) %>
    // framework 7 spinner here...
  <% } %>
```

Finally test that it all works by adding a unit test, such as:

`test/test-app-framework7.js`

Then run `npm test`. If all tests pass, you can do your pull request :)

*Troubleshooting*

If while developing the generator you get an error such as:

`Uncaught SyntaxError: Unexpected token return`

Most likely due to an [EJS](http://ejs.co/) template error (typically a missing `{` in an `if` clause). Likely it has nothing to do with your generator javascript ;)

### Contributors

- [@telekosmos](https://github.com/telekosmos)
- [@kristianmandrup](https://github.com/kristianmandrup)
- You :)

## TODO

Ideas for improvement are welcome :)

- Install multiple UI/CSS frameworks in the same app...
- Support for more editors/IDEs such as Visual Studio, WebStorm etc.

## License

MIT

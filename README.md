# Ogham

![https://travis-ci.org/evanshortiss/ogham](https://travis-ci.org/evanshortiss/ogham.svg) [![npm version](https://badge.fury.io/js/%40evanshortiss%2Fogham.svg)](https://badge.fury.io/js/%40evanshortiss%2Fogham.svg) [![https://coveralls.io/repos/github/evanshortiss/ogham](https://coveralls.io/repos/github/evanshortiss/ogham/badge.svg?branch=master)](https://coveralls.io/github/evanshortiss/ogham?branch=master)
[![TypeScript](https://badges.frapsoft.com/typescript/version/typescript-next.svg?v=101)](https://github.com/ellerbrock/typescript-badges/)

Converts a given input string to its Ogham equivalent. If you're interested in
learning more about Ogham check out the
[Wikipedia](https://en.wikipedia.org/wiki/Ogham).


As an example, the string `hello` will become `᚛ᚆᚓᚂᚂᚑ᚜` if converted to Ogham.
Typically Ogham is read from bottom to top so our hello example above would be
rotated 90 degrees counter clockwise.

*Disclaimer: This module is still in development and results should be checked
against with an Ogham reference such as those on Wikipedia and other
websites*

## JavaScript Example

```js
const ogham = require('ogham')

console.log(ogham.convert('ireland'))

// prints "᚛ᚔᚏᚓᚂᚐᚅᚇ᚜"
```

## TypeScript/ES6 Example

```ts
import * as ogham from 'ogham'

console.log(ogham.convert('ireland'))

// prints "᚛ᚔᚏᚓᚂᚐᚅᚇ᚜"
```

## API

### convert(input: string, options: OghamOptions)

Converts the given input string to its ogham representation. Supported keys in
the options Object are:

* `addBoundary: Boolean` - Determines if the begging `᚛` and ending `᚜`
characters should be added.
* `useForfeda: Boolean` - This enables use of the
[Forfeda](https://en.wikipedia.org/wiki/Forfeda) characters. For example,
instead of `ea` being printed as `ᚓᚐ` it will be printed as `ᚕ`.

Here's an example: 

```js
const convertedText = ogham.convert('ireland', {
  addBoundary: false
})

console.log(convertedText)

// prints "ᚔᚏᚓᚂᚐᚅᚇ"
```

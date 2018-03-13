# Ogham

Converts a given input string to its Ogham equivalent. If you're interested in
learning more about Ogham check out the
[Wikipedia](https://en.wikipedia.org/wiki/Ogham).


As an example, the string `hello` will become `᚛ᚆᚓᚂᚂᚑ᚜` if converted to Ogham.

## JavaScript Example

```js
const ogham = require('ogham')

console.log(ogham.convert('hello'))

// prints "᚛ᚆᚓᚂᚂᚑ᚜"
```

## TypeScript/ES6 Example

```ts
import * as ogham from 'ogham'

console.log(ogham.convert('hello'))

// prints "᚛ᚆᚓᚂᚂᚑ᚜"
```

## API

### convert(input: string, options: OghamOptions)

Converts the given input string to its ogham representation. Supported options
are:

* `addBoundary` - Determines if the begging `᚛` and ending `᚜` characters
should be added.
* `useForfeda` - This enables use of the
[Forfeda](https://en.wikipedia.org/wiki/Forfeda) characters. For example,
instead of `ea` being printed as `ᚓᚐ` it will be printed as `ᚕ`.

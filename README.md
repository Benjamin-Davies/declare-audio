# declare-audio

A declarative API for sound in the browser

## Library Design

Everything in this library must first have its structure defined. These structure objects *vaguely* follow the builder pattern. They are implemented as classes, but each has a simple function to generate them as this is less 'noisy'.

In the case of node structures, the objects have a builder method, that given an AudioContext, will return a DeclareNode, which is basicaly a wrapper for a AudioNode. This is not essential to know in order to use the library, but it is useful to have a basic understanding of how it works.

## Code style

Code style is enforced by TSLint. `// tslint:disable-next-line` comments are allowed, but they must use a single line comment, (one with the double forward slash) be as specific as possible, and have a justified reason (for instance an empty callback).

```javascript
// This function can be empty because we don't need to unbind anything
// tslint:disable-next-line:no-empty
return () => {};
```

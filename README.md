# declare-audio

A declarative API for sound in the browser

## Roadmap

This project is currently in alpha. At the moment it is just an on-going experiment for me. **Expect breaking changes!** If someone expresses interest in using this library in a product, then I will consider releasing it. Keep in mind that you can just fork the repo and probably end up with something much better than me.

## Library Design

Everything in this library must first have its structure defined. These structure objects *vaguely* follow the builder pattern. They are implemented as classes, but each has a simple function to generate them as this is less 'noisy'.

In the case of node structures, the objects have a builder method, that given an AudioContext, will return a DeclareNode, which is basicaly a wrapper for a AudioNode. This is not essential to know in order to use the library, but it is useful to have a basic understanding of how it works.

## Code style

Code style is enforced by TSLint.

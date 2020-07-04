# React Capsule 💊 [![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?text=You%20might%20not%20need%20the%20React%20Context%20API%20for%20your%20global%20state!&url=https://github.com/CharlesStover/react-capsule&via=CharlesStover&hashtags=react,reactjs,javascript,typescript,webdev,webdevelopment) [![version](https://img.shields.io/npm/v/react-capsule.svg)](https://www.npmjs.com/package/react-capsule) [![minzipped size](https://img.shields.io/bundlephobia/minzip/react-capsule.svg)](https://www.npmjs.com/package/react-capsule) [![downloads](https://img.shields.io/npm/dt/react-capsule.svg)](https://www.npmjs.com/package/react-capsule) [![build](https://api.travis-ci.com/CharlesStover/react-capsule.svg)](https://travis-ci.com/CharlesStover/react-capsule/)

React Capsule 💊 is a way to share your global React state between components
without managing yet another React Context.

React Capsule is **simple**, **light-weight**, **easy to use**, and
**easy to understand**.

```javascript
// Create a capsule by giving it an initial value.
import Capsule from 'react-capsule';
export default new Capsule('my value');
```

```jsx
// Manage a capsule with its useState method.
import myCapsule from '...';

export default function MyComponent() {
  const [value, setValue] = myCapsule.useState(); // 💊

  // Change my capsule's value on click.
  const handleClick = React.useCallback(() => {
    setValue('your value');
  }, [setValue]);

  return <button onClick={handleClick}>{value}</button>; // my value
}
```

## Install

React Capsule 💊 is available as `react-capsule` on NPM.

```
npm install react-capsule
```

```
yarn add react-capsule
```

## API

Each capsule has a few useful methods for extending functionality or fine-tuning
unit tests.

### `reset`

`capsule.reset()` will reset a capsule back to its initial value. This is useful
when allowing customers to reset forms, allowing customers to reset cached API
results, and to run as a `beforeEach` in your Jest unit tests.

### `setState`

`capsule.setState(newValue)` allows you to update the capsule's value. This is
useful when you want to write utility functions outside a React component's
render lifecycle.

### `state`

`capsule.state` contains the capsule's current value.

### `subscribe`

`capsule.subscribe(callback)` will execute the provided callback function
whenever the state changes. This method returns a function that will unsubscribe
the specified callback function.

### `unsubscribe`

`capsule.unsubscribe(callback)` will unsubscribe the specified callback function
from future state changes.

## Sponsor 💗

If you are a fan of this project, you may
[become a sponsor](https://github.com/sponsors/CharlesStover)
via GitHub's Sponsors Program.

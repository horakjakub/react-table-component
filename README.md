# React-table-component 

Simple project, which is actually a modifiable Table component.

## Install

```sh
npm i
```

## Usage

```sh
npm start
```

## Demo 

Current version of project, is available on:
https://react-table-component.herokuapp.com

##### Webpack Monitor

There is also Webpack Monitor for project available. 
To run it, some changes in `webpack.config.js` are required:

```js
new WebpackMonitor({
    capture: true,
    target: './monitor/myStatsStore.json',
    launch: true, // <-- this value has to be set on true 
    port: 3030,
})
```

## Browser support

CSV export for Safari is not supported.
Tested only on Chrome, but should work on all modern browsers.

## Test

For local automated tests, run `npm run test`.

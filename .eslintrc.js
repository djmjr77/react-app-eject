// add any global SpotConsole provided classes here so ESLint does not cause a build failure
// this also allows us to not have to prepend the classes with "window" in the react component code
module.exports = {
  extends: [
    'react-app', // Includes core CRA rules, React, JSX, Flow/TS support
    'react-app/jest' // Includes Jest-specific rules
  ],
  globals: { // globals should all be marked with "readonly" unless we need to modify them
    socket: "readonly",
    spotConsoleLog: "readonly",
    EvtManager: "readonly"
  },
};
# Testing

- Partial migrate to `react-test-library` + `Jest`
  - React Components
  - Redux: `https://redux.js.org/recipes/writing-tests`
- Babel configuration added: [config](https://stackoverflow.com/a/59823659)

## React-Test-Library

- See `Test.test.js`
- run `npx jest --watch`
- This must be added to the file:

```
/**
 * @jest-environment jsdom
 */
```

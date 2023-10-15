# DEV

```
$ cd portable-react
$ yarn
$ yarn start        (dev)

$ cd example
$ yarn
$ yarn dev          (example uses yarn link in package.json to import components)
```

### Publish

- update version in package.json
- run `$ npm run build` then `$ npm publish`

### History

- 09/21/23: upgraded & fixed many bugs;
  - backend works: yarn build, yarn start; example works: yarn dev
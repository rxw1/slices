### Work in progress. Not usable for work, just for play.

Install dependencies first.

```shell
npm install
```

Then make sure you have RethinkDB set up and running. Put some slices into `bin/import/slices`, startup the import server and trigger it:

```shell
npm install
node bin/import
curl localhost:3005
```

After the import is done, just kill the import server and start the actual app:

```shell
npm run dev
```

If things went well, this thing should be running at `localhost:3000/slices`.

### How to play

1. Click the `sample` button. Three random slices will be fetched and displayed.
2. Click on some code fragment. All its referenced slices will be fetched and displayed.
3. Click the `slices` button to go back. The browser's back button should work as well.
4. Repeat.

### Used stuff

* Redux + Redux Devtools
* React + React Router
* RethinkDB + Elasticsearch
* Koa
* Material Design Lite
* ES7 w/ Babel
* Webpack
* Universal/Server side rendering

### Thank you

This project is somehow based on [khtdr's Isomorphic port of the redux counter app](https://github.com/khtdr/redux-react-koa-isomorphic-counter-example) and the [official Redux examples](https://github.com/rackt/redux/tree/master/examples).

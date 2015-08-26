### Work in progress. Not usable for work, just for play.
---
Install dependencies first.

```shell
npm install
```

Then make sure you have RethinkDB set up and running. There's a script to setup the DB:

```shell
bin/setup
```

Start up the server:

```shell
npm run dev
```

To insert slices into the database, post them to `/api/slices`:

```shell
for slice in slices/*; do
  curl -s -XPOST -H "Content-Type: application/json" -d "$(cat $slice)" localhost:3000/api/slices
done
```

If things went well, the client should be reachable at `localhost:3000/slices`. You can query the API on e.g. `localhost:3000/api/slices`. See [src/server/routes/slices.js](https://github.com/rwilhelm/slices/blob/master/src/server/routes/slices.js) for some of the available routes.

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

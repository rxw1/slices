### Work in progress. Not usable for work, just for play.
---
Install dependencies first.

```shell
npm install
```

Make sure RethinkDB is set up and running. There's a script to setup our database and tables:

```shell
bin/setup
```

Start up the server:

```shell
npm run dev
```

```shell
mkdir public && cp -r node_modules/highlight.js/styles public
```

To insert slices into the database, post them to `/api/slices`:

```shell
for slice in slices/*; do
  curl -s -XPOST -H "Content-Type: application/json" -d "$(cat $slice)" localhost:3000/api/slices
done
```

If things went well, the client should be reachable at `localhost:3000/slices`. You can query the API on e.g. `localhost:3000/api/slices`. See [src/server/routes/slices.js](https://github.com/rwilhelm/slices/blob/master/src/server/routes/slices.js) for some of the available routes.

---

#### Zsh love

```shell
export PORT=3000
pick () {	jq ".[].$1" }
xget () {	curl -s -XGET localhost:$PORT/$1 }
```

Query Elasticsearch and get sliceIDs only
```shell
xget api/slices/search/int\?size=50 | jq '.hits.hits[]._source.sliceID'
```

Pretty reference counts
```shell
(repeat 42 (a=$(xget api/slices/$(xget api/slices/sample/1 | pick sliceID)/refs | pick sliceID | wc -l); echo -n $a\ ; repeat $a printf .) && echo) | lolcat -F 0.5
```

Count duplicate slices on each fetch
```shell
repeat 42 xget api/slices/sample/1 | pick "uses[].reference.otherSlice" | grep -v null | uniq -d | wc -l
```

Insert a directory of slices into the database
```shell
slices=($(ls -1 slices))
for i in slices/*; do xpost api/slices -H "Content-Type: application/json" -d "$(cat $i)"; echo; done
```
---

* Redux + Redux Devtools
* React + React Router
* RethinkDB + Elasticsearch
* Koa
* Material Design Lite
* ES7 w/ Babel
* Webpack
* Universal/Server side rendering

This project is somehow based on [khtdr's Isomorphic port of the redux counter app](https://github.com/khtdr/redux-react-koa-isomorphic-counter-example) and the [official Redux examples](https://github.com/rackt/redux/tree/master/examples).

### Work in progress. Not usable for work, just for play.


![screen shot 2015-09-01 at 04 50 40](https://cloud.githubusercontent.com/assets/154026/9595130/30246fd6-5065-11e5-8903-cb3236957ac6.png)

##### Requirements

- RethinkDB 2.1.2
- ElasticSearch 1.7.1

##### Setup
Make sure RethinkDB and ElasticSearch are correctly set up and running.

```shell
npm install
npm run dev
curl localhost:3000/setup/db
curl localhost:3000/setup/es
```

##### Insert slices into the database

You can add slices to the database by sending a POST request to `api/slices`, e.g.

```shell
curl -XPOST localhost:3000/api/slices -H "Content-Type: application/json" -d "$(cat ./slice)"`.
```
or
```shell
find slices -type f | while read -r slice; do
  xpost api/slices -H "Content-Type: application/json" -d "$(cat $slice)"
done
```

##### Copy some stylesheets around (sorry!)

```shell
mkdir public && cp -r node_modules/highlight.js/styles public
```

If things went well, the client should be reachable at `localhost:3000/slices`. You can query the API on e.g. `localhost:3000/api/slices`. See [src/server/routes/slices.js](https://github.com/rwilhelm/slices/blob/master/src/server/routes/slices.js) for some of the available routes.

* GET `api/slices/sample` get three random slices
* GET `api/slices/sample/42`
* GET `api/slices/1719479834788995000` get a slice and all its dependencies
* GET `api/slices/1719479834788995000/refs` get references only

* GET `api/slices/search/hexquad` query elasticsearch to return slices with matching fragments

* POST `api/slices/1719479834788995000/upvote`
* POST `api/slices/1719479834788995000/downvote`
* POST `api/slices/1719479834788995000/like`

* GET `api/slices/liked` get all liked slices
* GET `api/slices/withReferences` get all slices w/ references
* GET `api/slices/withoutReferences` get all slices w/o references
* GET `api/slices/withInstances` get all liked w/ instances

---

#### Zsh love

```shell
export PORT=3000
pick () { jq ".[].$1" }
xget () { curl -s -XGET localhost:$PORT/$1 }
```

Query Elasticsearch and get sliceIDs only
```shell
xget api/slices/search/int\?size=50 | jq '.hits.hits[]._source.sliceID'
```

Pretty reference counts
```shell
(repeat 42 (
  a=$(xget api/slices/$(xget api/slices/sample/1 | pick sliceID)/refs | pick sliceID | wc -l)
  echo -n "$a "
  repeat $a printf .
) && echo) | lolcat -F 0.5
```

Count duplicate slices on each fetch
```shell
repeat 42 xget api/slices/sample/1 | pick "uses[].reference.otherSlice" |\
  grep -v null | uniq -d | wc -l
```

Insert a directory of slices into the database
```shell
slices=($(ls -1 slices))
for i in slices/*; do
  xpost api/slices -H "Content-Type: application/json" -d "$(cat $i)"
  echo
done
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

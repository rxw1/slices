### Work in progress. Not usable for work, just for play.

First make sure you have RethinkDB set up and you've got some slices in `bin/import/slices`.

```shell
npm install
node bin/import
curl localhost:3005
```
After the import is done, just kill the import server and start the actual app:

```shell
npm run dev
```
If things went well, the app should be running at `localhost:3000/slices`.

### props to stuff

* Redux + Redux Devtools
* React + React Router
* RethinkDB + Elasticsearch
* Koa
* Material Design Lite
* ES7

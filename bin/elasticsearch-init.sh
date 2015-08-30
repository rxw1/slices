#!/usr/local/bin/zsh

curl -XPUT localhost:9200/_river/rethinkdb/_meta -d '
{
  "type": "rethinkdb",
  "rethinkdb": {
    "host": "localhost",
    "port": 28015,
    "databases": {
      "slices": {
        "slices": {
          "backfill": true
        }
      }
    }
  }
}'

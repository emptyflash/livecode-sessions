#!/bin/bash

trap 'kill $(jobs -p)' EXIT
python -m SimpleHTTPServer 8080 &
websocketd --port 9000 ./watchcat.sh

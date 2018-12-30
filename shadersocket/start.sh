#!/bin/bash

trap 'kill $(jobs -p)' EXIT
python -m SimpleHTTPServer 8080 &
source="${BASH_SOURCE[0]}"
websocketd --port 9000 $(dirname $source)/watchcat.sh

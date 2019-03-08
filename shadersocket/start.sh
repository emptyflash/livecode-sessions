#!/bin/bash

trap 'kill $(jobs -p)' EXIT
script_dir=$(dirname "${BASH_SOURCE[0]}")
ln -s $(pwd)/shader.frag $script_dir/shader.frag
cd $script_dir && python -m SimpleHTTPServer 8080 &
websocketd --port 9000 $script_dir/watchcat.sh

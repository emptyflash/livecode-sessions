#!/bin/bash

trap 'kill $(jobs -p)' EXIT
script_dir=$(dirname "${BASH_SOURCE[0]}")
shader_dir=$(pwd)
cd $script_dir
docker run --name shadersocket-nginx --rm -v $(pwd):/usr/share/nginx/html:ro -p 8080:80 -i nginx &
cd $shader_dir
websocketd --port 9000 $script_dir/watchcat.sh

#!/bin/bash

trap 'kill $(jobs -p)' EXIT
script_dir=$(dirname "${BASH_SOURCE[0]}")
shader_dir=$(pwd)
ln -s $shader_dir/shader.frag $script_dir/shader.frag
cd $script_dir
python -m SimpleHTTPServer 8080 &
cd $shader_dir
websocketd --port 9000 $script_dir/watchcat.sh

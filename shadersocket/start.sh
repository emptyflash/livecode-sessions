#!/bin/bash

export SHADER_FOLDER=$(pwd)
cd $(dirname "${BASH_SOURCE[0]}")
services="watchcat"
if [ -f ~/.ngrok2/ngrok.yml ]; then
    export NGROK_AUTHTOKEN=$(docker run -v ~/.ngrok2:/workdir mikefarah/yq yq read ngrok.yml authtoken)
    services="$services caddy ngrok"
else
    services="$services nginx"
fi
docker-compose up --build $services

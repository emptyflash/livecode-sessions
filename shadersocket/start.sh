#!/bin/bash

export SHADER_FOLDER=$(pwd)
cd $(dirname "${BASH_SOURCE[0]}")
services="nginx watchcat"
if [ -f ~/.ngrok2/ngrok.yml ]; then
    export NGROK_AUTHTOKEN=$(docker run -v ~/.ngrok2:/workdir mikefarah/yq yq read ngrok.yml authtoken)
    services="$services ngrok"
fi
docker-compose up --build $services

#!/bin/bash

export SHADER_FOLDER=$(pwd)
cd $(dirname "${BASH_SOURCE[0]}")
services="nginx watchcat"
if [ -f ~/.ngrok2/ngrok.yml ]; then
    export NGROK_AUTHTOKEN=$(docker run -v ~/.ngrok2:/workdir mikefarah/yq:2 yq read ngrok.yml authtoken)
    services="$services ngrok"
fi
docker-compose up --build -d $services
docker-compose logs -f watchcat

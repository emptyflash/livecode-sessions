#!/bin/bash

cat shader.frag
echo "---"
while ! $(inotifywait -eMODIFY shader.frag 2>/dev/null); do
    cat shader.frag
    echo "---"
done

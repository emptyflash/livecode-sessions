#!/bin/bash

shopt -s extglob

echo '[' > manifest.json

for d in */ ; do
    echo "Running build for $d"

    # Skip non-session folders
    [[ $(basename $d) =~ ^(build|render|yinlang|shadersocket)$ ]] && continue

    if [[ -f "$d/shader.yin" ]]; then
        echo "Compiling $d yin shader"
        pushd build/
        cat "../$d/shader.yin" | ./yin -l "../$d/std.yin" > "../$d/shader.frag"
        popd
    fi

    if [[ ! -f "$d/index.html" ]]; then
        echo "Copying index to $d"
        cp ./shadersocket/index.html "$d/index.html"
        cp ./shadersocket/puppy.jpg "$d/puppy.jpg"
        cp ./shadersocket/std.frag "$d/std.frag"
    fi

    echo "\"$d\"," >> manifest.json
done

LAST_FILE=""
for f in *.js; do

    if [ ! -z $LAST_FILE ]; then
        echo "\"$LAST_FILE\"," >> manifest.json
    fi
    LAST_FILE=$f
done
if [ ! -z $LAST_FILE ]; then
    echo "\"$LAST_FILE\"" >> manifest.json
fi

echo ']' >> manifest.json

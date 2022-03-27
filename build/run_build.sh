#!/bin/bash

shopt -s extglob

for d in */ ; do
    echo "Running build for $d"

    # Skip the build folder
    [[ $(basename $d) =~ ^(build)$ ]] && continue

    if [[ -f "$d/shader.yin" ]]; then
        echo "Compiling $d yin shader"
        pushd build/
        cat "../$d/shader.yin" | yin > "../$d/shader.frag"
        popd
    fi

    if [[ ! -f "$d/index.html" ]]; then
        echo "Copying index to $d"
        cp ./shadersocket/index.html "$d/index.html"
    fi
done

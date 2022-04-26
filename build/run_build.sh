#!/bin/bash

shopt -s extglob

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
done

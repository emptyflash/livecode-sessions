#!/bin/bash

trap 'kill $(jobs -p)' EXIT

for d in */ ; do
    # Skip non-session folders
    [[ $(basename $d) =~ ^(build|render|yinlang|shadersocket)$ ]] && continue
    path="/media/cameron/Second Drive/Videos/$(basename $d)"
    video_file="$path/$(basename $d).mp4"

    # Skip if already rendered
    [[ -f $video_file ]] && continue

    # Skip if no shader file
    [[ -f $d/shader.frag ]] && continue

    echo "Starting python websever in $d"
    pushd $d
    ls
    python3 -m http.server &
    popd

    echo "Beginning chromium render"
    mkdir -p "$path"
    node render/index.js "$path"

    echo "Compiling render screenshots to video"
    ffmpeg -y -framerate 30 -i "$path/frame%d.png" -b:v 35M -pix_fmt yuv420p "$video_file" 

    kill $(jobs -p)
done

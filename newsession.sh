#!/bin/bash
counter=2
date=$(date +%Y%m%d)
dir="$date"-livecode

while [[ -e $dir ]]; do
    dir="$date"_"$counter"-livecode
    ((++counter))
done

mkdir $dir
touch $dir/shader.yin
cp ./build/std.yin $dir/std.yin
echo $dir

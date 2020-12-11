#!/bin/bash

cat_yin() {
    cat shader.yin | yin
}

if [ -f shader/shader.yin ]; then
    cp yinlang/std.yin .
    FILE="shader.yin"
    COMMAND=cat_yin
else
    FILE="shader.frag"
    COMMAND="cat shader.frag"
fi
cd shader
$COMMAND
echo "---"
while ! $(inotifywait -eMODIFY $FILE 2>/dev/null); do
    $COMMAND
    echo "---"
done

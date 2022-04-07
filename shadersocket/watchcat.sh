#!/bin/bash

cat_yin() {
    cat shader/shader.yin | yin -l ./std.yin
}

if [ -f shader/shader.yin ]; then
    FILE="shader/shader.yin"
    COMMAND=cat_yin
else
    FILE="shader/shader.frag"
    COMMAND="cat shader/shader.frag"
fi
$COMMAND
echo "---"
while ! $(inotifywait -eMODIFY $FILE 2>/dev/null); do
    $COMMAND
    echo "---"
done

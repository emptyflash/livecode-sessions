#!/bin/bash

cd yinlang
stack install
cd ..

exec websocketd --port 9000 ./watchcat.sh

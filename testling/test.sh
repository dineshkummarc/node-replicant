#!/bin/bash

read -p 'testling email: ' user
stty -echo
read -p 'testling password: ' pass
stty echo

echo

for file in join.js clone.js; do
    echo; echo "*** running $file"
    
    tar -cf- "testling/$file" index.js \
        node_modules/patcher/index.js \
        | curl -sSNT- -u "$user:$pass" \
            "http://localhost:8080/?main=testling/$file"
done

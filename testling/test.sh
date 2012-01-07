#!/bin/bash

echo -n 'testling user: '
read user

tar -cf- testling/join.js index.js \
    node_modules/patcher/index.js \
    | curl -sSNT- -u $user \
        'http://testling.com/?main=testling/join.js'

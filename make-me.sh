#!/bin/bash

# install node and bower modules

(cd lliurex-help && npm install)
(cd lliurex-help && bower-installer)

gbp buildpackage -S -us -uc --git-ignore-new

if [ $? -eq 0 ]; then
    echo "Build successful.";
fi

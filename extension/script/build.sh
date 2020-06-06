#!/bin/bash

build_extension() {
    echo 'building extension'

    rm -rf dist/*

    export INLINE_RUNTIME_CHUNK=false
    export GENERATE_SOURCEMAP=false

    react-scripts build

    mkdir -p dist
    cp -r build/* dist
    cp src/background/background.js dist
    cp src/content/content.js dist

    mv dist/index.html dist/popup.html
}

build_others() {
    echo 'building others'

    cp src/background/background.js dist
}

if [ $# -eq 0 ]; then
    echo 'build extension|others'
fi

case $1 in
'extension')
    build_extension
    ;;
'others')
    build_others
    ;;
esac

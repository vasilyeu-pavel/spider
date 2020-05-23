#!/bin/bash

build_extension() {
    echo 'building extension'

    rm -rf dist/*

    export INLINE_RUNTIME_CHUNK=false
    export GENERATE_SOURCEMAP=false

    react-scripts build

    mkdir -p dist
    cp -r build/* dist

    mv dist/index.html dist/popup.html
}

build_others() {
    echo 'building others'

    # enable webpack(need a webpack.config.js) if you
    # want background.js to be minified

#    webpack

    # background.js and content_script.js should be copied
    # to dist if no webpack enabled
    cp src/background/background.js dist
    # cp src/content/content_script.js dist

    cp src/background/background.html dist
#    cp src/background/firebase*.js dist
#    cp src/background/api.js dist
    mv dist/index.html dist/popup.html
    cp dist/popup.html dist/options.html
    cp public/manifest.json dist/manifest.json

    cp -r public/images dist
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

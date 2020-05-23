const chokidar = require('chokidar');
const debounce = require('lodash.debounce');
const shell = require('shelljs');

const { SCRIPT } = process.env;
const DEBOUNCE_TIME = 3000;
const PATH = '.';

console.log(`Start watch mode for react-${SCRIPT}-app`);

const watchCb = () => {
    console.log(`Rebuild react-${SCRIPT}-app`);

    shell.exec(`./script/build.sh ${SCRIPT}`);
};

const watcher = chokidar.watch(`${PATH}/src`, { ignoreInitial: true });

watcher.on('all',
    debounce(watchCb, DEBOUNCE_TIME)
);

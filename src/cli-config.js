#!/usr/bin/env node
const config = require('./config');

function showHelp() {
    console.log('help:');
    console.log('bad-config set <defaultDownloadDir>');
    console.log('bad-config unset: unset default download dir');
    console.log('bad-config show: show default download dir');
    console.log('bad-config help: show help');
}

function showDownloadDir() {
    console.log(config.getDownloadDir())
}

let actions = ['set', 'unset', 'show', 'help'];
let action = process.argv[2];

if (!actions.includes(action)) {
    console.error('Wrong action! Please follow instructions below:');
    showHelp();
    return;
}

if (action === 'set') {
    let dir = process.argv[3];
    if (dir) {
        let lastLetter = dir[dir.length - 1];
        if (lastLetter !== '/') {
            dir = dir + '/';
        }
        config.setDownloadDir(dir);
        showDownloadDir();
    } else {

    }
} else if (action === 'unset') {
    config.unsetDownloadDir();
    showDownloadDir();
} else if (action === 'show') {
    showDownloadDir();
}





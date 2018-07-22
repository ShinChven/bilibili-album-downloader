#!/usr/bin/env node
const bad = require('./index');

let url = process.argv[2];

if (url) {
    bad.downloadAlbum(url)
        .then(() => {
            console.log('all done.');
        })
        .catch(err => console.error(err));
}else{
    throw new Error('[bilibili-album-downloader]please use with url like: bad https://h.bilibili.com/5564016');
}


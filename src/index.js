const http = require('superagent');
const Promise = require('bluebird');
const dn = require('download');
const fs = require('fs-extra');
const path = require('path');

/**
 * get album data from api
 * @param url album url
 * @returns {*} Promise.resolve(data)
 */
let get = (url) => {
    // verify url
    if (!url) {
        return Promise.reject(new Error('url undefined'));
    }
    console.log(url);
    let reg = /http(s|):\/\/h.bilibili.com\/((([a-zA-z]{1,50})\/h5\/)|)([0-9]{5,20})/;
    let match = url.match(reg);
    if (match) {
        // request api for album data
        let id = match[match.length - 1];
        if (id) {
            let api = 'https://api.vc.bilibili.com/link_draw/v1/doc/detail?doc_id=' + id;
            return http.get(api).then(resp => {
                try {
                    let response = JSON.parse(resp.text);
                    let data = response.data;
                    if (data) {
                        return Promise.resolve(data);
                    } else {
                        return Promise.reject(new Error('no album data'));
                    }
                } catch (e) {
                    return Promise.reject(e);
                }
            });
        } else {
            return Promise.reject(new Error('error finding album id.'))
        }
    } else {
        return Promise.reject(new Error('not matching url pattern:'));
    }

};

let getDefaultDir = () => {
    return path.join(__dirname, '../downloads/');
};

let download = (albumData, outputDir = getDefaultDir()) => {
    if (albumData.item) {
        // make output path
        let doc_id = albumData.item.doc_id;
        let albumDir = outputDir + doc_id + '/';

        // ensure dir and write data
        return fs.outputFile(albumDir + '.data.json', JSON.stringify(albumData, 0, 3))
            .then(() => {
                // run download tasks
                downloadTasks = [];
                albumData.item.pictures.map(picture => {
                    let img_src = picture.img_src;
                    downloadTasks.push(dn(img_src, albumDir).then(() => {
                        console.log('downloaded: ' + img_src);
                    }));
                });
                return Promise.all(downloadTasks);
            });
    } else {
        return Promise.reject(new Error('found no album data'));
    }
};

let downloadAlbum = (url) => {
    return get(url)
        .then(data => {
            return download(data);
        });
};

module.exports = {get, download, downloadAlbum};
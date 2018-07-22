const bd = require('../src');

let url = "https://h.bilibili.com/5564016";
// let url = "http://h.bilibili.com/ywh/h5/5564016";

bd.downloadAlbum(url)
    .then(() => {
        console.log('all done.');
    })
    .catch(err => console.error(err));
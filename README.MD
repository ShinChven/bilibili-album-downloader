# BiliBili 相簿下载器

我喜欢也小姐姐们的照片。

## 用法

```javascript
const bd = require('../src');

let url = "https://h.bilibili.com/5564016";
// let url = "http://h.bilibili.com/ywh/h5/5564016";

bd.downloadAlbum(url)
    .then(() => {
        console.log('all done.');
    })
    .catch(err => console.error(err));
```
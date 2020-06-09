const fs = require('fs');

const logPaths = ['httping.https=on.json', 'httping.https=off.json', 'httping.protection=off.json'];

function readFile(path) {
    return fs.readFileSync(path, 'utf8');
}
function writeFileArray(path, array, handler, option = null) {
    const wstream = fs.createWriteStream(path, option);
    for(element of array) {
        wstream.write(handler(element));
    }
    return wstream.end();
}

for(const path of logPaths) {
    const json = readFile(path);
    const obj = JSON.parse(json);

    writeFileArray(path + '.tsv.txt', obj, (elm) => {
        const v = [elm.status, elm.seq, elm.http_code, elm.resolve_ms, elm.connect_ms, elm.request_ms, elm.ssl_ms, elm.write, elm.close, elm.total_ms];
        return v.join('\t') + '\n';
    }, 'utf8');
}

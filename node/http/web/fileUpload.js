const fs = require('fs'),
    path = new Map();

function testFileUpload(request, response) {
    console.log('====');
    request.on('data', (data) => {
        console.log(data.toString());
        const fis = fs.createWriteStream('./file/1.png');
        fis.write(data);
        fis.end();
        response.end();
    });

}

path.set('/testFileUpload', testFileUpload);
module.exports.path = path;

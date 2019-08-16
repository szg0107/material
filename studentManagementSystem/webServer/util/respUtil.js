function writeResult(msg, data, status = 'success') {
    return JSON.stringify({status: status, msg: msg, data: data});
}

function returnResult(response, res, msg='查询成功') {
    //返回头
    response.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
    //响应内容
    response.write(writeResult(msg, res));
    //关闭响应
    response.end();
}

module.exports = {writeResult, returnResult};

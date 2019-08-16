function getNow() {
    return parseInt(Date.now() / 1000);
}

function formatTime(timestamp){
    const date = new Date(timestamp * 1000);
    return `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1}-${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}`;
}
module.exports ={getNow,formatTime};

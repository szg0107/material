/**渲染页面*/
game.init = () => {
    console.log(gameWidth, gameHeight);
    console.log(td, tr);
    //存储所有创建小方块的信息，用于和蛇进行对比，决定蛇的下一步动作
    game.squareTable = [];
    //创建地板里的小方块 外循环走行，对应y坐标；内循环走列对应x坐标
    for (let y = 0; y < tr; y++) {
        //每一行的length为td的长度
        game.squareTable[y] = new Array(td);
        for (let x = 0; x < td; x++) {
            let newSquare = {};
            //第一列的索引(x=0),最后一列的索引(x=td-1)
            if (x === 0 || x === td - 1 || y === 0 || y === tr - 1) {
                newSquare = SquareFactory.create('Wall', x, y);
            } else {
                newSquare = SquareFactory.create('Floor', x, y);
            }
            //将小方块添加到场景中
            /*game.appendChild(newSquare.viewContent);
            //把每一个小方块存到数组中 y在前面，x在后面，取得时候也一样
            game.squareTable[y][x] = newSquare.viewContent;*/
            game.append(newSquare);
        }
    }
};
//删除游戏场景里的小方块
game.remove = (x, y) => {
    //取到要删除的小方块
    const curSquare = game.squareTable[y][x];
    //删除页面中的小方块
    game.removeChild(curSquare.viewContent);
    //删除存储数组中的小方块
    game.squareTable[y][x] = null;
};
//添加游戏场景里的小方块
game.append = (square) => {
    //添加到页面中
    game.appendChild(square.viewContent);
    //添加到储存数组中
    game.squareTable[square.y][square.x] = square;
};
// game.init();

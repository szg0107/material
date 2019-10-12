/**批量生成小方块*/
// 1.创建管理者
function SquareFactory() {
}

//2.包装创建方块方法 border:1px solid #029ae5
SquareFactory.prototype.init = function (square, action) {

    square.className ? square.viewContent.className = square.className : '';
    square.viewContent.style.cssText = `position:absolute;
                            left:${square.x * squareWidth}px;
                            top:${square.y * squareHeight}px;
                            width:${square.width}px;
                            height:${square.height}px;`;
    //返回方块类型
    square.collide = () => action;
};
//地板生产线
SquareFactory.prototype.Floor = function (x, y) {
    const floor = new Floor(x, y, squareWidth, squareHeight, '');
    this.init(floor,squareTag.move);
    return floor;
};
//墙生产线
SquareFactory.prototype.Wall = function (x, y) {
    const wall = new Wall(x, y, squareWidth, squareHeight, '');
    this.init(wall,squareTag.die);
    return wall;
};
//蛇头生产线
SquareFactory.prototype.SnakeHead = function (x, y) {
    //创建蛇头
    const snakeHead = new SnakeHead(x, y, squareWidth, squareHeight, 'snakeHead');
    //初始化蛇头 第二个参数方块类型，在生产时需要指定，碰撞后知道方块类型
    this.init(snakeHead,squareTag.die);
    //由于它是一个单例对象，所以在构建的时候就需要把位置信息更新成正确的
    snakeHead.upDate(x, y);
    return snakeHead;
};
//蛇身生产线
SquareFactory.prototype.SnakeBody = function (x, y) {
    const snakeBody = new SnakeBody(x, y, squareWidth, squareHeight, 'snakeBody');
    this.init(snakeBody,squareTag.die);
    return snakeBody;
};
//食物生产线
SquareFactory.prototype.Food = function (x, y) {
    const food = new Food(x, y, squareWidth, squareHeight, 'food');
    this.init(food,squareTag.eat);
    food.upDate(x, y);
    return food;
};

//3.提供对外接口
SquareFactory.create = (type, x, y) => {
    //用户传进来的生产线类型是否存在
    if (typeof SquareFactory.prototype[type] !== 'undefined') {
        //让生产线继承方块工厂，这样通过生产线new的对象就相当于方块工厂new出来的实例
        SquareFactory.prototype[type].prototype = new SquareFactory();
        //调用某条生产线，才能生产出真正的对象
        return new SquareFactory.prototype[type](x, y);
    } else {
        throw `没有${type}生产线，无法生产对象。`
    }
};

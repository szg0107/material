/**方全局性的东西
 * 1.常用变量
 * 2.创建一个方块的构造函数
 * 3.根据方块构造函数创建出的元素（蛇头、蛇身...）
 * */
//游戏区域大小
const game = document.getElementsByClassName('game')[0],//游戏区域

    gameWidth = parseInt(getComputedStyle(game).width),//游戏区宽度
    gameHeight = parseInt(getComputedStyle(game).height),//游戏区高度

    squareWidth = 20,//方块宽
    squareHeight = 20,//方块高

    td = Math.ceil(gameWidth / squareWidth-1),//宽度，列数
    tr = Math.floor(gameHeight / squareHeight),//高度，行数

    intervalTime = 300;//蛇移动的时间间隔

//创建方块构造函数
function Square(x, y, width, height, className, dom = document.createElement('div')) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.className = className;
    //如果用传了DOM就使用，没有就创建
    this.viewContent = dom;
}
//由于单例创建一个对象后，身上的信息就不会改变了；蛇要移动需要更新位置信息，所以调用一个方法更新信息
Square.prototype.upDate=function(x,y){
    this.x=x;
    this.y=y;
    this.viewContent.style.cssText = `left:${x * squareWidth}px;
                                      top:${y * squareHeight}px;
                                      position:absolute;
                                      width:${this.width}px;
                                      height:${this.height}px;`;
};

//创建元素 是实例对象，也是构造函数生成相应的实例
const Floor = tool.extends(Square),//地板里的小方块
    Wall = tool.extends(Square),//墙里的小方块

    SnakeHead=tool.single(Square),//蛇头 单例对象
    SnakeBody=tool.extends(Square),//蛇身体
    Snake=tool.single(),//蛇 将蛇头和身体连起来
    Food=tool.single(Square),//食物

    Game=tool.single();//游戏控制

//方块类型，在生产的时候打上，以及蛇头碰撞时，进行不同的处理
const squareTag={
    //移动
    move:'move',
    //吃
    eat:'eat',
    //死亡
    die:'die'
};



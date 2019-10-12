/*关于蛇本身的一些操作*/
const snake = new Snake();
//处理蛇走的方向
const directionNum = {
    left: {
        x: -1,
        y: 0,
        //蛇头旋转角度
        rotate: 'rotate(180deg)',
    },
    right: {
        x: 1,
        y: 0,
        rotate: 'rotate(0deg)',
    },
    top: {
        x: 0,
        y: -1,
        rotate: 'rotate(270deg)',
    },
    bottom: {
        x: 0,
        y: 1,
        rotate: 'rotate(90deg)',
    }
};
//蛇初始化
snake.init = () => {
    snake.head = null;//蛇头
    snake.tail = null;//蛇尾
    const snakeHead = SquareFactory.create('SnakeHead', 3, 1),
        snakeBody = SquareFactory.create('SnakeBody', 2, 1),
        snakeBody2 = SquareFactory.create('SnakeBody', 1, 1);
    snake.head = snakeHead;
    snake.tail = snakeBody2;

    game.remove(snakeHead.x, snakeHead.y);
    game.append(snakeHead);

    game.remove(snakeBody.x, snakeBody.y);
    game.append(snakeBody);
    game.remove(snakeBody2.x, snakeBody2.y);
    game.append(snakeBody2);

    //形成链表关系
    snakeHead.next = snakeBody;
    snakeHead.last = null;

    snakeBody.next = snakeBody2;
    snakeBody.last = snakeHead;

    snakeBody2.next = null;
    snakeBody2.last = snakeBody;

    //把位置信息储存在蛇身上，默认往右边走
    snake.direction = directionNum.right;
};
//或许碰撞到的方块
snake.getCollideSquare = () => {
    //碰撞方块的位置=蛇头坐标+走的方向坐标
    const square = game.squareTable[snake.head.y + snake.direction.y][snake.head.x + snake.direction.x];
    square.rotate = snake.direction.rotate;
    //根据方块的类型调用对应的方法，并将方块传入
    snake.collideMethod[square.collide()](square);
};
//碰撞后的处理
snake.collideMethod = {
    //方块  是否是吃
    move: (square, isEat) => {
        //创建新身体
        const newBody = SquareFactory.create('SnakeBody', snake.head.x, snake.head.y);
        //更新关系 新方块左右关系以及body左边关系
        newBody.next = snake.head.next;
        //新身体右边什么都没有
        newBody.last = null;
        //newBody.next=body
        newBody.next.last = newBody;
        game.remove(snake.head.x, snake.head.y);
        game.append(newBody);

        //创建新蛇头
        const newHead = SquareFactory.create('SnakeHead', square.x, square.y);
        newHead.viewContent.style.transform = square.rotate;
        //更新关系
        newHead.next = newBody;
        newHead.last = null;
        newBody.last = newHead;
        game.remove(square.x, square.y);
        game.append(newHead);
        snake.head = newHead;


        //如果不吃删除蛇尾，吃就不删除
        if (!isEat) {
            //先创建地板然后删除蛇尾
            const newFloor = SquareFactory.create('Floor', snake.tail.x, snake.tail.y);
            game.remove(snake.tail.x, snake.tail.y);
            game.append(newFloor);
            //更新蛇尾  原来蛇尾右边那个对象
            snake.tail = snake.tail.last;
        }
    },
    eat: (square)=> {
        snake.collideMethod.move(square, true);
        crateFood();
        gameControl.score++;
        scores.innerText=gameControl.score;
    },
    die: () => {
        gameControl.over();
    }
};
// snake.init();

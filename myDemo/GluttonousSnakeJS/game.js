/*游戏逻辑处理*/
const gameControl = new Game();
gameControl.timer = null;
gameControl.score = 0;
//开始按钮
const startBtn = document.getElementsByClassName('startBtn')[0],
    //左侧开始暂停按钮
    playAndPause = document.getElementsByClassName('playAndPause')[0],
    //分数
    scores = document.getElementsByClassName('score')[0],
    //结果弹窗
    myCloser = document.getElementsByClassName('closer')[0],
    //关闭按钮
    closeBtn = document.getElementsByClassName('close')[0],
    //结果分数
    loserScore = document.getElementsByClassName('loserScore')[0];
//是否暂停
let isPause = false,
    //是否开始游戏
    isPlay=false;

//游戏初始化
gameControl.init = () => {
    //渲染背景
    game.init();
    //渲染蛇
    snake.init();
    //创建食物
    crateFood();
    //分数清零
    gameControl.score = 0;
    //绑定键盘事件
    document.onkeydown = (e) => {
        //蛇往下走时不能按上
        if (e.key === 'ArrowUp' && snake.direction !== directionNum.bottom) {
            //往上走，只用修改方向属性就可以
            snake.direction = directionNum.top;

        } else if (e.key === 'ArrowRight' && snake.direction !== directionNum.left) {
            snake.direction = directionNum.right;
        } else if (e.key === 'ArrowDown' && snake.direction !== directionNum.top) {
            snake.direction = directionNum.bottom;
        } else if (e.key === 'ArrowLeft' && snake.direction !== directionNum.right) {
            snake.direction = directionNum.left;
        }
    };

};
//游戏开始
gameControl.start = () => {
    gameControl.timer = setInterval(() => {
        snake.getCollideSquare();
    }, intervalTime);
};
//游戏结束
gameControl.over = () => {
    clearInterval(gameControl.timer);
    myCloser.style.display = 'block';
    loserScore.innerHTML = gameControl.score;
    scores.innerText=0;
    playAndPause.setAttribute('src','../GluttonousSnakeIMG/start.png');
    document.onkeydown=null;
    isPlay=true;
    isPause=true;
};

gameControl.init();

//创建食物
function crateFood() {
    //食物的坐标
    let x = Math.round(Math.random() * (td - 3) + 1),
        y = Math.round(Math.random() * (tr - 3) + 1),
        //停止while循环
        flag = true;
    //去掉墙的范围
    /*while (flag) {
        x = Math.round(Math.random() * (td - 3) + 1);
        y = Math.round(Math.random() * (tr - 3) + 1);
        let ok = true;
        for (let node = snake.head; node; node = node.next) {
            //表示随机的出来的食物在蛇身上
            if (x === node.x && y === node.y) {
                console.log('break');
                ok = false;
                break;
            }
        }
        //如果ok为true表示for循环走完，食物不在蛇身上
        if (ok) {
            flag = false;
        }
    }*/
    for (let node = snake.head; node; node = node.next) {
        //表示随机的出来的食物在蛇身上
        if (x === node.x && y === node.y) {
            x = Math.round(Math.random() * (td - 3) + 1);
            y = Math.round(Math.random() * (tr - 3) + 1);
            node = snake.head;
        }
    }
    //创建食物
    const food = SquareFactory.create('Food', x, y);
    game.remove(food.x, food.y);
    game.append(food);
}

//开始按钮点击事件
startBtn.onclick = () => {
    gameControl.start();
    isPlay=false;
    playAndPause.style.display = 'inline';
    startBtn.style.display = 'none';
};

//关闭结果
closeBtn.onclick=()=>{
    myCloser.style.display = 'none';
};

playAndPause.onclick=()=>{
  if (isPause){
      if(isPlay){
          game.innerHTML='';
          gameControl.init();
      }
      gameControl.start();
      playAndPause.setAttribute('src','../GluttonousSnakeIMG/pause.png');
      isPlay=false;
      isPause=false;
  }else {
      playAndPause.setAttribute('src','../GluttonousSnakeIMG/start.png');
      clearInterval(gameControl.timer);
      document.onkeydown=null;
      isPause=true;
  }
};

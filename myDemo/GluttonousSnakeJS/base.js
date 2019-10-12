/**基础库js
 * 放一些工具、公用的方法
 * */
const tool = {
    //继承 目标对象 源对象
    inherit: (target, origin) => {
        let F = function () {
        };
        F.prototype = origin.prototype;
        target.prototype = new F();
        target.prototype.constructor = target;
    },
//拓展 源对象
    extends: function (origin) {
        let target = function () {
            origin.apply(this, arguments);
        };
        this.inherit(target, origin);
        return target;
    },
//单例模式
    single: function (origin) {
        let singleResult = (function () {
            //实例对象
            let instance;
            return function() {
                if (typeof instance === 'object') {
                    return instance;
                }
                //第一次走这里
                origin && origin.apply(this, arguments);
                instance = this;
            }
        })();
        origin && this.inherit(singleResult, origin);
        return singleResult;
    }
};

/*function Square(x, y, width, height) {
    this.x=x;
    this.y=y;
    this.width=width;
    this.height=height;
}

Square.prototype.collide = () => console.log('123');
let SnakeHead = tool.single(Square);
let s1 = new SnakeHead(10, 10, 100, 100);
let s2= new SnakeHead(20, 20, 200, 200);
s1.collide();
console.log(s1===s2);
console.log(s2);*/

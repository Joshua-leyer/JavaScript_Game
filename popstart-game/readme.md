# popstart-game.html

页面布局是使用flex来实现点击pop, 块块的位移布局.


makeMapArr游戏最开始之前要有一个默认的数组地图,这个函数就是随机给二维数组赋值 0 - 5 数字,6种颜色,

renderHtml()根据二位数字,给dom添加 元素同时设置class,css已经事先写好了,这样页面的不同块块颜色就实现了

** 注意,
自己使用了js生成块块dom元素,是遍历生成的10*10。有个小问题就是遍历的时候 i 和cell的id会不一样,这是由于flex布局是clumn导致的,不过不影响游戏效果,方块选装90度还是方块

template() 函数是生成cell的
renderScore() , renderHtml()是渲染分数部分的,注意这个renderHtml是真个mvc思路的v 每次游戏数据更新都会执行一次这个函数,而这个函数会根据数组渲染出更新后的页面

变量 cellsStorage  是判断第一次点击有几个块可以消失的作用,临时存储的功能,而是否能点击消失,就是判断这个数组的长度是否大于1


整个游戏最核心的地方在这里
```js
    $(".box").on("click", ".add-storage",function(event) {
        //根据 cellsStorage [] 删除 square数组
        removeCells(cellsStorage, square)
        //清空.box下的内容
        $(".box").empty()
        //根据square数组重新渲染
        renderHtml(square)
        //判断游戏是否结束
        judgeGameOver(square)
    })

```
每次点击之间都会触发4个函数


当块块有消失过以后就会有真实dom的现实位置坐标和quar数组存储的位置不对应的情况, getRealCell()根据data存储的x,y来转换成真实的坐标

CellsAddStorage 是点击某个颜色块块的时候就用递归的思路判断周围四个块块颜色,是否能添加进cellsStorage数组中
(使用addStorage函数)



执行完removeCells函数,删除快快后会运行judChildens ()函数,功能是为了防止当某一列cells已经没有了但是数组会独占一个空[]数组,会导致其他问题,所以这里就是每次删除块都要判断一下数组中是否存在这种情况
01.js 尝试用canvas来写所需要的基本函数,最终选在css+html更容易一些


jing-game.html是最终版本

# Code log

css部分没什么可讲的

map_arr 是一个地图二维数组
```js
    let map_arr = []
    for (let i = 0; i < 3; i++) {
        map_arr[i] = []
        for (let j = 0; j < 3; j++) {
            map_arr[i].push(0)
        }
    }

```

注释 game start 是游戏开始的逻辑 , 遍历li元素绑定click 事件,根据点击元素的class来判断添加什么类样式

这个游戏逻辑不是很清晰,以前写的,
每次对前端页面setAttribute设置class属性样式的时候都会在背后对应的squentArr函数对应的位置修改数值。

大体思路就是每次点击都会触发修改sequent_arr二维数组,然后judgeGame()判断一下游戏是否可以结束了,可以运行restGame清除所有类,游戏重新开始。




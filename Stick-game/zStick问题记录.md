---
auther: 'josha'
time_log: 2020年11月11日 22:08:39 -  
---


1.canvas如何居中
    > 给canvas 一个父元素，给父元素设置css   
    #bg {
        margin:0 auto;
        width: 150px;
    }
    > canvas要设置高宽，只能是标签里面设置，css修改会比例不对。所以，父元素width 要一样

2.看看canvas文档，怎么绘画圆圈的
    1) 监听点击某个区域触发事件。 以前没搞过canvas 监听事件。不知道能不能
    2) 点击区域以后随机获取颜色值。更换颜色
    3) 发现有些难。麻蛋，计算点击的位置在那个地方 
    [网上找的文章 ](https://blog.csdn.net/qq_20423863/article/details/90701917)
    ```
    canvas.addEventListener("click",function(e){
            var pos=getEventPosition(e);
            var count=0;
            //思路，4个步骤判断是否点击了扇形区域    
            //1：水平方向上:值  100<x<200
            if(parseFloat(100)<parseFloat(pos.x)&&parseFloat(pos.x)<parseFloat(200)){
                count++;
            }
            //2:斜方向：    值  100<y<yLocation
            if(parseFloat(100)<parseFloat(pos.y)&&parseFloat(pos.y)<parseFloat(yLocation) ){
                count++;
            }
            //3：右下角点击处的坐标到圆心的距离是否大于半径(计算如图（B）区域)
            if(Math.pow((parseFloat(pos.x)-100),2)+Math.pow((parseFloat(pos.y)-100),2)<10000){
                count++;
            }
            //4：计算左下角斜边长是否在等比例上(计算如图（A）区域)
            if((xLocation-100)/(pos.x-100)<(yLocation-100)/(pos.y-100)){
                count++;
            }
            
            if(count==4){
                alert("您点击了扇形！")
            }
        })
    ```
    4) 不过整个游戏可以不需要判断点击的区域。不过我还是想试一试，不想用网上的库，麻蛋教程写的还不好。 ~放弃~
3.获取整个canvas点击事件，随机返回颜色。

4. 旋转
    1)网上的代码示例看起来都是对ctx 整个进行旋转，我看看是不是自己重新理解一下示例。
    ```
        var canvas = document.getElementById("con");
        //获取上下文
        var cxt = canvas.getContext("2d");

        cxt.fillStyle = "red";
        cxt.fillRect(100,100,200,100);
    
        cxt.rotate(20 * Math.PI/180);
        cxt.fillStyle = "blue";
        cxt.fillRect(100,100,200,100);
    ```
    ctx 整个旋转？
    猜测ctx指示一个canvas上的图像对象。现在实例化两个试一试。
    分别var ctx ; var ctx2 。但是ctx使用清楚画布函数的时候，ctx2的内容也没了。
    所以，估计还是同一个东西。
    为确保问题，试一试旋转. 还是不行

    卡住了。。。。。。。。。。。。。。。。。。


    我不知道他是怎么旋转的。
    
-------------------------------

1. 改用css写
-----------

改回去，还是用canvas , 放弃使用rotate 函数 , 直接旋转画布肯定不是我想要的。
自己写旋转

6.  重新设定画布原点，不然感觉计算坐标的时候。麻烦。

---------------

# 改用css3 的旋转样式来写， 至于如何判定游戏背后的逻辑，搞个数组吧，对一圈360度进行分区域，显示是一套逻辑，背后还有一个逻辑，分别处理。

1. stick_vv1.html 
    # 实现点击后，下面 all_boll球的区域减少，big_boll 改变颜色
    1） appendChild()  传递参数不能直接是字符串。搞个函数包装一下，根本还是利用innerHtml

    2) MD , js 引入写到最下面了还是log出来是null
    ```
    const bindClickEvent = () => {
        let map_bg = document.querySelector('bg')

        console.log(map_bg,bg)
        map_bg.addEventListener('click', (event) => {
            console.log(`被点击了`)

        })
    }
    ```
    MD 这有毒吧
    ```
    const bindClickEvent = () => {
        let map_bg = document.querySelector('bg')

        console.log(map_bg,bg)
        //TM 的  我querySelector 不行，直接用id名字都可以。浮球。
        bg.addEventListener('click', (event) => {
            console.log(`被点击了`)

        })
    }
    ```
    .......我傻了
    let map_bg = document.querySelector('bg')
    没加#号。 。。。。。

2. stick_vv1.js 
    # 实现，点击鼠标，添加一个小球的功能

3. 实际上是初始化会有几个球，然后，点击，会减少一个球
    ? >
        ```
        const deletBoll = () => {
            let all_boll = document.querySelectorAll('.boll')
            ? > bug : console.log(`删除的小球是:${all_boll[0].dataset.id}`)
            `这里报undefined`
            all_boll[0].remove()
        }

        const bindClickEvent = () => {
            let map_bg = document.querySelector('#bg')

            console.log(map_bg, bg)
            //也可以直接　用id 名字 bg直接当做那个标签元素,不用获取也可以。

            map_bg.addEventListener('click', (event) => {
                deletBoll()
            })
        }
        ```
    不过不影响功能

4. stick_vv3.js
    # js 设置css样式，修改boll球的颜色。
    两种方法: 
     1)直接内联到li元素里面   
     2)另起一个函数，生成li元素后，最后想办法添加css

    采用第一个想法
    ```
        <li class="boll" data-color="${boll_color} data-id="${id}" style="background-color:${boll_color}" "></li>
    ```
    内联方便，生成li的时候就给他style 让浏览器解决问题


    # 让大球的颜色随着第一个小球的颜色变动

    两个方案: 
        1) 写个定时函数，跟踪第一个小球的颜色
        2) 放在点击函数里面。
    使用第一个函数
    ```
        let followingColor = setInterval( () =>{ 
            let big_boll = document.querySelector('#bg')
            let first_boll = document.querySelectorAll('.boll')[0]

            console.log(`first_boll is `)
            console.log(first_boll.dataset.color)

            ? > bug : log 出来的是这个 : #25d0e7 data-id= . 不知道哪里冒出来的data-id  
        }, 2000)
    ```
    我怀疑是模板那块没搞好 .. 
    果然。
    √ > bug
    那上面的bug也好了
    就知道为什么是undefined 了
4. stick_VV4.js 
    # 实现旋转 , 默认有几个小球
    对这个东西的实现一点不了解，看看css3 旋转相关的知识吧。

    看东西的时候我发现 , 这里大球周围的棒棒糖 可能可以用canvas来做。
    还是用css来写吧。
    估计要动html  ,　创建一个 stick_VV3.html
    MD  , 水平不行，css 不会搞，感觉canvas好搞

    就这吧. 旋转的小球用cnavas


    看canvas 有什么函数能让我用的。
    			ctx.save();
    
    1) 看看能不能初始化原始坐标
     #   canvas 自定义原始坐标
    MD , 我发现有save restore() 这俩函数可以解决最开始我遇到的问题。
    纯canvas 可以解决问题。

    但是 , 现在我有个新的问题 , 旋转失效
    ```
    const changeOriginPoint = () => {
    //设置cnavas中心点是原点
    let canvas_heith = canvas.height
    let canvas_width = canvas.width
    //就这一行代码就行了，相当于对于浏览器来说，吧canvas 进行css处理，移动了
    // → 和 ↓ 是正
    ctx.translate(canvas_width / 2, canvas_heith / 2)
    //我有种预感，其实这样处理不好.
    }

    const crossLine = () => {
        ctx.beginPath()

        ctx.moveTo(0, - canvas_heith / 2)
        ctx.lineTo(0, canvas_heith / 2)

        ctx.moveTo(- canvas_width / 2, 0)
        ctx.lineTo(canvas_width / 2, 0)
        ctx.stroke()
    }
    // 不知道为啥 这官网api 画个图 ,  需要 beginPath()
    const rawArc = (x, y, radius, color) => {
        ctx.beginPath()
        ctx.arc(x, y, radius, 0, 2*Math.PI)
        ctx.stroke()
    }
    ```

    > 去rotate.html  文件练习练习
        作业还没写。。浮球。

    >  ？ why ? 现象记录 : 
        比如我自己定义了一个函数，画一个十字架。
        然后我在函数外面用    ctx.rotate(1)   就没有效果
        , 但是在函数里面使用就有效果 , 为什么

    > 网上找了个这句子 ,　　可能有启发
     “canvas没有直接旋转图片的功能，只能旋转画布
        一般的做法是
        ctx.save();//保存状态
        ctx.translate(200,200);//设置画布上的(0,0)位置，也就是旋转的中心点
        ctx.rotate(45*Math.PI/180);
        ctx.drawImage(img,-img.width/2,-img.height/2);//把图片绘制在旋转的中心点，
        ctx.restore();//恢复状态”
    看来我对translate 理解错了。不是移动画布而是移动这整个ctx矢量图

    > 
    ```
        // → 和 ↓ 是正
    ctx.fillRect(10, 10, 200, 200)
    ctx.translate(canvas_width / 2, canvas_heith / 2)

    ctx.fillRect(10, 10, 100, 100)
    这样实验，看看有什么差别。会发现第一个是
    ```
    ```
    ctx.fillRect(10, 100, 200, 200)
    ctx.save()
    ctx.translate(canvas_width / 2, canvas_heith / 2)
    ctx.restore()
    ctx.fillRect(10, 10, 100, 100)
    
    ```
    save() 不会保存它的路径和位置
    
    学习save() 
    > 画一个图  移动一下画布，然后再画一下图 , 参数不变
    >  上面步骤多加一个save()

    ? >     
    ctx.fillRect(-50, -150, 100, 100)
    ctx.rotate(1)

    按照正常理解，canvas 的旋转都是针对画布进行操作的，那我画完图，在旋转，按理说rect也会旋转
    但是，实际没有. 
    你需要这样做，
    ctx.rotate(1)
    ctx.fillRect(-50, -150, 100, 100)
    它， 才能旋转，啥意思，是你先旋转了画布，然后画画。你画画确实针对画布操作的。所以，这时候就是旋转过的。
    所以，我觉得有一个很重要的步骤，没有讲。

    canvas每一次操作完以后都有一个映射操作，就是把canvas上面的样子印到页面上。而非直接在canvas上面显示。
    这样就能理解了。
    关键是最后有一个“印”的操作。


    rotate.html 实现一个功能，点击画布实现旋转功能

    rotate_v2.html  最后一网页看到一个人的回复 , 有点感觉了 , 确定自己的猜想, 画布最后有一个
    "印"图案的步骤。
    
    rotete_V3.html 终于搞好了, 实现点击小球,旋转
    现在实现点击一次就在原来的点增加一个球进入旋转
    gameOver() 来判断结束 ,原理是数组中没一个元素相差绝对值不小于16(图形上一点点试出来的)
    ,计算起来,需要查一点东西, 封装一下。
    
    > 现在,添加自动旋转功能
    修改了一下游戏结构,  今天下午看了一会儿 ,关于游戏循环的东西,想找案例代码,但是没找到

    // 根据这个图 , 我没有用数字来计算判断是否game over ,先用图形上看的方式判定吧
    // 每个球的角度不能小于16度 , 也就是数组每一个值之间差距不能小于16 同样,我能也就能计算出一共能
    // 放几个球 360 % 16 , 
    
    我发现这种判断有问题,只能判断两个相邻的数据是否有重合, 那第一个球和第三个球呢？
    假如循环了一圈我猜点的。
    所以现在判断方法变成,  只要数组里有任意两个数字之间的差值绝对值, 小于 某个固定的“距离”
    就说明有重合了 ,
    这个判断的算法, 1.先对数组进行排序 2.再逐个去差值
    有个自带的sort函数
    出现问题了。    let arr = balls.sort()
    直接对balls原来核心数据进行判断。很不好,而且确实有bug , 
    关键词 : 深拷贝,浅拷贝 (这跟语言机制有关系)
    judgmentGameOver() 函数里面
    
    # rotate_v3.html
    (最后我看到这个网页的人的评论我才搞明白,证实了我之前的猜想)[https://bbs.csdn.net/topics/391064864?utm_medium=distribute.pc_relevant.none-task-discussion_topic-BlogCommendFromBaidu-8.control&depth_1-utm_source=distribute.pc_relevant.none-task-discussion_topic-BlogCommendFromBaidu-8.control]
        最后有个Bug 算是定时器里面的知识点 。 重复启动定时器会加速而且暂停无法暂停。
        如何整个游戏只能一直有一个定时器就好了

    # 定时器传递参数的问题
    
    md 的, 好好的就有毛病了。
    原来是语句顺序问题, 我想改开始调顺序是 想看起来容易看一些。
    却触发了定时器传递参数的问题。我直接写进小括号就不能运行了。

    >  最后添加上棍 drawLine()

    # strick_v4.js   实现核心功能 , v5.js修改一些东西,添加方便功能
    

    # strick_v5.js

    颜色随机把校对一下颜色
    由于li我最开始是dom 操作做出来的, 所以我canvas就直接从自定义属性里面拿吧
    算了, 我感觉不好拿  我直接存到一个数组里让后面数据一起用
    
    修改一下总数据
    var all_balls_numbers = 12
    template 部分最开始算一下剩余个数

    想了好久, 脑袋好乱 , 想睡觉了。有点困了。
    写了个函数生成一个总color_arr 来用  在initDate() 里面

    > 最后gameover 处理函数
        本想,先接触绑定的点击事件 , 但是发现绑定的时候是匿名函数,接触不好搞
        只能改成这个样子
            bg.addEventListener('click',fireBullet)
    但是,这样我就不知道如何传递参数了。 所以参数只能另外用别的办法,让运行的函数
    用全局参数? 但是这不是办法。目前就这样了

    > 最后添加一个alert 窗口重新开始用
    bug ? > 最后还有个问题 , 就是我假如通关了,如何处理我再点击函数,发现还能生成一个球
    ,我想写个回调函数,再 bullset 删除成功以后才调用回调函数,这样就好了
    done  第一次尝试回调函数解决问题, 挺开心

    > 解决一下 gamevoer gamesucess 判断
    done 我发现个有趣的事,判断游戏结束 时候 用到的补集思想

    > 添加一下弹窗功能 , 不过为了后面的代码调试 , 

    我先写 下一关这个功能
    
    > 下一关 、重新开始功能
    我没写过,不知道如何处理 多少关 的这种数据如何更好的处理 , 想查一查,不知道关键词。
    done 

# strick_v7.js 
    修复一下 gameover  gamedone 造成定时器的问题
    重置数据核心就是
    restartPass() 函数里面的东西
    不过我写东西感觉是面向过程的,浮球,不会面向对象搞这些。不知道怎么练习
    
# alert_pr/01.html
    //先放一下..把整体颜色改一改 , 尽可能还原样子

# strick_v8.js 
    麻蛋发现子弹发射动画有点恶心, css3写？
    想改一下把子弹也有canvas写动画效果就是位移就好了
    真累

    requestAnimationFrame() 官网看到这个,看了看snake案例

    不搞动画了。 不会

    最后添加一下数字  
    bullets 是li元素生成的。使用insertBefore() ,让 li排序逆序  
    这个东西没搞完, 发现个Bug 最后一个小球不能判断game over
    刚写完这句话,找到bug所在低点了
    gameOver()函数中的 循环判断, 写的小于号 ,
    ```
       const gameOver = (balls) => {

       let arr = judgmentGameOver(balls)
       for (let i = 1; i <= arr.length; i++) {

    ```

# 我保证这是最后两个 功能, 把字写进去 , 提示信息

    > 提示信息写个统一的函数交互的东西全都换掉
    > 麻蛋 来回切换屏幕绑定的事件太恶心了，洗个状态吧记录游戏运行状态run 或者wait ,wait有分
    > 写成alert , nm

    原生js添加dom节点是真的蛋疼
    ```
    const textTempalate = (msg) => {
       let str = `
           <div class="alet"> ${msg} </div>
       `
       //原生js添加某个节点真TM 蛋疼
       let alert = document.createElement('div')
       alert.setAttribute('class', 'alert')
       alert.
       let border = document.querySelector('#stick-border')
       border.appendChild(alert)

    }
    
    ```

    ? bug> 最后我发现我的gameover() 判断函数是随着游戏一直在监听的。这样不好,浪费。
    明明是我点击事件触发后判断才对
    把判断函数放到fire里面
    ```
    第1个小球和第0个小球的距离是 90
    strick_v8.js:135 第2个小球和第1个小球的距离是 90
    strick_v8.js:135 第3个小球和第2个小球的距离是 243
    strick_v8.js:135 第4个小球和第3个小球的距离是 NaN
    
    ```

    
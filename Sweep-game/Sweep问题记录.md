课7作业 有一个练习是计算地雷个数的数组的


1.布局永远都是最蛋疼的事
2. 子元素设置了float ，父元素坍塌问题

3.父元素大小刚好是子元素撑开的样子。怎么让父元素自动适应子元素

4. 文字水平，垂直居中的办法
        /* 文字垂直居中  水平居中办法*/
        line-height:62px; 高度要等于此元素的height值
        text-align: center;
        
5. 根据自定义属性定位获取到标签
        >这个搜了好久，没找到简单的办法 , 搜的时候自己想了一个办法:querySelectAll()
        >获取到一组元素，然后if dataset = ？？ 筛选集合。
        >这样的话 , 每次筛选都等于把真个地图遍历一遍。。。。。

        > 只能用遍历筛选的办法了
        1) 碰到一个坑
            let element = document.querySelectorAll(`div[data-x='${x}']`)
            data-x = ' ' 
            一定要加上花括号。不要直接等于一个变量。 数据格式不一样
        > 改了，不需要遍历也可以了。
        let element_x_y = document.querySelectorAll(`div[data-x="${x}"][data-y="${y}"]`)


6. 我TMD 碰见一个坑，巨 TM 的恶心
        let element_x_y = document.querySelectorAll(`div[data-x="${x + 1}"][data-y="${y}"]`)
        假如用了``字符串操作
        里面的变量很有意思，输出的直接就是个值
        跟直接log()变量出来不一样
        有字符串就会直接当做字符串运算了。eg:
        log(`是此位置(${x + 1},${y + 1})正在对周围进行标记+1=========================================`)
        我以为会是数字类型相加，结果他直接就当做字符串操作了，但是如果没有别的字符，log的只有变量，就可以这样操作
        导致我log 半天MD没发现错误
        没办法只能把东西拿出来存到一个变量里，再放进去
        
        发现问题在哪里了。
        自定义属性本身就是字符串类型
        拿的时候就是字符串，后面的运算当然也是字符串。
        所以 , 结论：
        那dataset.    的时候最外面要parseInt() 转换成数字类型

    //筛选出是坐标的div
    // let element_x_y = document.querySelectorAll(`div[data-x='${x}']`)
    //我发现这样居然可以根据自定义属性获取元素parseInt(${x}+1)
    // let element_x_y = document.querySelector(`div[data-x="${x}"][data-y="${y}"]`)
    // console.log(element_x_y)
    //测试成功  
7.出现了另一个问题，无限循环的情况。

   >02.js 文件来解决这个问题。

8. 有一个bug 搞了我半天，最后发现自己TM 的逻辑有问题
        >最后成功的文件是02.js 

9.修改样式 , 兼容手机 , 整理文件

10.初次写的时候为了方便调试，map_arr 用的是固定的， 最后再写一个随机生成数字的函数。

# sweep_v1.js  
        才发现还有最后一个点击出现雷，游戏结束的情况没写
        用了一个show_map() 函数实现了
 
# sweep_v2.js   sweep_v2.js  实现随机生成地图的扫雷逻辑数组部分
        添加功能 , 地图数字随机生成 , 塞进去
        整个入口是square  所以从这里改就行了
        MD , 我发现个事 , 要先生成地雷。然后再写个函数,来计算地雷旁边的数字。用+ 1 的逻辑吧

        ```
                function getRndInteger(min, max) {
                        return Math.floor(Math.random() * (max - min) ) + min;
                }
        
        ```


        > 地雷生成 思维
        //这个函数。如果我是获取到0 1 , 有点麻烦 , 会导致地雷分布可能不均匀的情况。
        let num = Math.round(Math.random());

        1. 先弄出来一个全是0 的 9 * 9 数组 , 炸弹随机存进去

        ```
                var map_len = 9
                var bomb_number = 12
                var square = []

                //make  二维数组 
                const makeArrMap = (square, map_len) => {
                for (let i = 0; i < map_len; i++) {
                        square[i] = []
                        for (let j = 0; j < map_len; j++) {
                        square[i].push(0)
                        }
                }
                return square
                }
                makeArrMap(square, map_len)

                //返回一个数组，是个坐标。
                const randomArr = (map_len) => {
                let pos = []
                for (let i = 0; i < 2; i++) {
                        pos.push(Math.floor(Math.random() * map_len))
                }
                // console.log(pos)
                return pos
                }


                const makeArrBomb = (square, bomb_number) => {
                for (let i = 0; i < bomb_number; i++) {
                        let position = randomArr(map_len)
                        square[position[0]][position[1]] = 9
                }
                }

                makeArrBomb(square, bomb_number)
                感觉代码还不够条理
        ```

# sweep_v3.js          解决图片问题 。

        看看图形操作那边用不用做什么手脚 , 为了防止出现bug 新建一个。
        试了一下，发现可以直接拿来用
        删掉所有注释

        准备修改css样式部分。 
        > 区分颜色 让 地雷 9 明显

        基于自己写的游戏规则 , 只要点到地雷就会输 , 展开全部效果。所以在
        showMap 函数里面 多添加class 样式给 data-number = 9的 cell格子
        只有全展开的情况你才能看到所有的9 ,或者特殊处理 , if 是9 添加的
        class类不太一样。

        ? >  css 设置了background: url('')
        图片的时候 背景就成了白色。
        另外建立一个 sweep_v3_1.html 来试background  
        done > 发现是路径错了

        ```
                if (all_map[i].dataset.number == '9') {
                
                all_map[i].classList.add('oppen_nine')
                } else {
                all_map[i].classList.add('oppen')
                }
        ```
        发现背景颜色无法覆盖文体 , 
        自己感觉有两种办法 , 一种是通过css 修改样式 ,
        一种是 js操作把 文字删掉。 感觉第一种好一些 ,但是我不会。没搜到

        ```
                all_map[i].innerHTML = ''
        ```
        标签里面的东西等于空就行了
        不过仔细想一下，文字 9 . 在最开始就没必要放进去。只是逻辑上用的。

        > 文字设置不能选中

        ```
                /*文字不能选中*/
                -webkit-user-select:none;
                -moz-user-select:none;
                -ms-user-select:none;
                user-select:none;
        ```
        > 修改一下文字字体吧 , 算了改字体没多大意义 -> 修改一下字体颜色。

        思路是在展开的时候 添加一个类 样式的值是js来完成 写一个数组
        根据数字大小来当索引位置。拿到不同的颜色rgb值。
        发现凡是对 class操作修改样式我都是对cell操作。add()函数。
        所以 , 单独出一个函数进行筛选cell 决定展示的样子

        joshua 真聪明
        写了一个 showCell函数传入cell对象 , 判断但是最开始的点击判定也要改一改不然会无限循环,

        if (!cell.classList.contains('oppen') && !cell.classList.contains('oppen_zero')) {

# sweep_v4.js  添加右键标记功能
        找图片可麻烦死了

        图片沾满的写法

        background: url(source/bear.png) no-repeat;

        background-size: cover;


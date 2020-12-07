2020年11月30日 16:44:39

# pop_V1.js 
    这次使用jquery来写


# 02.html 
    flex 布局 
    点击去掉cell测试布局问题,看看cell消失能不能用css3布局来达到效果
    有办法了, 以列为单位, 没一列当做一个项目 列与列用横向排列 ,并且left对齐
    列里面cell用cloumn reverse排列. nice
    这样多级别组合就能得到想要的了,这样的话,理论上任何排列方式都可以了
    done > 完成布局
# 03.html
    这个文件测试好有趣,就这吧
    测试一下flax 不布局里,里面的项目能设置成flex吗？
    最后测试可以

# 04.html 
    template() 生成cell的html ,但是我发现游戏机制是点击然后及时的判断当前的上下左右
    相连的cell是否相同。如果是根据data-x data-y来删除的就会出问题因为data-x data-y最开始就写好了,所以不能根据自定义属性来删除 , 
    所以直接循环删除(反正要递归)

    问题来了:
        removeCell(self) 处理点击事件, 删除某个cell
        但是我拿到cell 数据只是单个dom节点。我除了利用节点带有的自定义属性这个信息,好像没有信息能够表明独特性ID之类的。
        除非我做个中转, 写个查找函数干嘛的呢？
        就是根据当前的x ,y 自定义属性来做判断, 循环及时的all cell
        利用循环时候的i ,j 这样我就转换成了当前及时的cell坐标。
        nice~~~!
    这样的话,

    - 关于布局的又一个想法 > 
    我写着写着, 想起一个有趣的东西,我可以不用flex布局,我把整个box 元素旋转一下不就好了吗？
    这样就简单一些了

    现在shiftRealCell() 函数是返回真实位置的 循环遍历为了避免遍历到不存在的cell
    所以双重循环的长度 , 值需要拿到
    cell消失用的remove 但是没有对 .column div[column] 元素删除, 所以写一个getCloumnNubner()
    函数来及时获取当前的cloumn的个数
        let cloum_cells_num = $(".column").length
    ========感觉思路有点不对
    没必要处理,好像 , 不过处理了肯定好。不想让计算机做没用的操作想到用一个数组记录当前的事实数据,cell没了同时数组里的对应数据也消失。
    这样完全显示和数据分离。这样好一些
    写游戏算是核心的思维方式了。感觉,不过这次没必要,因为html dom节点本身也可以看成数组存放这数据  
    不过这样感觉不好了, 数据放到前面很扯淡, 正常应该是后面数据处理完,然后交给前端,有前端来处理生产页面多好。从前面拿数据,慢不说,思路还错了。不利于维护


    重来 》》》》》》》
    别了。。。

            let cell_num = $('.column').eq(i).children().eq(2)
        我发现我拿不到子元素,就是不能用原生js  dataset.** 来获取自定义属性
        查了一下方法不一样

    let real_cell = shiftRealCell(x, y) 拿到即使坐标

    然后    removeAround(real_cell) 对周围4个进行操作  
    计算周围4个坐标进入vjkl1 函数 先if 判断得到的位置是否在数据范围内 然后才有考虑要不要删除操作


    看样子核心数据处理方式是没事了
    下一个v 添加上颜色信息
# popstart_v1_5.js  
    - 添加上颜色信息 每次刷新得到颜色 生产传进去
  
    getColor() 来返回颜色 , 先弄4个颜色吧
    template() 里面 , 每次生成HTML的时候就内联css, 同时放入对应的number,用于判断是否相同
    这种写法是一次性的, 就是没有生成的部分不太好,　以后再考虑吧
    而且flex布局的css动画效果不知道怎么添加

    - 完善最后一个功能 remove 试试
    我需要传递一个颜色信息
    有点蛋疼, 先实现点击判断, 然后删除周围的周围四个吧,
    出现个bug 每次点击完以后就刷新了必然会消失一个, 导致上面元素会掉下来一个
    这时候是removeAround () 里面判断的周围四个就变了, 
    计算上面的位置,　其实是点击消失前的上面第二个cell 会跳过一个。。蛋疼
    ? > 写了几个游戏 发现有个东西是应该是游戏里面 会有这个专业词 ,需要某种方法解决,数据的及时传递问题


# popstart_v1_6.js 
    上面的解决办法, 不计算上面的cell 就计算当前的cell,再计算几次。反正他落下来了
    感觉这样不好,不知道别的办法

    我想了一下, 数据不及时的原因是因为删除操作不够统一 , 现在我单独写一个函数就是处理删除的
    这样的我就需要再写个东西记录用,试一试



重写 》》》》》》》》
# popstart_v2.js

# 脑袋乱了
    捋一捋思路
    renderHtml() 最开始就渲染好地图
    > 点击触发addCellsToStorage() 事件
        其中把点击的cell  转换成及时坐标
        markAround() 计算周围四个元素
        对这个四个元素进行判断是否color_number 一样
        一样就假如到storage数组里面

# 乱死我了。
    我想严格按照MVC 的思路来写
    

# popstart_v2_1.js
    完成递归吧想相同颜色的cell放进storage临时仓库里面

    CellsAddStorage(self, square) 终于完事,能拿到相同颜色的cells 了
    我用的mvc思路 虽然有的步骤多余,不过这样好
        cellsStorage.length = 0  加入storage前清空一下数组
    ? > 有个问题不会弄 递归怎么能log最后一个状态也就是所有递归完成后把最后的状态输出

# popstart_v2_2.js
    markCells() 对已经标记的cells 添加样式 , 最好把点击别的cells之后selected cells
    的样式换掉

    标记的逻辑是数组中对应的位置 加某个特定的数值 , 比如10  ,标记的目的是为了给
    到render部分 识别到渲染的时候区分渲染 。 

    不过我又想到别的办法加个小渲染 

    > 想到个东西 , 除了最开始点击事件是用到cells 的自定义属性其余的都不会再用到了,这中间有个转换函数 根据点击的自定义属性 来转换成及时的坐标,以后的所有操作都是根据及时的坐标操作,也就是说.dataset 拿到数据的操作只用一次

    # jquery_1.html 测试 jquery 动态获取节点信息的问题

    点击第一次会把选中的元素添加 .add-storage 类 ,思路是多谢一个监听函数专门监听这种类.
    不过这里有个bug 必须要解决切换选中的类.
    MVC 这个游戏是用户点击驱动的机制

    游戏循环渲染操作以前都会有清空操作
    ```

    $('.box').on("click", ".cell", function(event) {
        let self = event.target
        //添加前都清空一下数组 , 
        cellsStorage.length = 0
        //清空页面节点
        $(".box").empty()
        //渲染页面
        renderHtml(square)
        CellsAddStorage(self, square)
        markCells()
    })
    
    ```
    出问题了 , 监听点击事件的问题 两种解决办法 
    class 就不要add 了直接替换
    另一种监听类的时候 除了add-storage 的级别高一点,但是我不知道怎么处理
    jquery 找到not 选择器 不知道能不能用

    这样写,感觉不太好,感觉游戏有两个循环一样 , 回头再看看能不能整合
    ```
    
    $(".box").on("click", ".add-storage",function(event) {
        //根据 cellsStorage [] 删除 square数组
        console.log('enter click add-storage')
        removeCells(cellsStorage, square)
        $(".box").empty()
        renderHtml(square)
    })
    
    ```

    删除选中的cells 的时候用delete 留着空洞这样就能避免 因为坐标问题忽略一些cells
    然后再写个函数 利用filter 返回一个新的函数过滤掉undefined


    ```
        //　删除空洞
    for (let i = 0; i < square.length; i++) {
        square[i] = square[i].filter(pos => pos !== undefined)
    }
    //每次删除完以后都判断一下是否空了
    judChildens(square)
    
    ```
    done 

    > 最后还原游戏本来样子 点击时候必须存入的有至少两个才能被点击

    在markCells () 函数里面
    最外层添加一层if 判断 cellsStorage里面必须多于1个才能被标记
# popstart_v3.js    

    - 添加记分功能
    添加一个函数就好了    addScore(column_len)

    - 最后加入一个判断 game over
        我发誓 遍历是最蛋疼的是

    - 代码优化一下, 解决小bug



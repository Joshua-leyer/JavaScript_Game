var log = console.log.bind(console)
//发现这种布局有个问题, 加上这种方式生成html内容, 会导致cell的id 不是从左上角开始的
//不过本身不影响运行,本身循环就是为了遍历得到的位置不会影响,
const template = (clou)=> {
    let cloumn = '<div class="column">'

    for (let i = 0; i < 9; i++) {
        let res = getColor()
        cloumn += `<div class="cell" data-x="${clou}" data-y="${i}" 
        data-number="${res[0]}" style="background:${res[1]}"></div>`
    }

    cloumn += '</div>'

    return cloumn
}

// 总共四个颜色搞个数组吧  , 每次随机函数返回 0-4 范围的内容
const getColor = () => {
    let res = []
    let color_arr = ['#80FF00', '#5882FA', '#F781F3', '#F7F132']
    let num = Math.round(Math.random() * 4)
    res[0] = num
    res[1] = color_arr[num]

    return res
}




const renderThml = () => {
    //inner Html 部分
    for (let i = 0; i < 9; i++) {
        let clouthml = template(i)
        $('.box').append(clouthml)
    }
    // render 部分 , 想想算了 , 直接写到tem里面
}

const hasChildenCell = () => {
    //先把没有cell的列 元素删掉
    for (let i = 0; i < 9; i++) {
        if ($(".column").eq(i).children().length == 0) {
            $(".column").eq(i).remove()
        }
    }

}

const shiftRealCell = (x, y) => {
    // console.log(`拿到的属性坐标x和y是${x} , ${y}`)
    //当前及时行的个数,避免循环不存在的cell
    let real_x_y = []

    // console.log(cloum_num)
    // (i ,j) 才是实时坐标
    //列循环
    let cloum_num = $(".column").length
    for (let i = 0; i < cloum_num; i++) {
        let cell_num = $('.column').eq(i).children().length
        // console.log(`第${i + 1}列的cell有${cell_num}个`)
        //列内cell循环
        for (let j = 0; j < cell_num; j++) {
            let jud_now_cell_x = Number($('.column').eq(i).children().eq(j).data("x"))
            let jud_now_cell_y = Number($('.column').eq(i).children().eq(j).data("y"))
            // console.log(`此时对比的cell属性坐标是${jud_now_cell_x},${jud_now_cell_y}`)

            if ( jud_now_cell_x == x && jud_now_cell_y == y) {
                //遍历到相等的时候把(i ,j )真实坐标存起来
                real_x_y.push(i)
                real_x_y.push(j)

                // console.log('真实坐标是', i , j)
                return real_x_y
            }
        }
    }
    //这种写法应该不会走到这一步,只要你能点到,证明上面的if必然有一个为真
    return false
}





const removeCell = (cell) => {
    // console.log(cell)
    let x = cell.dataset.x
    let y = cell.dataset.y
    let number = cell.dataset.number
    // log('属性坐标是', x , y)
    let real_cell = shiftRealCell(x, y)
    //这个操作是根据点击删除的,不过我觉的这样不好,改一下,根据真实坐标删除,虽然本质还是需要遍历map
    //不想换了
    //其实应该这样     // let cell = $(".column").eq(x).children().eq(y)
    //然后删掉  ,这是根据及时位置删的不过不影响游戏罢了 , 把html dom节点当做arr数据太扯淡
    cell.remove()

    removeAround(real_cell, number)

    //每次删除操作以后都判断是否有元素了, 没有就删了列元素
    hasChildenCell()
}

const vjkl1 = (x, y, number) => {


    // console.log(cell)

    //当前cell所在的列中cell个数等坐标信息
    let column_number = $(".column").length
    let cells_number = $(".column").eq(x).children().length

    //判断是否满足边界条件 , 在范围内必然就是在即使地图上是有cell的
    if (x >= 0 && x < column_number && y >= 0 && y < cells_number) {
        console.log(`此时cell(${x},${y})是存在的`)
        let cell = $(".column").eq(x).children().eq(y)
        let cell_num = cell.data("number")
        console.log(cell_num)
        //存在 然后判断颜色是不是一样
        if (cell_num == number) {
            //相同所以继续递归 判断他周围的四个块是不是一样的颜色 / 我有种感觉有个bug
            //我的感觉是对的 奶奶的
            // removeAround()
            cell.remove()
        }
    } else {
        console.log(`此时cell(${x},${y})不存在的`)
    }
}


const removeAround = (cell_position, number) => {
    let x = cell_position[0]
    let y = cell_position[1]

    // let cell = $(".column").eq(x).children().eq(y)
    // console.log('转换后的即时坐标是', cell)
    
    // 找到周围4个元素
    // 上下两个 (注意其实,由于布局的方式,导致这里坐标是都是换算了的,不过根本不影响)
    // 所以其实这里应该是变换后的 左右 , 下面那个是上下
    vjkl1(x - 1, y, number)
    vjkl1(x + 1, y, number)
    //左右两个
    vjkl1(x, y - 1, number)
    vjkl1(x, y + 1, number)

}



$(document).ready(function(){
    renderThml()

    $('.cell').click(function(event) {
        let self = event.target
        getColor()
        removeCell(self)
    })

})

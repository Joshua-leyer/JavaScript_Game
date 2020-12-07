var log = console.log.bind(console)
//发现这种布局有个问题, 加上这种方式生成html内容, 会导致cell的id 不是从左上角开始的
//不过本身不影响运行,本身循环就是为了遍历得到的位置不会影响,
const template = (clou, square)=> {
    let cloumn = '<div class="column">'
    let color_arr = ['#80FF00', '#5882FA', '#F781F3', '#F7F132']
    for (let i = 0; i < square[clou].length; i++) {
        if (square[clou][i] !== -1) {
            cloumn += `<div class="cell" data-x="${clou}" data-y="${i}" 
            data-number="${square[clou][i]}" style="background:${color_arr[square[clou][i]]}"></div>`
        }
    }

    cloumn += '</div>'

    return cloumn
}


const renderHtml = (square) => {
    for (let i = 0; i < square.length; i++) {
        let clouthml = template(i, square)
        $('.box').append(clouthml)
    }
}


/*  render end   */


const hasChildenCell = () => {
    //先把没有cell的列 元素删掉
    for (let i = 0; i < 9; i++) {
        if ($(".column").eq(i).children().length == 0) {
            $(".column").eq(i).remove()
        }
    }

}

var cellsStorage = []
const addStorage = (x, y) => {
    let arr = [x, y]
    cellsStorage.push(arr)
    console.log(`当前加入的cells个数是${cellsStorage.length}`)
    console.log(cellsStorage)
}


const hasStorage = (x, y) => {
    for (let i = 0; i < cellsStorage.length; i++) {
        if (cellsStorage[i][0] == x && cellsStorage[i][1] == y) {
            return true
        }
    }
    return false
}


const CellsAddStorage = (cell, square) => {
    // console.log(cell)
    let x = cell.dataset.x
    let y = cell.dataset.y
    let number = cell.dataset.number
    //转换真实坐标
    let real_cell = getRealCell(x, y)
    addStorage(real_cell[0], real_cell[1])
    markAround(real_cell, number)

}

const vjkl1 = (x, y, number) => {
    // console.log(cell)

    //当前cell所在的列中cell个数等坐标信息
    let column_number = $(".column").length
    let cells_number = $(".column").eq(x).children().length

    //判断是否满足边界条件 , 在范围内必然就是在即使地图上是有cell的
    if (x >= 0 && x < column_number && y >= 0 && y < cells_number) {
        // console.log(`此时cell(${x},${y})是存在的`)
        //根据及时坐标 得到cell　,这一步挺关键
        let cell = $(".column").eq(x).children().eq(y)
        let cell_num = cell.data("number")

        //存在 然后判断颜色是不是一样, 并且还没有进了暂时仓库里
        if (cell_num == number && !hasStorage(x, y)) {
            addStorage(x, y)
            let real_cell = [x, y]
            markAround(real_cell, cell_num)
        }
    }
}


const markAround = (cell_position, number) => {
    let x = cell_position[0]
    let y = cell_position[1]

    vjkl1(x - 1, y, number)
    vjkl1(x + 1, y, number)
    //左右两个 
    vjkl1(x, y - 1, number)
    vjkl1(x, y + 1, number)

}



const getRealCell = (x, y) => {
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





////////
const makeMapArr = () => {
    let arr = []
    for (let i = 0; i < 9; i++) {
        arr[i] = []
        for (let j = 0; j < 9; j++) {
            arr[i][j] = Math.floor(Math.random() * 4)
        }
    }
    return arr
}


$(document).ready(function(){
    var square = makeMapArr()
    renderHtml(square)
    $('.cell').click(function(event) {
        let self = event.target
        //添加前都清空一下数组 , 
        cellsStorage.length = 0

        CellsAddStorage(self, square)
    })

})

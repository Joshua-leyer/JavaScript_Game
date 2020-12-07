var log = console.log.bind(console)
//发现这种布局有个问题, 加上这种方式生成html内容, 会导致cell的id 不是从左上角开始的
//不过本身不影响运行,本身循环就是为了遍历得到的位置不会影响,
const template = (clou)=> {
    let cloumn = '<div class="column">'

    for (let i = 0; i < 9; i++) {
        cloumn += `<div class="cell" data-x="${clou}" data-y=" ${i}"></div>`
    }

    cloumn += '</div>'

    return cloumn
}

const innerThml = () => {
    for (let i = 0; i < 9; i++) {
        let clouthml = template(i)
        $('.box').append(clouthml)
    }
}

const removeCloumn = () => {
    //先把没有cell的列 元素删掉
    for (let i = 0; i < 9; i++) {
        if ($(".column").eq(i).children().length == 0) {
            $(".column").eq(i).remove()
        }
    }

}

const shiftRealCell = (x, y) => {
    //当前及时行的个数,避免循环不存在的cell

    let cloum_cells_num = $(".column").length
    // console.log(cloum_cells_num)

    // for (let i = 0; i < 9; i++) {
    //     let cloum_cells_num = $(".column")
    //     for (let j = 0; j < 9; j++) {
    //         if ($(".cell"))
    //     }
    // }
}

const removeCell = (cell) => {
    let x = cell.dataset.x
    let y = cell.dataset.y
    log(x , y)
    shiftRealCell(x, y)
    //每次删除操作以后都判断是否有元素了, 没有就删了列元素
    removeCloumn()
}

const removeAround = () => {

}



const makeMapArr = () => {
    let arr = []
    for (let i = 0; i < 9; i++) {
        arr[i] = []
        for (let j = 0; j < 9; j++) {
            arr[i][j] = 1
        }
    }
    return arr
}

var arr = makeMapArr()


$(document).ready(function(){
    // innerThml()
    $('.cell').click(function(event) {
        let self = event.target
        self.remove()
        // removeCell(self)
        // updateHtml()
    })

})

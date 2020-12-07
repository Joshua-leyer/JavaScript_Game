
let s = ' [[9,1,0,0,0,1,1,1,0],[1,1,0,0,1,2,9,1,0],[1,1,1,0,1,9,2,1,0],[1,9,2,1,1,1,1,0,0],[1,2,9,1,0,0,1,1,1],[1,2,1,1,0,1,2,9,1],[9,1,0,0,1,2,9,2,1],[1,2,1,1,1,9,2,1,0],[0,1,9,1,1,1,1,0,0]]'
let map_arr = JSON.parse(s)




//输入某一行的数组 , 和所在行 数 => 返回每一行的 html字符
const templateCell = (line_arr, x) => {
    //行内有几个。也就是几列
    let len = line_arr.length

    let cell = `<div class="row clearfix">`

    for (let i = 0; i < len; i++) {
        cell += `<div class="cell " data-number="${line_arr[i]}" data-x="${x}" data-y="${i}">${line_arr[i]}</div>`
    }
    cell += `</div>`

    return cell
}


const templateRow = (square) => {
    // 总共行数，
    let len = square.length
    let all_row = ``

    for (let i = 0; i < len; i++) {
        let cell = templateCell(square[i], i)
        all_row += cell
    }
    return all_row
}

function CreatMap() {
    var contianer = document.querySelector('.contianer')
    var map_html = templateRow(map_arr)
    contianer.innerHTML = map_html
}


const bindEventDelegate = function(square) {
    //注意动态生成html 的问题
    var contian = document.querySelector('.contianer')
    contian.addEventListener('click', (event) => {

        let self = event.target
        // console.log(self)
        if (self.classList.contains('cell')) {
            vjkl(self, map_arr)
        }
    })
}





const vjkl = function(cell, square) {

    let cell_x = parseInt(cell.dataset.x, 10)
    let cell_y = Number(cell.dataset.y)
    let number = Number(cell.dataset.number)
    console.log('此时被翻开的块下标是:')
    console.log(cell_x, cell_y)
    //筛选出已经显示的块块
    if (number === 0) {
        vjklAround(map_arr, cell_x, cell_y)
        cell.classList.remove('hidden')
    } else {
        cell.classList.remove('hidden')
    }
    // if (cell.classList.contains('hidden')) {
    //     if (number === 0) {
    //         vjklAround(map_arr, cell_x, cell_y)
    //         cell.classList.remove('hidden')
    //     } else {
    //         cell.classList.remove('hidden')
    //     }


    //     // if (number === 9) {
    //     //     console.log('have 9')
    //     // }else if (number === 0) {
    //     //     cell.classList.remove('hidden')
    //     //     // vjklAround(map_arr, cell_x, cell_y)
    //     //     console.log('is 0')
    //     // } else {
    //     //     cell.classList.remove('hidden')
    //     // }
    // }

}


const vjklAround = function(square, x, y) {
    console.log(`此时0 的位置(${x + 1},${y + 1})正在对周围进行标记=========================================`)
    //展开周围8个坐标 的数字

    // 找到周围八个元素
    //上下一共6个
    for (let i = -1; i < 2; i++) {

        let show_element_up = document.querySelector(`div[data-x="${x - 1 }"][data-y="${y + i}"]`)
        let show_element_down = document.querySelector(`div[data-x="${x + 1}"][data-y="${y + i}"]`)
        
        //存在性
        if (show_element_up !== null) {
            vjkl(show_element_up, map_arr)
        }
        if (show_element_down !== null) {
            vjkl(show_element_down, map_arr)
        }

    }
    //左右两个
    let show_element_left = document.querySelector(`div[data-x='${x}'][data-y='${y - 1}']`)
    let show_element_right = document.querySelector(`div[data-x='${x}'][data-y='${y + 1}']`)
    if (show_element_left !== null) {
        vjkl(show_element_left, map_arr)
    }
    if (show_element_right !== null) {
        vjkl(show_element_right, map_arr)
    }

}


//随机生成二维数组
// const randomArr = () => {

// } 

const __main = function() {
    CreatMap(map_arr)
    bindEventDelegate(map_arr)
}

__main()
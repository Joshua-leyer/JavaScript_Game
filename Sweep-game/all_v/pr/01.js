// 这个函数返回 line.length 个 cell 拼接的字符串
// line 每一行的数组
let s = ' [[9,1,0,0,0,1,1,1,0],[1,1,0,0,1,2,9,1,0],[1,1,1,0,1,9,2,1,0],[1,9,2,1,1,1,1,0,0],[1,2,9,1,0,0,1,1,1],[1,2,1,1,0,1,2,9,1],[9,1,0,0,1,2,9,2,1],[1,2,1,1,1,9,2,1,0],[0,1,9,1,1,1,1,0,0]]'
let map_arr = JSON.parse(s)






//输入某一行的数组 , 和所在行 数 => 返回每一行的 html字符
const templateCell = (line_arr, x) => {
    //行内有几个。也就是几列
    let len = line_arr.length

    let cell = `<div class="row clearfix">`

    for (let i = 0; i < len; i++) {
        cell += `<div class="cell hidden" data-number="${line_arr[i]}" data-x="${x}" data-y="${i}">${line_arr[i]}</div>`
    }
    cell += `</div>`

    return cell
}

// 2. templateRow 的参数 square 是二维数组
// 用来表示雷相关的数据, 我们这里是直接写死的数据
// 返回 square.length 个 row 拼接的字符串
// row 的内容由 templateCell 函数生
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


// 4. 实现 bindEventDelegate 函数
// 用事件委托的形式在父元素上面绑定 click 事件, 只处理格子
// 也就是 .cell(即 class 包含 cell 字符串) 元素
// 如果点击的是 .cell 元素, 那么调用 vjkl 函数
// 注意, 我们在 bindEventDelegate 里面不处理具体的逻辑, 只调用函数
// 具体逻辑放在 vjkl 函数里面实现
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

// 别人的代码
/** 
 *
 *  if (x1 >= 0 && x1 < square[0].length && y1 >= 0 && y1 < square.length) {
                let index = `[data-x="${x1}"][data-y="${y1}"]`
                log('index', index)
                let cell = e(index)
                let num = Number(cell.dataset.number)
                if (!cell.classList.contains('opened')) {
                    if (num === 0) {
                        vjklAround(square, x1, y1)
                    } else if (num !== 9) {
                        cell.classList.add('opened')
                    }
                }
            }
        }
 */



// 5. vjkl 是点击格子后执行的函数, 我们需要把扫雷的逻辑写在这个函数中
// 要注意的是我们在初始情况下就把数字写到了 html 中
// <div class="cell" data-number="1" data-x="0" data-y="1">1</div>
// 而初始情况下数字不应该显示出来的, 可以直接用 font-size: 0; 来隐藏文字
// 点击的时候根据情况用 font-size: 14px; 的方式显示文字
// 当然这一步应该用 class 来完成, 比如 opened class 里面写 font-size: 14px;
// 点击的时候根据 class 来执行具体逻辑
// 如果已经显示过(也就是 class 包含 opened), 则不做任何处理
// 如果没有显示过(也就是 class 不包含 opened), 判断下列情况
// 1. 假设点击的是数字 9, 展开, 游戏结束
// 2. 假设点击的是数字 0
    // 此时需要展开 0 周围的一片, 通过调用 vjklAround 函数来完成
    // 也就是说依然把逻辑写在下一层函数 vjklAround 中
// 3. 假设点击的是其他数字, 展开
const vjkl = function(cell, square) {

    let cell_x = parseInt(cell.dataset.x, 10)
    let cell_y = Number(cell.dataset.y)
    let number = Number(cell.dataset.number)
    console.log('此时被翻开的块下标是:')
    console.log(cell_x, cell_y)
    //筛选出已经显示的块块

    if (cell.classList.contains('hidden')) {
        if (number === 0) {
            vjklAround(map_arr, cell_x, cell_y)
            cell.classList.remove('hidden')
        } else {
            cell.classList.remove('hidden')
        }


    //     // if (number === 9) {
    //     //     console.log('have 9')
    //     // }else if (number === 0) {
    //     //     cell.classList.remove('hidden')
    //     //     // vjklAround(map_arr, cell_x, cell_y)
    //     //     console.log('is 0')
    //     // } else {
    //     //     cell.classList.remove('hidden')
    //     // }
    }

}

// 6. vjklAround 展开周围 cell 周围 8 个元素,
// x 和 y 分别是下标
// 展开周围的元素通过调用 vjkl1 来解决
// 注意, 依然把逻辑放在下一层来处理
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
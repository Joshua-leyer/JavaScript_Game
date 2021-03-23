





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

function renderSquare(square) {
    var contianer = document.querySelector('.contianer')
    var map_html = templateRow(square)
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
            vjkl(self, square)
        }
    })
}

const showMap = () => {
    let all_map = document.querySelectorAll('.cell')
    for (let i = 0; i < all_map.length; i++) {
        if (!all_map[i].classList.contains('oppen')) {
            all_map[i].classList.add('oppen')
        }
    }
}

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

    let cell_x = Number(cell.dataset.x)
    let cell_y = Number(cell.dataset.y)
    let number = Number(cell.dataset.number)
    //筛选出已经显示的块块
    if (!cell.classList.contains('oppen')) {
        if (number === 9) {
            // console.log(`game over~~!`)
            cell.classList.add('oppen')
            window.setTimeout("alert('game voer!')", 500);
            //展开所有
            showMap()
        } else if (number === 0) {
            vjklAround(square, cell_x, cell_y)
            cell.classList.add('oppen')
        } else {
            console.log(`other number`)
            cell.classList.add('oppen')
        }
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
    if (square[x][y] === 0) {
        for (let i = -1; i < 2; i++) {
            vjkl1(square, x - 1, y + i)
            vjkl1(square, x + 1, y + i)
        }
        //左右两个
        vjkl1(square, x, y - 1)
        vjkl1(square, x, y + 1)
    }


}
// 7. vjkl1 是重点函数
// 如果满足边界调节, 则继续
    // 满足边界的意思是下标符合范围
// 因为 vjkl1 这个函数的作用是展开格子, 所以如果已经展开过, 那么就不展开元素
// 根据 x 和 y 还有属性选择器选择出格子, 具体可以参考
// https://developer.mozilla.org/zh-CN/docs/Web/CSS/Attribute_selectors
// 比如想选中 data-x=3 的元素, 语法是 e('[data-x=3]')
// 比如想同时选中 data-x=3 且 data-y=5 的元素, 语法是 e('[data-x=3][data-y=5]')
// 选择元素之后根据情况来判断
// 如果没有展开过, 继续判断下列情况
    // 如果碰到的是 9, 什么都不做.
        // 注意, 这里 9 的处理方式和直接点击格子 9 的处理方式不一样
        // 点击格子 9 也就是点击到雷, 直接结束游戏
        // 这里展开到 9 是指展开到边界情况
    // 如果碰到的是 0, 递归调用 vjklAround 函数
    // 如果碰到的是其他元素, 展开
const vjkl1 = function(square, x, y) {
    //判断是否满足边界条件
    if (x >= 0 && x < square[0].length && y >= 0 && y < square.length) {
        let element = document.querySelector(`div[data-x="${x}"][data-y="${y}"]`)
        let number = Number(element.dataset.number)
        if (!element.classList.contains('oppen')) {
            if (number === 0) {
                element.classList.add('oppen')
                vjklAround(square, x, y)
            } else if (number !== 9) {
                element.classList.add('oppen')
            }
        }
    }
}


var map_len = 9
var bomb_number = 12

function makeMap (map_len, bomb_number) {
    var square = []
    //make  二维数组 
    const makeArrMap = (square, map_len) => {
        for (let i = 0; i < map_len; i++) {
            square[i] = []
            for (let j = 0; j < map_len; j++) {
                square[i].push(0)
            }
        }
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
        // console.log(square)
    }
    makeArrBomb(square, bomb_number)

    /**计算 */
    const clonedSquare = function(array) {
        let new_array = []
        //log(`有${array.length}行`)
        for (let i = 0; i < array.length; i++) {
            new_array[i] = array[i].slice(0)
            //log(`第${i + 1}行结束，此时new_arr的样字是：${new_array[i]}的。`)
        }
        return new_array
    }
    
    
    const plus = function(square, x, y) {
        //判断要加的位置坐标在不在范围内
        console.log(`+++++++++++++++++++++++++++++++++++++`)
        console.log(`+1的位置是（${x}, ${y}）`)
    
        if (x >= 0 && x < square[0].length && y >= 0 && y < square.length) {
            if (square[x][y] !== 9) {
                console.log(`√ 位置(${x},${y}) + 1`)
                square[x][y] += 1
                console.log(`----位置(${x},${y}) + 1 后的样子是: ${square[x][y]}`)
            } else {
                console.log(`位置(${x},${y})的值是${square[x][y]}，不需要添加`)
            }
        } else {
            console.log(`X位置不在范围内~~~~！`)
        }
        // log(`^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^`)
    }
    const markedSquare = function(array) {
        //拷贝数组得到 square
        let square = clonedSquare(array)
    
        console.log(` ----------------复制后数组的样子是:----------------`)
        console.log(square)
        console.log(`--------------------------------------------------`)
        //log(`矩形的范围是x:${square[0].length} ,y: ${square.length}`)
    
        for (let x = 0; x < square.length; x++) {
            for(let y = 0; y < square.length; y++) {
                if (square[x][y] == 9) {
                    // 周围一共有8个方块
                    // 上面6个
                    console.log(`是此位置(${x},${y})正在对周围进行标记+1=========================================`)
                    for (let i= -1; i < 2; i++) {
                        plus(square, x - 1, y + i)
                        plus(square, x + 1, y + i)
                    }
                    //左右两个
                    plus(square, x, y + 1)
                    plus(square, x, y - 1)
                }
            }
        }
        return square
    }
    


    /**计算end  */
    let res_arr = markedSquare(square)
    
    console.log(res_arr)
    return res_arr
}

//生成二维的数组 , 地图
let square = makeMap(map_len, bomb_number)


// let s = ' [[9,1,0,0,0,1,1,1,0],[1,1,0,0,1,2,9,1,0],[1,1,1,0,1,9,2,1,0],[1,9,2,1,1,1,1,0,0],[1,2,9,1,0,0,1,1,1],[1,2,1,1,0,1,2,9,1],[9,1,0,0,1,2,9,2,1],[1,2,1,1,1,9,2,1,0],[0,1,9,1,1,1,1,0,0]]'
// let square = JSON.parse(s)

const __main = function() {
    renderSquare(square)
    // bindEventDelegate(square)
}

__main()
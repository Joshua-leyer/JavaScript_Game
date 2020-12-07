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

const removeFlag = (cell) => {
    if (cell.classList.contains('flag')) {
        cell.classList.remove('flag')
    }
}

const markFlag = (cell) => {
    //筛选 , 只能对没点开的进行标记
    if (cell.classList.contains('cell') &&!cell.classList.contains('oppen') && !cell.classList.contains('oppen_zero')) {
        cell.classList.add('flag')
    }
}

const bindEventDelegate = function(square) {
    //注意动态生成html 的问题
    var contian = document.querySelector('.contianer')
    contian.addEventListener('click', (event) => {
        // console.log(event)
        let self = event.target
        if (self.classList.contains('cell')) {
            vjkl(self, square)
        }
        console.log('left')
    })
    //监听→键
    contian.addEventListener('contextmenu', (event) => {
        let self = event.target
        event.preventDefault()
        markFlag(self)
    })
}


const showCell = (cell) => {
    let color_arr = ['#1E90FF', '#008B45', '#FF6347', '#FF00FF', '#A020F0']
    let number = Number(cell.dataset.number)
    //有限处理flag标记 , 无论什么时候，只要是展开他就必然没有flag标记
    if (cell.classList.contains('flag')) {
        cell.classList.remove('flag')
    }

    if (number === 9) {
        cell.classList.add('oppen_nine')
    } else if (number === 0) {
        cell.classList.add('oppen_zero')
    } else {
        cell.classList.add('oppen')
        cell.style.color = color_arr[number - 1]
    }


}


const showMap = () => {
    let all_map = document.querySelectorAll('.cell')
    for (let i = 0; i < all_map.length; i++) {
        showCell(all_map[i])
    }
}


const vjkl = function(cell, square) {

    let cell_x = Number(cell.dataset.x)
    let cell_y = Number(cell.dataset.y)
    let number = Number(cell.dataset.number)
    //筛选出已经显示的块块 0 和别的数字都是现实了
    if (!cell.classList.contains('oppen') && !cell.classList.contains('oppen_zero')) {
        if (number === 9) {
            window.setTimeout("alert('game voer!')", 300);
            //展开所有
            showMap()
        } else if (number === 0) {
            vjklAround(square, cell_x, cell_y)
            // cell.classList.add('oppen')
            showCell(cell)
        } else {
            // cell.classList.add('oppen')
            showCell(cell)
        }
    }
}


const vjklAround = function(square, x, y) {
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


const vjkl1 = function(square, x, y) {
    //判断是否满足边界条件
    if (x >= 0 && x < square[0].length && y >= 0 && y < square.length) {
        let element = document.querySelector(`div[data-x="${x}"][data-y="${y}"]`)
        let number = Number(element.dataset.number)
        // 筛选必须不是数字(oppen类) 也不是 0(oppen_zero类)  
        if (!element.classList.contains('oppen') && !element.classList.contains('oppen_zero') && !element.classList.contains('flag')) {
            if (number === 0) {
                // element.classList.add('oppen')
                showCell(element)
                vjklAround(square, x, y)
            } else if (number !== 9) {
                // element.classList.add('oppen')
                showCell(element)
            }
        }
    }
}



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
        return pos
    }


    const makeArrBomb = (square, bomb_number) => {
        for (let i = 0; i < bomb_number; i++) {
            let position = randomArr(map_len)
            square[position[0]][position[1]] = 9
        }
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
        // console.log(`+++++++++++++++++++++++++++++++++++++`)
        // console.log(`+1的位置是（${x}, ${y}）`)
    
        if (x >= 0 && x < square[0].length && y >= 0 && y < square.length) {
            if (square[x][y] !== 9) {
                square[x][y] += 1
            }
        }
        // log(`^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^`)
    }
    const markedSquare = function(array) {
        //拷贝数组得到 square
        let square = clonedSquare(array)
    
        for (let x = 0; x < square.length; x++) {
            for(let y = 0; y < square.length; y++) {
                if (square[x][y] == 9) {
                    // 周围一共有8个方块
                    // 上面6个
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
    
    // console.log(res_arr)
    return res_arr
}





var map_len = 9
var bomb_number = 20
//生成二维的数组 , 地图
let square = makeMap(map_len, bomb_number)

// let square = JSON.parse(s)

const __main = function() {
    renderSquare(square)
    bindEventDelegate(square)
}

__main()
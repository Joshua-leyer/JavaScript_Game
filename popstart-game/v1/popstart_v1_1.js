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
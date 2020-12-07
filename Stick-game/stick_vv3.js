

var canvas = document.getElementById('stick-canvas');
var ctx = canvas.getContext('2d');

var canvas_heith = canvas.height
var canvas_width = canvas.width
//有点蛋疼，获取一下html部分的吧。或者最后把big_boll 也搞成canvas的

var big_boll_r = bigboll.style.height

console.log(big_boll_r)

// 移动canvas 的原点
const changeOriginPoint = () => {
    //设置cnavas中心点是原点
    let canvas_heith = canvas.height
    let canvas_width = canvas.width
    //就这一行代码就行了，相当于对于浏览器来说，吧canvas 进行css处理，移动了
    // → 和 ↓ 是正
    ctx.translate(canvas_width / 2, canvas_heith / 2)
    //我有种预感，其实这样处理不好.
}


const crossLine = () => {
    ctx.beginPath()

    ctx.moveTo(0, - canvas_heith / 2)
    ctx.lineTo(0, canvas_heith / 2)

    ctx.moveTo(- canvas_width / 2, 0)
    ctx.lineTo(canvas_width / 2, 0)
    ctx.stroke()
}
// 不知道为啥 这官网api 画个图 ,  需要 beginPath()
const rawArc = (x, y, radius, color) => {
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, 2*Math.PI)
    ctx.stroke()
}
//测试 画几个旋转的棒棒糖
const initStick = (number) => {
    changeOriginPoint()
    crossLine()
    let x = 100
    let y = 100
    let radius = 24
    let smill_line = 10
    rawArc(x, y, radius)
}

const refreshRotation = setInterval( () =>{
    ctx.save()
    ctx.rotate(10)
    ctx.restore()
    console.log(111)

}, 424)
//返回随机颜色
const getRandomColor = function(){

  return  '#' +

    (function(color){

    return (color +=  '0123456789abcdef'[Math.floor(Math.random()*16)])

      && (color.length == 6) ?  color : arguments.callee(color);

  })('');

}

const templateBoll = (id) => {
    //得到id 返回标签化的字符串
    let boll_color = getRandomColor()
    // console.log(`color is : ${boll_color},${id}`)
    let li_str = `
        <li class="boll" data-color="${boll_color}" data-id="${id}" 
            style="background-color:${boll_color}">
        </li>
    `
    return li_str
}


// (球数量) => 对html 操作，插入li
const initBoll = (number) => {

    let boll_sec = document.querySelector('.all-boll')

    for (let i = 0; i < number; i++) {
        boll_sec.innerHTML += templateBoll(i)
    }

}

const deletBoll = () => {
    let all_boll = document.querySelectorAll('.boll')
    // console.log(`删除的小球是:${all_boll[0].dataset.id}`)
    //总觉得这样删不好，应该根据id来删，每次id 增加 1
    all_boll[0].remove()
}

const bindClickEvent = () => {
    let map_bg = document.querySelector('#bg')


    //也可以直接　用id 名字 bg直接当做那个标签元素,不用获取也可以。

    map_bg.addEventListener('click', (event) => {
        deletBoll()
    })
}


//大球颜色跟踪小球颜色, 写个定时器
//也可以不用定时器，放在 点击函数里面也行 , 这样写就等于这个功能从所有东西里面独立出来了。
/** 
let followingColor = setInterval( () =>{ 
    let big_boll = document.querySelector('.big-circle')
    let first_boll = document.querySelectorAll('.boll')[0]


    if (first_boll != null) {
        let color = first_boll.getAttribute('data-color')
        big_boll.style.backgroundColor = color; 
    }
}, 424)
*/




function initGame() {
    let boll_number = 4
    initBoll(boll_number)

}

const __main = () => {
    initStick()
    initGame()
    bindClickEvent()
}

__main()
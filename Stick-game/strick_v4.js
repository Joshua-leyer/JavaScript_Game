var canvas = document.getElementById('stick-canvas');
var ctx = canvas.getContext('2d');

var canvas_heith = canvas.height
var canvas_width = canvas.width
//有点蛋疼，获取一下html部分的吧。或者最后把big_boll 也搞成canvas的

// ctx.rotate(45 * Math.PI / 180)
// ctx.fillRect(50, 50, 100, 100)


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
const initBolls = (number) => {

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


/* bullet子弹仓的位置处理 end */

function renderBackground() {
    // console.log( canvas_width, canvas_heith)
    canvas.height = canvas.height
    
    ctx.fillStyle = '#ffeb3b75'
    ctx.fillRect(0, 0, canvas_width, canvas_heith)
    ctx.translate(canvas.width / 2, canvas.height / 2)

    ctx.beginPath()
    ctx.fillStyle = '#ccc'
    ctx.arc(0, 0, 90, 0, 2*Math.PI)

    ctx.fill()
}


const getBallsColor = (index) => {
    let color_arr = ['#3eda8f', '#00bcd4', '#ffc107', '#7a4ec8', '#e91e63', '#e35ae1']
    index = index % color_arr.length
    return color_arr[index]
}
const drawArc = (index) => {
    // > 这里要处理一下,color不对应
    ctx.fillStyle = getBallsColor(index)
    ctx.beginPath();
    ctx.arc(0, 160, 24, 0, 2*Math.PI);
    ctx.fill();
}

const drawLine = () => {
    ctx.beginPath();
    ctx.lineWidth = 4;
    //设置笔触的颜色
    ctx.strokeStyle="#fff";
    //设置开始坐标
    ctx.moveTo(0, 90);
    //设置结束坐标
    ctx.lineTo(0, 134);
    //绘制线条
    ctx.stroke();
}

const fireBullet = (balls) => {
    balls.push(0)
    deletBoll()
    return balls
}


const judgmentGameOver = (balls) => {
    //深拷贝一下
    // let arr = []
    // for (let i = 0; i < balls.length; i++) {
    //     arr.push(balls[i])
    // }
    // 数组深拷贝的一种方法
    var [ ...arr ] = balls
    return arr.sort()
}

const gameOver = (balls) => {
    let arr = judgmentGameOver(balls)
    for (let i = 1; i < arr.length; i++) {
        // console.log(`第${i}个小球和第${i - 1}个小球的距离是`, Math.abs(balls[i] - balls[i - 1]))
        if (Math.abs(arr[i] - arr[i - 1]) < 17) {
            // console.log(`${arr[i]}和${arr[i - 1]}的距离是${Math.abs(arr[i] - arr[i - 1])}了`, 'gameover')
            clearInterval(timer)
        }
    }
}

const updateGame = () => {
    //渲染画布
    renderBackground()

    for (let i = 0; i <balls.length; i++) {
        ctx.save()
        ctx.rotate(balls[i] * Math.PI / 180)
        // console.log(`第${i + 1}个球的度数是`,balls[i])
        drawLine()
        drawArc(i)
        ctx.restore()

        balls[i] += speed
        if (balls[i] >= 360) {
            // 取模,就是让数字一直保持在360一下 , 看了一下log感觉还不对
            balls[i] = balls[i] % 360
        }
    }

    gameOver(balls)
}



var timer = setInterval(updateGame, 10)

const bindClickEvent = () => {
    let bg = document.querySelector('#bg')

    bg.addEventListener('click', (event) =>{
        fireBullet(balls)
    })
}
var bools_color_arr = []
var balls = [2, 20, 40, 180]
var speed = 1
var bullet_number = 8

function __main() {
    updateGame()
    initBolls(bullet_number)
    bindClickEvent()

}

__main()
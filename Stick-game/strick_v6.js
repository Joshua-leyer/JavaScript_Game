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
const initBullets = (number) => {
    let boll_sec = document.querySelector('.all-boll')
    for (let i = 0; i < number; i++) {
        boll_sec.innerHTML += templateBoll(i)
    }

}

const deletBoll = (msg, callback) => {
    let all_boll = document.querySelectorAll('.boll')
    // console.log(`删除的小球是:${all_boll[0].dataset.id}`)
    //总觉得这样删不好，应该根据id来删，每次id 增加 1

    //判断bullet 子弹的存在性
    if (all_boll[0]) {
        all_boll[0].remove()
        callback()
    }
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
    // let color_arr = ['#3eda8f', '#00bcd4', '#ffc107', '#7a4ec8', '#e91e63', '#e35ae1']

    index = index % balls_color_arr.length
    return balls_color_arr[index]
}

const drawArc = (index) => {
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

const fireBullet = () => {
    deletBoll('尝试用回调函数', function(){
        balls.push(0)
    })
}


const judgmentGameOver = (balls) => {

    // 数组深拷贝的一种方法
    var [ ...arr ] = balls
    //返回的时候给排序
    return arr.sort()
}



const gameOver = (balls) => {
    // 根据这个图 , 我没有用数字来计算判断是否game over ,先用图形上看的方式判定吧
    // 每个球的角度不能小于16度 , 也就是数组每一个值之间差距不能小于16 同样,我能也就能计算出一共能
    // 放几个球 360 % 16
    let arr = judgmentGameOver(balls)
    for (let i = 1; i < arr.length; i++) {
        // console.log(`第${i}个小球和第${i - 1}个小球的距离是`, Math.abs(balls[i] - balls[i - 1]))
        if (Math.abs(arr[i] - arr[i - 1]) < 17) {
            // console.log(`${arr[i]}和${arr[i - 1]}的距离是${Math.abs(arr[i] - arr[i - 1])}了`, 'gameover')
            clearInterval(timer)
            let bg = document.querySelector('#bg')
            bg.removeEventListener('click',fireBullet)
            // console.log('game over')
            return true
        }
    }
    return false
}


const gameSuccess = (balls) => {
    //我发现我居然不会判断游戏通关, 我不能之间判断,我只能利用集合的补集
    //就是我需要判断游戏没有输,而且子弹打完了。那我就是赢了。
    let all_boll = document.querySelectorAll('.boll')
    // bullets 区域肯定是先没有子弹才需要判断的

    if (all_boll.length === 0 && !gameOver(balls)) {

        let bg = document.querySelector('#bg')
        bg.removeEventListener('click',fireBullet)

        return true
    }

    return false
}

const gameStatus = (balls) => {
    if (gameOver(balls)) {
        console.log('game over')
    } else if (gameSuccess(balls)) {
        //相当于点了一下下一关
        //我最后添加一个弹窗这里用
        nextPass()
        console.log('done')
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
    // gameOver(balls)
    // gameSuccess()
    gameStatus(balls)
}





const bindClickEvent = () => {
    let bg = document.querySelector('#bg')
    bg.addEventListener('click', fireBullet)

    //change pass 功能 , 这次用id 当做变量
    // let next_pass = document.querySelector('#next')
    // let up_pass = document.querySelector('#up')
    // let restart = document.querySelector('#restart')
    next.addEventListener('click', nextPass)
    restart.addEventListener('click', restartPass)
    up.addEventListener('click', upPass)
}


const initDate = () => {
    //每次渲染以前, 清空以前的数据然后重新生成
    let boll_sec = document.querySelector('.all-boll')
    boll_sec.innerHTML = ""
    
    //渲染一下
    initBullets(bullets_numbers)
    //这个不知道放在那里好 , 就这里吧。这东西肯定有系统的训练的。我没找到这方面的资料
    let bg = document.querySelector('#bg')
    bg.addEventListener('click', fireBullet)
    // console.log('拿到的要渲染的数据是:子弹数量,上面的球的数量')
    // console.log(bullets_numbers, balls)

    for (let i = 0; i < balls.length; i++) {
        color = getRandomColor()
        balls_color_arr.push(color)
    }

    let li_color = document.querySelectorAll('.boll')

    for (let i = 0; i < li_color.length; i++) {
        let color = li_color[i].dataset.color
        balls_color_arr.push(color)
    }
}

const restartPass = () => {
    balls = []
    balls_color_arr = []
    makePassData(pass_number)
    initDate()
}


const upPass = () => {
    if (pass_number > 1) {
        pass_number -= 1
        balls = []
        balls_color_arr = []
        makePassData(pass_number)
        initDate()
    } else {
        console.log('没有上一关了')
    }

}
const nextPass = () => {
    //计算上一关的 number 
    // console.log('本关的数据', pass_data[pass_number])
    if (pass_number < pass_data.length) {
        pass_number += 1
        balls = []
        balls_color_arr = []
        makePassData(pass_number)
        initDate()
    } else {
        console.log('没有下一关了')
    }
}


// 每一组数组第一个都是子弹数 , 自己算了一下,总共最多能有21个球(极限)
const pass_data = [
    [8, 2, 30, 180],
    [6, 50, 80, 110, 130, 150],
    [4, 50, 90, 130, 155, 190, 260]
]

const makePassData = (pass_number) => {
    // console.log(pass_number)

    // 我这写的真的费劲,硬凑的,也不知道上哪里学更好的方法
    // 处理问题都是硬凑
    bullets_numbers = pass_data[pass_number - 1][0]
    balls = pass_data[pass_number - 1].slice(1,)
    // console.log(`第${pass_number}关的data :`)
    // console.log('已经显示的球是', balls)
    // console.log('子弹个数是',bullets_numbers)

}


var balls = []
var balls_color_arr = []
var bullets_numbers = 0
var speed = 1

var pass_number = 1
makePassData(pass_number)
var timer = setInterval(updateGame, 10)

function __main() {
    initDate()
    // updateGame()
    bindClickEvent()
}

__main()
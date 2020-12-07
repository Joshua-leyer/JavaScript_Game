var canvas = document.getElementById('stick-canvas');
var ctx = canvas.getContext('2d');

var canvas_heith = canvas.height
var canvas_width = canvas.width


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
        <li class="boll select" data-color="${boll_color}" data-id="${id}" 
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
    
    ctx.fillStyle = '#fbeae3'
    ctx.fillRect(0, 0, canvas_width, canvas_heith)
    ctx.translate(canvas.width / 2, canvas.height / 2)

    ctx.beginPath()
    ctx.fillStyle = '#f56161'
    ctx.arc(0, 0, 50, 0, 2*Math.PI)

    ctx.fill()
}

const getBallsColor = (index) => {

    index = index % balls_color_arr.length
    return balls_color_arr[index]
}



const drawArc = (index) => {
    // ctx.fillStyle = '#fff'
    ctx.fillStyle = getBallsColor(index)
    ctx.beginPath();
    //我给偏移了一下,这样感觉就好一些
    ctx.arc(0, 180, 14, 0, 2*Math.PI);
    ctx.fill();
}

const drawLine = () => {
    ctx.beginPath();
    ctx.lineWidth = 1;
    //设置笔触的颜色
    ctx.strokeStyle= "black";
    //设置开始坐标
    ctx.moveTo(0, 50);
    //设置结束坐标
    ctx.lineTo(0, 180);
    //绘制线条
    ctx.stroke();
}

const fireBullet = () => {
    deletBoll('尝试用回调函数', function(){
        balls.push(0)
        gameStatus(balls)
    })
}


const judgmentGameOver = (balls) => {

    // 数组深拷贝的一种方法
    var [ ...arr ] = balls
    //返回的时候给排序
    return arr.sort()
}



const gameOver = (balls) => {

    let arr = judgmentGameOver(balls)
    for (let i = 1; i <= arr.length; i++) {
        console.log(`第${i}个小球和第${i - 1}个小球的距离是`, Math.abs(balls[i] - balls[i - 1]))
        if (Math.abs(arr[i] - arr[i - 1]) < 9) {
            return true
        }
    }

    return false
}


const gameSuccess = (balls) => {
    let all_boll = document.querySelectorAll('.boll')
    // bullets 区域肯定是先没有子弹才需要判断的

    if (gameOver(balls) == false && all_boll.length === 0) {
        // console.log(balls)

        return true
        
    }
    return false
}

const textGameMsg = (msg) => {
    ctx.save()
    ctx.fillStyle = '#000'
    ctx.font = "60px Consolas"
    ctx.textAlign = 'center'
    ctx.textBaseline = "middle"
    ctx.fillText(msg, 0, 100)
    ctx.restore()
}

const showAlertText = (msg) => {
    let str = `
        <div class="alert select" data-msg="${msg}"> ${msg} </div>
    `
    //这里可能回头要加一个if ,只能加一个str , 不过这样写肯定不好。
    //这里原生js写太蛋疼,用jquery
    $('#bg').append(str)
}


const gameStatus = (balls) => {
    if (gameOver(balls)) {
        bg.removeEventListener('click', fireBullet)
        clearInterval(timer)
        showAlertText('try again')
    } else if (gameSuccess(balls)) {
        bg.removeEventListener('click', fireBullet)
        clearInterval(timer)
        showAlertText('下一关')
    }
}


const textPass = (number) => {
    ctx.save()
    ctx.fillStyle = '#fff'
    ctx.font = "84px Consolas"
    ctx.textAlign = 'center'
    ctx.textBaseline = "middle"
    ctx.fillText(number, 0, 5)
    ctx.restore()
}

const updateGame = () => {
    //渲染画布
    renderBackground()
    // 把 关数写在中间
    textPass(pass_number)

    //这是最核心的地方 ,这里没搞明白没办法旋转
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

}






const initDate = () => {
    makePassData(pass_number)

    let boll_sec = document.querySelector('.all-boll')
    boll_sec.innerHTML = ""
    
    //渲染一下
    initBullets(bullets_numbers)


    //render color
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

    // makePassData(pass_number)
    initDate()

    bg.addEventListener('click', fireBullet)

    clearInterval(timer)
    timer = setInterval(updateGame, 15)
    // if (typeof callback == 'function') {
    //     callback()
    // }
}


const upPass = () => {
    if (pass_number > 1) {
        pass_number -= 1
        restartPass()
    } 
}
const nextPass = () => {
    if (pass_number < pass_data.length) {
        pass_number += 1
        restartPass()
    }
}


// 每一组数组第一个都是子弹数 , 自己算了一下,总共最多能有21个球(极限)
const pass_data = [
    [4, 0, 90, 180],
    [5, 50, 80, 110, 130, 150],
    [6, 50, 90, 130, 155, 190, 260]
]

const makePassData = (pass_number) => {
    bullets_numbers = pass_data[pass_number - 1][0]
    balls = pass_data[pass_number - 1].slice(1,)
}

const bindClickEvent = () => {
    bg.addEventListener('click', fireBullet)
    next.addEventListener('click', nextPass)
    restart.addEventListener('click', restartPass)
    up.addEventListener('click', upPass)
    $('#bg').on('click', '.alert', function(event) {
        console.log(11)
        let self = event.target
        console.log(self.dataset.msg)
        if (self.dataset.msg == 'try again') {
            restartPass()
            //让自己消失
        } else if (self.dataset.msg == '下一关') {
            nextPass()
        }
        self.remove()
    })
}

var balls = []
var balls_color_arr = []
var bullets_numbers = 0
var speed = 1

var pass_number = 1


var timer = setInterval(updateGame, 15)
//不会用
// window.requestAnimationFrame(updateGame)
function __main() {
    initDate()
    bindClickEvent()
}

__main()
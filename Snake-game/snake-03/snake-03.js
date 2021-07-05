import { getInputDirection } from "./input-03.js"

export const SNAKE_SPEED = 4

const GRID_SIZE = 17

let snakeBody = [
    {x: 10, y: 12}
]

let newSegments = 0

/**
 * @核心处理身体位置信息的函数
 */
export function update() {
    //这样写才能实现吃一个加多个身体的功能效果.
    addSegments()
    const inputDirection = getInputDirection()
    for (let i = snakeBody.length - 2; i >= 0; i --) {
        snakeBody[i + 1] = { ...snakeBody[i] }
    }

    snakeBody[0].x += inputDirection.x
    snakeBody[0].y += inputDirection.y
}

export function draw(gameBoard) {
    snakeBody.forEach( (seg, index) => {
        const snakeElement = document.createElement('div')
        snakeElement.style.gridRowStart = seg.y
        snakeElement.style.gridColumnStart = seg.x
        snakeElement.classList.add('snake')
        if (index == 0) {
            snakeElement.classList.add('head')
        }
        gameBoard.appendChild(snakeElement)
    })

}

// 延长蛇身体
export function expandSnake(amount) {
    newSegments += amount
}

// 这里为什么要传递一个空对象当默认值, 第一个给了false不就是默认值吗？
export function onSnake(position , { ignoreHead = false } = {}) {
    return snakeBody.some( (segment, index) => {
        if (ignoreHead && index === 0) return false
        return equalPosition(segment, position)
    })
}

//判断 是否重叠 返回 boole 值
function equalPosition(pos1, pos2) {
    //这里没有判断 if pos2是null 会出现报错的问题.
    return pos1.x === pos2.x && pos1.y === pos2.y
}



function addSegments() {
    // 只是增加1个块块, 这里就可以不循环
    for (let i = 0; i < newSegments; i++ ) {
        snakeBody.push( { ...snakeBody[snakeBody.length -1] })
    }

    newSegments = 0
}


//判断出界
export function outsideGrid(position) {
    return (
      position.x < 1 || position.x > GRID_SIZE ||
      position.y < 1 || position.y > GRID_SIZE
    )
}

export function getSnakeHead() {
    return  snakeBody[0]
}


export function snakeIntersection() {
    return onSnake(snakeBody[0], { ignoreHead: true })
}

export function getsnakeLength() {
    console.log(snakeBody.length)
    return snakeBody.length - 1
}


import { getsnakeLength, SNAKE_SPEED, update as updateSnake, draw as drawSnake, outsideGrid,
        snakeIntersection, getSnakeHead } from './snake-03.js'
let lastRenderIime = 0
// const SNAKE_SPEED = 1

const GRID_SIZE = 17

let gameOver = false

import { update as updateFood, draw as drawFood } from './food.js'


const log = console.log
const gameBoard = document.getElementById('game-bg')


let bollNumber = getsnakeLength()

function main(currentTime) {

    if (gameOver) {
    //    return alert('game over')
       if (confirm(`我, 景峰鑫吃了${bollNumber}个屎`)) {
           return window.location.reload()
       }
       return
    }


    //不明白这里的工作原理, 为什么放在最上面也可以运行到下面的内容
    window.requestAnimationFrame(main)

    const secondsSinceLastRender = (currentTime - lastRenderIime ) / 1000

    if (secondsSinceLastRender < 1 / SNAKE_SPEED) return

    log('render')
    lastRenderIime = currentTime
    update()
    draw()

}

window.requestAnimationFrame(main)

function update() {
    updateSnake()
    updateFood()
    checkDeath()
}

function draw() {
    gameBoard.innerHTML = ''
    drawSnake(gameBoard)
    drawFood(gameBoard)
}


function checkDeath() {
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
}
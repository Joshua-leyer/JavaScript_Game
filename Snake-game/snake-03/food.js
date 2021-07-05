import { onSnake, expandSnake } from './snake-03.js'

const GRID_SIZE = 17

let food = getRoundomFoodPosition()

// 吃到后增加的数量
const EXPANSION_UNM = 1


export function update() {
    if ( onSnake(food) ) {
        expandSnake(EXPANSION_UNM)
        food = getRoundomFoodPosition()
    }
}

export function draw(gameBoard) {


    const foodElement = document.createElement('div')
    foodElement.style.gridRowStart = food.y
    foodElement.style.gridColumnStart = food.x
    foodElement.classList.add('food')
    gameBoard.appendChild(foodElement)

}



function getRoundomFoodPosition() {
    let newFoodPosition
    while (newFoodPosition == null || onSnake(newFoodPosition)) {
        newFoodPosition = randomGridPosition()
    }
    return newFoodPosition
}



function randomGridPosition() {
  return {
    x: Math.floor(Math.random() * GRID_SIZE) + 1,
    y: Math.floor(Math.random() * GRID_SIZE) + 1
  }
}


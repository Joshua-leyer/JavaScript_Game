let inputDirection = { x: 0, y: 0}

let lastInputDirection = {x: 0, y: 0}

window.addEventListener('keydown', e =>{
    switch (e.key) {
        case "w":  
            //这里的写法太聪明了..
            if (lastInputDirection.y !== 0) break
            // if( e.key == 'w') return
            inputDirection = {x: 0, y: -1}
            break
        case 's':
            if (lastInputDirection.y !== 0) break
            inputDirection = {x: 0, y: 1}
            break
        case 'a':
            if (lastInputDirection.x !== 0) break
            inputDirection = {x: -1, y: 0}
            break
        case 'd':
            if (lastInputDirection.x !== 0) break
            inputDirection = {x: 1, y: 0}
            break
    }
})

console.log('enter input function')


export function getInputDirection() {
    lastInputDirection = inputDirection
    return inputDirection
}
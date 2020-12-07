const appendHtml = function(element, html) {
    element.innerHTML += html
}

const append = function(selector, html) {

    let element = document.querySelectorAll(selector)

    for (let i = 0; i < element.length; i++) {
        element[i] = appendHtml(element[i], html)
    }
}


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
        <li class="boll" data-color="${boll_color} data-id="${id}"></li>
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

    console.log(map_bg, bg)
    //也可以直接　用id 名字 bg直接当做那个标签元素,不用获取也可以。

    map_bg.addEventListener('click', (event) => {
        deletBoll()
    })
}

function initGame() {
    let boll_number = 4
    initBoll(boll_number)

}

const __main = () => {
    initGame()
    bindClickEvent()
}

__main()
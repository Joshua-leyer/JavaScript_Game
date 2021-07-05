Snake-01.html 文件就是最后的成果,  02是本来想修改点东西。最后没搞。


css网格布局.

snake-03.html 

css单位

backgroun-color: hsl()


requestAnimationFrame

href: https://www.w3cplus.com/javascript/requestAnimationFrame.html

?? 我不是很明白他这个函数不是无限调用自己吗？ 

```js

我在这里最后面 log了一下,本以为他 在执行到倒数第二行就会重新执行自己,相当于log那一行没有被执行到, 可实际上, 却执行了. 搞得我没看懂




function main(currentTime) {
    const secondsSinceLastRender = (currentTime - lastRenderIime ) / 1000
    window.requestAnimationFrame(main)
    log('?')
}

window.requestAnimationFrame(main)

```


然后我这样写

```js 
function main(currentTime) {
    let getMyTime = new Date()
    let oneTime = getMyTime.getTime()
    window.requestAnimationFrame(main)

    let twoTime = getMyTime.getTime()
    log(oneTime, twoTime)
}

window.requestAnimationFrame(main)

```

发现每次输出的毫秒数值是一样的, 





```js

这里传递来了一个参数, 最后在官网一句话找到了怎么来的
参数
callback
下一次重绘之前更新动画帧所调用的函数(即上面所说的回调函数)。该回调函数会被传入DOMHighResTimeStamp参数，该参数与performance.now()的返回值相同，它表示requestAnimationFrame() 开始去执行回调函数的时刻。

function main(currentTime) {
    log(currentTime, lastRenderIime)
    const secondsSinceLastRender = (currentTime - lastRenderIime ) / 1000

    if (secondsSinceLastRender < 1 / SNAKE_SPEED) return

    log('render')
    lastRenderIime = currentTime
    update()
    draw()

    window.requestAnimationFrame(main)
}
```




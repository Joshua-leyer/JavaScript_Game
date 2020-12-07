# 清除画布的方法

    方法2: 
     这个方法是 , 类似直接重新定义了画布一样
     所以，如果画布本身就有一些背景样式之类的也会被弄没有
     .所以自己想着弄一个函数当做刷新“空白”背景
     canvas.height = canvas.height
```

    function clearCanvas ()  {

        canvas.height = canvas.height

        ctx.fillStyle = '#ffeb3b75'
        ctx.fillRect(0, 0, canvas_width, canvas_heith)
        
    }

```

# 基础图形参数
    arc(x, y, radius, startAngle, endAngle, anticlockwise)


    ctx.fill();

    ctx.stroke();
# 旋转 的code 
    ctx.rotate(20 * Math.PI/180);

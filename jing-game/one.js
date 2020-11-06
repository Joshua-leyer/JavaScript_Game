window.onload = function() {

    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    
    var box = 100
    let height = 300
    let width = 300

    //MD ，，不会存坐标数组。不知道咋存的。
    // let rec_arr = []
    // var one_rec = []
    // var rec_x = 0
    // var rec_y = 0
    // for (let i = 0; i < 9; i++) {
    //     for (let j = 0; j < 2; j ++) {
    //         rec_arr[i][j].push()
    //         one_rec = [rec_x, rec_y]
    //         rec_arr.push(one_rec)
    //     }
    // }
    // console.log(rec_arr)

    let a = []
    b = [1, 3]
    console.log(a.push(b))


    const fill_blue = function(x_pos, y_pos) {
        var mlen = 30
        for (let i = -1; i < 2; i += 2) {
            var head_x = x_pos + (mlen * i)
            var head_y = y_pos + (mlen * i)
            var end_x = x_pos - (mlen * i)
            var end_y = y_pos - (mlen* i)
            //i 是 -1 和 1
            console.log(`第${i}循环`)
            ctx.beginPath();

            console.log(`head(${head_x},${head_y})`)
            ctx.moveTo(head_x, head_y);

            console.log(`end(${end_x},${end_y})`)
            ctx.lineTo(end_x, end_y);
            console.log(x_pos, y_pos)
            ctx.stroke();
        }
        
    }
    fill_blue(50, 50)

    const fill_line = function(width, height) {
        var x = 0
        var y = 0
        for (y = 100; y < 400; y += 100) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            // console.log(`坐标是${x},${y}`)
            ctx.lineTo(x + width, y);
            ctx.stroke();
        }
        // console.log(`x的值${x}`)
        y = 0
        for (x = 100; x < 400; x += 100) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x, y + height)
            ctx.stroke();
        }
    
    }
    fill_line(width, height)




}



// setInterval(function(){
//     ctx.clearRect(0,0,ground.width,ground.height);  
//     // ctx.fillStyle = "rgb(200,0,0,0.8)";
//     snake.update();
//     snake.draw();
//     fruit.draw();
//     if(snake.eat(fruit)){
//        fruit.pickLocation();
//     }
//  },300);
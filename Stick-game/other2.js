window.onload=function(){
	//canvas
	var cans=document.getElementById("myCanvas");
	//弹出框
	var cover=document.getElementById("cover");
	var showResult=document.getElementById("showResult");
	var button=document.getElementById("button");
	var can=cans.getContext("2d");
	//获取当前是第几关,存到本地,,每关都刷新页面重新加载
	var checkPoint=JSON.parse(localStorage.getItem("num"));
	if(checkPoint){
		checkPoint=checkPoint;
	}else{
		checkPoint=1;
	}
	//总共几关的简单配置,默认转动小球数,等待点击的小球数,还有显示第几关
	var pass=[
		[3,5,1],
		[3,7,2],
		[4,7,3],
		[4,9,4],
		[5,9,5],
		[5,11,6],
		[6,11,7],
		[6,12,8],
	]
	//大院的中心点
	var x=200;
	var y=200;
	//每次转动的速度(角度)
	var speed=1;
	//小球的半径
    var smallPi=15;
    

	//调动小球转动
	var run;
	//转动小球数组
	var balls=[];
	//等待小球数组
	var waits=[];
	//用来存放第几关
	var showPass;
	var mark=true;
	//根据当前第几关配置
	if(checkPoint){
		//默认的显示转动小球的个数和角度
		for(var i=0;i<pass[checkPoint-1][0];i++){
      console.log(360/pass[checkPoint-1][0]*i);
			balls.push({
				deg:360/pass[checkPoint-1][0]*i,   //平均分三份
				num:""
			});
		}
		//等待小球的数量和文本
		for(var i=pass[checkPoint-1][1];i>0;i--){
			waits.push(
				{
					deg:"",
					num:i
				}
			);
		}
		//大球第几关的显示文本
		showPass=pass[checkPoint-1][2];
	}
	//设置中心点
	can.translate(x,y);
	//画大球
	function bigRound(){
		can.save();
		can.beginPath();
		can.fillStyle="white";
		can.arc(0,0,25,0,2*Math.PI);
		can.fill();
		can.closePath();
		can.stroke();
		can.font="25px 微软雅黑";
		can.fillStyle="black";
		can.fillText(showPass,-6,10);
		can.restore();
	}
	//画转动小球
	function createSmallRound(){
		can.clearRect(-180,-150,cans.width,300);
		bigRound();
		can.save();
		for(var i=0;i<balls.length;i++){
			can.save();
        // console.log(balls[i]);
			can.rotate(balls[i].deg*Math.PI/180);
 
			balls[i].deg=balls[i].deg+1;
			if(balls[i].deg>=360){
				balls[i].deg=0;
			}
 
      	//绘制转动杆子上
			can.beginPath();
			can.lineWidth=5;
			can.strokeStyle="white";
			can.fillStyle="white";
			can.moveTo(25,0);
			can.lineTo(125,0);
			can.fill();
			can.closePath();
			can.stroke();
      //绘制转动杆子上的 ball
			can.beginPath();
			can.fillStyle="white";
			can.arc(125,0,smallPi,0,2*Math.PI);
			can.fill();
			can.closePath();
			can.stroke();
      //小球上的字
			can.font="20px 微软雅黑";
			can.fillStyle="black";
			can.fillText(balls[i].num,115,8)
			can.restore();
		}
		can.restore();
		//重复转动
    run = window.requestAnimationFrame(createSmallRound);
	}
	createSmallRound();
	//等待小球
	  function waitRound(){
	   		can.clearRect(-180,150,cans.width,350);
	   		can.save();
	   		for(var i=0;i<waits.length;i++){
	   			can.beginPath();
	   			can.fillStyle="white";
	   			can.arc(0, 150+(smallPi*2)*(waits[i].num+1), smallPi, 0, 2*Math.PI);
	   			can.fill();
	   			can.closePath();
	   			can.stroke();
 
				can.font="20px 微软雅黑";
				can.fillStyle="black";
				can.fillText(waits[waits.length-1-i].num,-9,157+(smallPi*2)*(waits[i].num+1));
	   			can.restore();
	   		}
	   }
		waitRound();
	//点击事件
	cans.onclick=function(){
    //判断剩余口红的数量
		if(waits.length!= ""){
			//等待小球删除第一个小球记录,添加到转动小球数组
			var ball=waits.shift();
 
			ball.deg=90;
      console.log(balls);
			//添加的小球从90度添加,判断是否与转动的小球角度有重合
			for(var i=0;i<balls.length;i++){
				//如果角度重合则游戏失败
				if(balls[i].deg>74 && balls[i].deg<106){
					cans.onclick=null;
					mark=false;
					setTimeout(function(){
						cover.style.display="block";
						showResult.innerText="闯关失败";
						button.innerText="重新来";
						cancelAnimationFrame(run);
						button.onclick=function(){
							clicks(0);
							cover.style.display="none";
							location.reload();
						}
						return;
					},100)
				}
			}
			//角度没有重合的,正常添加到转到小球
			balls.push(ball);
			waitRound();
			//等待为0时,游戏成功进去入下一关
			if(waits.length==0 && mark==true){
				setTimeout(function(){
					cover.style.display="block";
					if(checkPoint==pass.length){
						showResult.innerText="恭喜通过全关";
						button.innerText="第一关";
						button.onclick=function(){
							var lengths=pass.length-1;
							clicks(-7);
							cover.style.display="none";
							location.reload();
						}
					}else{
						showResult.innerText="闯关成功";
						button.innerText="下一关";
						button.onclick=function(){
							clicks(1);
							cover.style.display="none";
							location.reload();
						}
					}
					cancelAnimationFrame(run);
				},500)
			}
		}
	}
	//弹出框的点击按钮会对游戏成功或失败判断存储对应的游戏关数到本地,页面刷新时会获取使用
	function clicks(num){
		checkPoint+=num;
		localStorage.setItem("num",JSON.stringify(checkPoint));
	}
}

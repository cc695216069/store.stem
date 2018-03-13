// 跨域请求
function callbackfn(data){
	for(var i in data){
		var name=data[i].name
		// console.log(name)
		var url=data[i].url
		// console.log(url)
		var game=data[i].gameId;
		var isSale=data[i].isSale;
		var discount=data[i].discount;
		var originPrice=data[i].originPrice;
		var price=data[i].price;
		var imgUrl=data[i].imgUrl;

		var platform=data[i].platform;
		var date=data[i].date;
		var evaluate=data[i].evaluate;
		var label=data[i].label;
		var newBOx=$(".box").eq(0).clone();
		$(".box").eq(0).css({
			display:"none"
		})
		newBOx.show()
		newBOx.find(".gameName").html(name);
		for(var j in imgUrl){
			newBOx.find(".picture img").eq(j).attr("src",data[i].imgUrl[j])
		}
		newBOx.appendTo(".one")
		$(".lunbo").eq(0).find(".bigBox.one .box").mouseenter(function(){
			var $imgImgList = $(this).find(".img img")	//找到中间的大图片
			var $pickureImgList = $(this).find(".picture a")	//找到右侧的小图片
			$pickureImgList.mouseenter(function(){
				var p = $(this).index()
				$imgImgList.closest(".img").css({background:"none"})
				$imgImgList.hide()
				for(var a=0; a<$imgImgList.length;a++){
					$imgImgList.eq(a).stop()
				}
				$imgImgList.eq(p).fadeIn()
			})
			$pickureImgList.mouseleave(function(){
				$imgImgList.hide()
				$imgImgList.closest(".img").css({background:""})
			})
		})
	}
}
window.onload=function(){
	// 创建script
	var script=document.createElement("script")
	// 设置src属性
	script.setAttribute("src","http://192.168.1.100:81?callback=callbackfn");
	// 插入页面
	document.getElementsByTagName('head')[0].appendChild(script);
}



// 之前写的
// active侧边栏加小图片
for(var a=0;a<$(".activeText").find("i").length;a++){
	$(".activeText").find("i")[a].style.backgroundPosition = -16*a+"px"+" 0px"
}

// 初始化轮播图
$(".lunbo").find(".bigBox .box").hide()//隐藏所有的,boxList

for(var a=0;a<$(".lunbo").length;a++){
	var $cont = $(".lunbo").eq(a).find(".bigBox .box").length
	//初始化span点击小方块
	for(var b=0;b<$cont;b++){
		var $createSpan = $("<span></span>")//创建
		$createSpan.attr("index",b)	//设置非法属性
		$createSpan.appendTo($(".lunbo").eq(a).find(".dot"))
	}
	$(".lunbo").eq(a).find(".dot span").eq(0).addClass("focus")
	$(".lunbo").eq(a).find(".bigBox .box").eq(0).show()//默认显示box
}

//寻找当前的元素
function seekElement(point){
	$lunbo = $(point).closest(".lunbo")//找到当前的父级lunbo
	$boxList = $lunbo.find(".bigBox .box")//找到当前的boxList集合
	$dotList = $lunbo.find(".dot span")//找到当前的$squareList集合
}

// 向右点击的代码段
function rightCode(){
	for(var a=0;a<$boxList.length;a++){
		if($boxList[a].style.display == "block"){
			$boxList.eq(a).hide()
			$dotList.eq(a).removeClass("focus")
			$boxList.eq(a+1).fadeIn()
			$dotList.eq(a+1).addClass("focus")
			if(a == $boxList.length-1){
				$boxList.eq(0).fadeIn()
				$dotList.eq(0).addClass("focus")
			}
			return;
		}
	}
}

$(".arrowsRight").click(function(){
	seekElement(this)
	rightCode()
})

$(".arrowsLeft").click(function(){
	seekElement(this)
	for(var a=0;a<$boxList.length;a++){
		if($boxList[a].style.display == "block"){
			$boxList.eq(a).hide()
			$dotList.eq(a).removeClass("focus")
			$boxList.eq(a-1).fadeIn()
			$dotList.eq(a-1).addClass("focus")
			if(a == 0){
				$boxList.eq($boxList.length-1).fadeIn()
				$dotList.eq($boxList.length-1).addClass("focus")
			}
			return;
		}
	}
})

// squareList点击事件
$(".lunbo").find(".dot span").click(function(){
	seekElement(this)
	var n = $(this).index()
	$boxList.hide()
	$dotList.removeClass("focus")
	$boxList.eq(n).fadeIn()
	$dotList.eq(n).addClass("focus")
})

// 第一个大盒子自动播放
function autoPlay(){
	play = setInterval(function(){
		$boxList = $(".lunbo").eq(0).find(".bigBox .box")//找到第一个轮播图的$boxList集合
		$dotList = $(".lunbo").eq(0).find(".dot span")//找到第一个轮播图的$squareList集合
		rightCode()
	},3000)
}
autoPlay()
$(".lunbo").eq(0).mouseenter(function(){
	clearInterval(play)
})
$(".lunbo").eq(0).mouseleave(function(){
	autoPlay()	
})

// 第一个轮播图右边的小图片，鼠标移上主要核心
$(".lunbo").eq(0).find(".bigBox.one .box").mouseenter(function(){
	var $imgImgList = $(this).find(".img img")	//找到中间的大图片
	var $pickureImgList = $(this).find(".picture a")	//找到右侧的小图片
	$pickureImgList.mouseenter(function(){
		var p = $(this).index()
		$imgImgList.closest(".img").css({background:"none"})
		$imgImgList.hide()
		//动画队列问题，JQuery内部提供了停止动画队列的方法 “ stop() ”
		//问题描述：不停地快速划过$somalList并且停止时，之前的动画尚未执行完成，隐藏无效，会多出现几个你不想让他出现的怪东西
		for(var a=0; a<$imgImgList.length;a++){
			$imgImgList.eq(a).stop()
		}
		$imgImgList.eq(p).fadeIn()
	})
	$pickureImgList.mouseleave(function(){
		$imgImgList.hide()
		$imgImgList.closest(".img").css({background:""})
	})
})


//鼠标移上出现弹框  代码段
// age3: 鼠标要经过的对象集合
// age4: 要显示的区块名(String)
// age5: 现实的区块里面的要自动播放的图片集合(string)
function  revealPopover(age3,age4,age5){
	var x=0;
	age3.mouseenter(function(){
		//让右边section小区块显示
		$(this).find(age4).fadeIn()
		//获取四张图片
		var $fourList = $(this).find(age4).find(age5)
		//小图片计时器，永不停息
		somalImg = setInterval(function(){
			$fourList.hide()
			if(x==$fourList.length-1){
				x = 0
			}else{
				x++
			}
			$fourList.eq(x).fadeIn(200)
		},2000)
	})
}
//鼠标离开隐藏弹框  代码段
// age3: 鼠标要经过的对象集合
// age4: 要显示的区块名(String)
function  concealPopover(age3,age4){
	age3.mouseleave(function(){
		$(this).find(age4).fadeOut(300)
		$(this).mouseleave(function(){
			$(this).find(age4).fadeOut()
		})
		clearInterval(somalImg)
	})
}

$pass = $(".lunbo .bigBox .box").find(".section").parent()
$section = $pass.find(".section")
$fourList = $section.find(".four img")
revealPopover($pass,$section,$fourList)
concealPopover($pass,$section)


//*******************选项卡   新品与热门商品************************

var $obtain = $(".tabs .option span")
var $zhuTiFour = $(".tabs .zhuTiFour")

// 初始化选项卡
$obtain.eq(0).addClass("obtain")
$zhuTiFour.hide()
$zhuTiFour.find(".youList").hide()

$zhuTiFour.eq(0).show()
$zhuTiFour.eq(0).find(".youList").eq(0).show()
$zhuTiFour.eq(0).find(".somalList").eq(0).addClass("hove")

$obtain.click(function(){
	$zhuTiFour.hide()

	$obtain.removeClass("obtain")
	$(this).addClass("obtain")
	var q = $(this).index()
	$zhuTiFour.eq(q).show()
	$zhuTiFour.eq(q).find(".somalList").eq(0).addClass("hove")//显示第一个somalList
	$zhuTiFour.eq(q).find(".youList").eq(0).show()//显示第一个youList
})

$(".somalList").mouseenter(function(){
	var $somalList = $(this).closest(".zhuTiFour").find(".somalList")
	var $youList = $(this).closest(".zhuTiFour").find(".youList")
	$somalList.removeClass("hove")
	$youList.hide()
	for(var a=0;a<$youList.length;a++){
		$youList.stop()
	}
	var q = $(this).index()
	$somalList.eq(q).addClass("hove")
	$youList.eq(q).fadeIn()
})




//************************详情页***************************

//初始化.bigimgs img
// $(".bigimgs img").hide()
// $(".bigimgs img").eq(0).show()
// $(".somalboximg").eq(0).find("i").addClass("baiBian")

// var allsomalimgsWidth = parseInt($(".allsomalimgs").width())
// var sliderWidth =  parseInt($(".huakuai").closest(".sliderAction").width())
// var huakuaiWidth = parseInt($(".huakuai").width())

// var adv = {}
// adv.count = $(".somalboximg").length
// adv.m = 0;//记录当前显示的张数
// adv.n = 0;//记录可视视图里面的最左边的张数的下标

// function xianshi(obj){
// 	$(".bigimgs img").hide()
// 	$(obj).closest(".leftcol").find(".somalimgs i").removeClass("baiBian")
// 	$(obj).closest(".leftcol").find(".somalimgs i").eq(adv.m).addClass("baiBian")
// 	$(obj).closest(".leftcol").find(".bigimgs img").eq(adv.m).fadeIn()
// }
// $(".sliderRight").click(function(){
// 	++adv.m
// 	var _this = this
// 	if(adv.m == adv.count){
// 		adv.m = 0
// 		moveView()
// 	}
// 	if(adv.m == adv.n+5){
// 		moveView()
// 	}
	
// 	xianshi(_this)
// })

// $(".sliderLeft").click(function(){
// 	var _this = this
// 	--adv.m
// 	if(adv.m == -1){
// 		adv.m = adv.count-1
// 		moveView()
// 	}
// 	if(adv.m < adv.count-5 && adv.m>=5){
// 		moveView()
// 	}
// 	if(adv.m==4){
// 		$(".allsomalimgs").animate({
// 			"marginLeft": 0
// 		});
// 		$(".huakuai").animate({
// 			left : 0 + "px"
// 		})
// 	}
// 	xianshi(_this)
// })

// function moveView(newIndex){
// 	adv.n = newIndex || adv.m;
// 	var r = adv.count - adv.m;
// 	if(r > 5){
// 		$(".allsomalimgs").animate({
// 			"marginLeft":-(adv.m) * 120
// 		});

// 		percent = (adv.m * 120 /(allsomalimgsWidth-600))
// 		$(".huakuai").animate({
// 			left : Math.round((sliderWidth-huakuaiWidth)*percent) + "px"
// 		})
// 	}
// 	else{
// 		if(adv.n !== adv.count - 5){
// 			$(".allsomalimgs").animate({
// 				"marginLeft":-(adv.count - 5) * 120 
// 			});

// 			percent = ((adv.count - 5) * 120 / (allsomalimgsWidth-600))

// 			$(".huakuai").animate({
// 				left : Math.round((sliderWidth-huakuaiWidth)*percent) + "px"
// 			})
// 		}
// 	}
// }
// //当前要显示的
// function reveal(){
// 	$(".somalboximg i").removeClass("baiBian")
// 	$(".bigimgs img").hide()
// 	$(".bigimgs img").eq(adv.m).show()
// 	$(".somalboximg").eq(adv.m).find("i").addClass("baiBian")
// }

// $(".somalboximg").click(function(){
// 	//  site 切换前,白边的位置
// 	site = $(".baiBian").closest(".somalboximg").index()
// 	nextImg = $(this).nextAll().length//后面剩余的张数
// 	prevImg = $(this).prevAll().length//前面剩余的张数
// 	adv.m = $(this).index()//当前要去的张数
// 	reveal()//当前要显示的
// 	//去白边的后面
// 	if(adv.m>site){
// 		if(adv.m%4 == 0){
// 			onclckeMoveBox()
// 		}
// 	}
// 	//去白边的前面	
// 	if(adv.m<site){
// 		for(var a=0;a<adv.count;a++){

// 			if(adv.m == ((adv.cont-1)-4*a)){
// 				if(prevImg >5){
// 					$(".allsomalimgs").animate({
// 						"marginLeft": -adv.m*120 + "px"
// 					});
// 				}
// 			}
			
// 		}
// 	}
// })

// //点击图片盒子移动的逻辑
// function onclckeMoveBox(){
// 	// console.log(nextImg)
// 	if(nextImg > 5){
// 		$(".allsomalimgs").animate({
// 			"marginLeft": -adv.m*120 + "px"
// 		});
// 	}

// 	if(nextImg < 5){
// 		$(".allsomalimgs").animate({
// 			"marginLeft": -(adv.count-5)*120 + "px"
// 		});
// 	}

// }
// //滑块逻辑段
// $(".huakuai")[0].onmousedown = function(event){
// 	var downX = event.clientX
// 	distanceLeft = downX - parseInt(this.style.left)//left间距

// 	$("body")[0].onselectstart = function(){return false}
// 	var _this = this
// 	window.onmousemove = function(event){
// 		movex = event.clientX
// 		_this.style.left = movex - distanceLeft + "px"
// 		//边缘检测				
// 		if(parseInt(_this.style.left)<0){
// 			_this.style.left = 0 + "px"
// 		}
// 		if(parseInt(_this.style.left)>sliderWidth - huakuaiWidth){
// 			_this.style.left = sliderWidth - huakuaiWidth + "px"
// 		}
// 		//百分比
// 		percent = parseInt(_this.style.left)/(sliderWidth-huakuaiWidth)
// 		// left值
// 		$(".allsomalimgs")[0].style.left = - Math.round((allsomalimgsWidth-600) * percent) + "px"
// 	}

// 	window.onmouseup = function(event){
// 		movex = event.clientX
// 		distanceLeft = movex - parseInt(_this.style.left)//left间距
// 		_this.style.left = movex - distanceLeft + "px"
// 		window.onmousemove = null
// 		$(".huakuai")[0].onmouseleave = function(){
// 			$("body")[0].onselectstart = function(){return}
// 		}
// 	}

// }





// $(".chanpinThree").css({
// 	width:205 * $(".threeBox").length
// })

// var chanpin = 0



// $(".sliderRight").click(function(){
// 	var ThreeWidth =  $(this).closest(".kuai").find(".chanpinThree").width()
// 	var threeBoxlength = $(this).closest(".kuai").find(".threeBox").length-1
// 	var chanpinLeft = parseInt($(".chanpinThree")[0].style.marginLeft)
// 	console.log(chanpin++)

// 	if(threeBoxlength-chanpin <2){
// 		chanpin = 0
// 	}
// 	$(".chanpinThree").animate({
// 		marginLeft : -chanpin*205
// 		// $(".huakuai")[1].style.left = 
// 		// parseInt($(".sliderAction").width()) 

// 	})
// 	console.log(parseInt($(".chanpinThree")[0].style.marginLeft)/(ThreeWidth-616))
// 	// console.log(Math.round(parseInt($(".chanpinThree")[0].style.marginLeft)/ThreeWidth))





// })

// $(".sliderLeft").click(function(){
// })

// $(".huakuai")[2].onmousedown = function(event){

// }






















//点击选择语言区域的对号事件
$(".languageTable td").click(function(){
	$(this).find("img").toggleClass("duihao")	
})


//点击评论区域 XX 的事件
$(".chacha").click(function(){
	$(this).remove()
})


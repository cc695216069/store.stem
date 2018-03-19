//1. 用insertAfter方法向一个元素后面插入元素
function insertAfter(newElement,targetElement){
    var parent = targetElement.parentNode;
    // 如果最后的节点是目标元素，则直接添加
    if(parent.lastChild == targetElement){
        parent.appendChild(newElement)
    }else{
        //如果不是，则插入在目标元素的下一个兄弟节点 的前面
        parent.insertBefore(newElement,targetElement.nextSibling)
    }
}
//2.为nodelist绑定事件
function bindEvent(nodelist,eventType,fn){
	// 所传参数为两个的情况
	if(arguments.length==2){
		fn=arguments[1];
		eventType="onclick";
	}
	// 所传参数为三的情况
	for(var i=0;i<nodelist.length;i++){
		nodelist[i][eventType]=fn;	
	}
}
//3. 选择器的选择
function getObj(selector){
	// 选择器为id
	if(selector[0]=="#"){
		var str=selector.slice(1);
		return document.getElementById(str);
	}
	// 选择器为类选择器
	if(selector[0]=="."){
		var str=selector.slice(1);
		return document.getElementsByClassName(str);
	}
	// 选择器为标签选择器
	if(selector[0]!=="#"&&selector[0]!=="."){
		return document.getElementsByTagName(selector);
	}
}

//4.该函数返回 随机十六进制颜色值(无需传入参数)
function setColor(){
	var colorArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "a", "b", "c", "d", "e", "f"];
	var col = "#"
	for(var i = 0 ; i < 6 ; i++){
		var s = Math.floor(Math.random()*16);
		col += colorArr[s];
	}
	return col;
}
// 5.找到距离他最近的下一个兄弟元素节点 (传入参数 1.node节点(object))
function nextBrotherNode(node){
	while(node.nextSibling.nodeType!=1){
		node = node.nextSibling
		if(node.nextSibling.nodeType==1){
			return node.nextSibling
		}
	}
}
// 6.找到该节点里面的所有子元素节点 传入参数(1.node节点(object))
function sunchild(node){
	for(var a=0;a<node.childNodes.length;a++){
		if(node.childNodes[a].nodeType==1){
			console.log(node.childNodes[a])
		}
	}
}
// 7.遮罩(弹出层)的封装
 //函数接受三个参数  
  //1.弹出层的宽(类型：number)
  //2.弹出层的高(类型：number)
  //3.点击弹出层的 确定 要干的事(类型：function)
  //ps:点击弹出层的 取消 不干任何事 无需传入函数
  // function poup(pw,ph,Y){
  //   //创建遮罩层并插入
  //   var body = document.getElementsByTagName("body")[0];
  //   var mask = document.createElement("div");
  //   body.appendChild(mask);
  //   //设置遮罩层样式
  //   mask.style.width = body.offsetWidth + "px";
  //   mask.style.height = body.offsetHeight + "px";
  //   mask.style.position = "absolute";
  //   mask.style.top = 0;
  //   mask.style.left = 0;
  //   mask.style.background = "rgba(0,0,0,.3)";
  //   //创建弹出层并插入
  //   var poup = document.createElement("div");
  //   body.appendChild(poup);
  //   //设置弹出层样式
  //   poup.style.width = pw + "px";
  //   poup.style.height = ph + "px";
  //   poup.style.position = "absolute";
  //   poup.style.top = (document.documentElement.clientHeight - poup.offsetHeight) / 2 + document.documentElement.scrollTop + "px";
  //   poup.style.left = (document.documentElement.clientWidth - poup.offsetWidth) / 2 + "px";
  //   poup.style.backgroundColor = "#fff";
  //   //创建弹出层中的按钮并插入
  //   var assure = document.createElement("button");
  //   var cancel = document.createElement("button");
  //   poup.appendChild(assure);
  //   poup.appendChild(cancel);
  //   //设置弹出层按钮样式
  //   assure.innerHTML = "确定";
  //   assure.style.marginRight = "10px";
  //   assure.style.backgroundColor = "blue";
  //   cancel.innerHTML = "取消";
  //   cancel.style.backgroundColor = "red";

  //   //点击 确定 要干的事
  //   assure.onclick = function(){
  //     Y();
  //     body.removeChild(poup);
  //     body.removeChild(mask);
  //   }
  //   //点击 取消 要干的事就是 删除 遮罩层与弹出层 无需任何操作(无需传参)
  //   cancel.onclick = function(){
  //     body.removeChild(poup);
  //     body.removeChild(mask);
  //   }
  // }
  //  // 举例
  //  poup(300,100,function(){
  //           tbody.removeChild(_this.parentNode.parentNode);
  //  })
   /*cookie的一系列操作*/
	//一. cookie的获取
	function getCookie(queryStr){
		var str=document.cookie;
		// 1.获取到要找的属性在字符串中的起始位startIndex
		var startIndex=str.indexOf(queryStr);
		// 2.获取到要找的属性所对应的属性值在字符串中的终止位置endIndex
		var endIndex=str.indexOf(";",startIndex);
		// 获取最后一条cookie
		if(endIndex==-1){
			endIndex=str.length;
		}
		// 3.从起始位startIndex，截取到终止位endIndex
		Str=str.slice(startIndex,endIndex);
		// 4.以=为切割点，将第三步截取到的字符串切割为长度2的数组，数组下标[1]就是寻找属性对应的属性值.
		result=Str.split("=")[1];
		return result;
	}
	// 二.cookie的设置
	function setCookie(obj,date){
		var d=new Date();
		d.setDate(d.getDate()+date)
		// console.log(d)
		for(var i in obj){
			document.cookie=i+"="+obj[i]+";expires="+d;
		}
	}
	// 三.cookie的删除
	function removeCookie(shuxingming){
  		var d = new Date();
  		d.setDate(d.getDate() - 1);
  		document.cookie = shuxingming + "=1;expires=" + d;
	}

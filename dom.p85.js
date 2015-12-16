//函数的名字应该能够描述用途
function showPic(whichpic)
{
	//whichpic 代表一个元素节点 其实就是指向某个图片的<a>元素
	//还需要分解出这个元素的图片文件路径 href
	//存入source
	//检查是否存在id=placeholder的节点
	if(!document.getElementById("placeholder"))
	{
		return false;
	}
	var source = whichpic.getAttribute("href");
	//获取“占位符”图片
	//存入placerholder
	var placeholder = document.getElementById("placeholder");
	//检测placeholder是不是一个img元素
	//注意 nodeName方法返回的是大写字母的值
	if(placeholder.nodeName != "IMG")
	{
		return false;
	}
	placeholder.setAttribute("src",source);
	//获取<a>中的title属性
	//检查id=description的节点是否存在 如果存在 继续执行代码 
	//否则  这三行代码将被忽略
	if(document.getElementById("description"))
	{
		//这里也需要检测是不是每一个a元素中都有title这个属性 三元运算符
		//有 就用有的 没有 就给将字符串赋值给text
		var text = whichpic.getAttribute("title") ? whichpic.getAttribute("title") : "";
		//获取<img>下面的那个p节点
		var description = document.getElementById("description");
		//检测description的第一个子元素的类型是不是一个文本节点
		//文本节点 3
		//属性节点 2
		//元素节点 1
		if(description.firstChild.nodeType == 3)
		{
			//console.log(description);
			//注意 下面的这个方法不能显示<p>元素中的文本内容
			//原因 <p>元素本身的nodeValue属性是一个空值 但是它里面包含了一个文本节点 
			//我们想要找的是 这个文本节点的值 而不是<p>元素本身的nodeValue
			// alert(description.nodeValue);
			//显示<p>元素中包含的文本内容 <p>元素里面包含了一个文本节点 
			//alert(description.firstChild.nodeValue);
			description.firstChild.nodeValue = text;
		}
	}
	return true;
}
//弹出body元素有多少个子元素
function countBodyChildren()
{
	var body_element = document.getElementsByTagName("body")[0];
	console.log(body_element.childNodes.length);
	console.log(body_element.nodeType);
}
// window.onload = countBodyChildren;


function prepareGallery()
{
	//1.检查点 检查当前浏览器是否理解getElementsByTagName和getElementById 这两个DOM方法 
	if(!document.getElementsByTagName) 
	{
		return false;
	}
	if(!document.getElementById)
	{
		return false;
	}
	//2.判断id等于imagegallery的元素是否存在
	//这是一个预防性措施 现在知道肯定有id=imagegallery的一个元素 但以后说不定 有了这个检测 能保证在以后
	//就算在html中没了这个id=imagegallery的元素 js代码也不会报错
	if(!document.getElementById("imagegallery"))
	{
		return false;
	}
	var gallery = document.getElementById("imagegallery");
	//找到ul节点下所有的<a>节点 这是一个数组(节点列表)
	var links = gallery.getElementsByTagName("a");
	//遍历
	for(var i=0 ; i<links.length ; i++)
	{
		//改变行为
		links[i].onclick = function()
		{
			//下边的这两行代码 逻辑上可能有问题 因为它是默认了showPic(this)没有问题了 再返回false 万一要是有问题 
			//默认的a标签超链接跳转都没法用了 此处需要改进
			// showPic(this);
			// return false;
			//改进版 
			//showPic就有两种情况 图片切换成功了 返回true 则此处应该返回false 取消默认行为 
			//如果图片切换失败 返回false 则此处应该返回true 继续默认行为 保持图片能被查看
			return showPic(this) ? false : true;
		}
		//保证用户在键盘上敲回车 跟拿鼠标点有一样的效果
		//最后决定不添加这个事件处理函数 因为onclick事件处理函数在用户按下回车时也会触发
		// links[i].onkeypress = links[i].onclick;
	}
}
// window.onload = prepareGallery;
//上边这个做法在现在来讲合适 因为需要onload的函数只有2个
//多了怎么办？ 如下函数能方便的加载需要onload的函数
function addLoadEvent(func)
{
	var oldload = window.onload;
	//在这个处理函数上还没有绑定任何函数 就直接添加给它
	if(typeof window.onload != 'function')
	{
		window.onload = func;
	}
	//这个处理函数上已经绑定了一些函数 那么直接把这个追加到绑定列表的末尾
	else
	{
		window.onload = function()
		{
			oldload();
			func();
		}
	}
}
addLoadEvent(prepareGallery);
addLoadEvent(countBodyChildren);
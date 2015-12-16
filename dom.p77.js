//函数的名字应该能够描述用途
function showPic(whichpic)
{
	//whichpic 代表一个元素节点 其实就是指向某个图片的<a>元素
	//还需要分解出这个元素的图片文件路径 href
	//存入source
	var source = whichpic.getAttribute("href");
	//获取“占位符”图片
	//存入placerholder
	var placeholder = document.getElementById("placeholder");
	placeholder.setAttribute("src",source);
	//获取<a>中的title属性
	var text = whichpic.getAttribute("title");
	//获取<img>下面的那个p节点
	var description = document.getElementById("description");
	//console.log(description);
	//注意 下面的这个方法不能显示<p>元素中的文本内容
	//原因 <p>元素本身的nodeValue属性是一个空值 但是它里面包含了一个文本节点 
	//我们想要找的是 这个文本节点的值 而不是<p>元素本身的nodeValue
	// alert(description.nodeValue);
	//显示<p>元素中包含的文本内容 <p>元素里面包含了一个文本节点 
	//alert(description.firstChild.nodeValue);
	description.firstChild.nodeValue = text;
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
			showPic(this);
			return false;
		}
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
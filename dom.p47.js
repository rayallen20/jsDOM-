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
window.onload = countBodyChildren;
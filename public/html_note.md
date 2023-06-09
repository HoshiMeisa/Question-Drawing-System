# HTML

实例

```html
<!doctype html>  #声明为HTML5文档
<html>			
    <head>  	#头部元素，包含了文档的元（meta）数据
        <meta charset="utf-8">  #定义网页编码格式为 utf-8
        <title>Example</title>  
    </head>
    
    <body>  	#可见页面内容
        <h1>
            Title
        </h1>
        <p>
            This is a example page.
        </p>
    </body>
</html>
```



## 链接

HTML 链接是通过标签 <a> 来定义的

如果将 target 属性设置为 "_blank", 链接将在新窗口打开。

```html
<a href="https://www.runoob.com">这是一个链接</a>
<a href="https://www.runoob.com/" target="_blank">访问菜鸟教程!</a>
```



## 图像

HTML 图像是通过标签 <img> 来定义的.

```html
<img decoding="async" src="/images/logo.png" width="258" height="39" />
```



## 标题

``<hr>``标签可以创建水平线

```html
<p>这是一个段落。</p>
<hr>
<p>这是一个段落。</p>
<hr>
<p>这是一个段落。</p>
```



## 注释

```html
<!-- 这是一个注释 -->
```



## 文本格式化

### HTML "计算机输出" 标签

| 标签       | 描述               |
| :--------- | :----------------- |
| ``<code>`` | 定义计算机代码     |
| ``<kdb>``  | 定义键盘码         |
| ``<samp>`` | 定义计算机代码样本 |
| ``<var>``  | 定义变量           |
| ``<pre>``  | 定义预格式文本     |

### HTML 引文, 引用, 及标签定义

| 标签             | 描述             |
| :--------------- | :--------------- |
| ``<abbr>``       | 定义缩写         |
| ``<address>``    | 定义地址         |
| ``<bdo>``        | 定义文字方向     |
| ``<blockquote>`` | 定义长的引用     |
| ``<q>``          | 定义短的引用语   |
| ``<cite>``       | 定义引用、引证   |
| ``<dfn>``        | 定义一个定义项目 |



```html
文本格式化
<br>换行
<b>加粗文本</b>
<i>斜体文本</i>
<code>它将包含在标签中的文本渲染为等宽字体，并将其与周围的文本区别开来</code>
这是<sub>下标</sub>和<sup>上标</sup>


预格式文本
<pre>
可以将文本中的空格、换行符等格式保留下来，以便于展示那些需要保持原有格式的文本，比如计算机程序代码、电子邮件、命令行命令、日志等等
</pre>


计算机文本
<code>计算机输出</code>
<kbd>键盘输入</kbd>
<tt>打字机文本</tt>
<samp>计算机代码样本</samp>
<var>计算机变量</var>
<b>注释：</b>这些标签常用于显示计算机/编程代码。


地址
<address>
Written by <a href="mailto:webmaster@example.com">Jon Doe</a>.<br> 
Visit us at:<br>
Example.com<br>
Box 564, Disneyland<br>
USA
</address>


缩进和首字母缩写
<abbr title="etcetera">etc.</abbr>
<br />
<acronym title="World Wide Web">WWW</acronym>


改变文字显示方向
<p>该段落文字从左到右显示。</p>  
<p><bdo dir="rtl">该段落文字从右到左显示。</bdo></p>


块引用
<q>Build a future where people live in harmony with nature.</q>
We hope they succeed.</p>


删除线与下划线
<p>My favorite color is <del>blue</del> <ins>red</ins>!</p>



```



## CSS

### 内联样式

#### 背景颜色

背景色属性（background-color）定义一个元素的背景颜色：

```css
<body style="background-color:yellow;"> 
    <h2 style="background-color:red;">这是一个标题</h2> 
    <p style="background-color:green;">这是一个段落。</p> 
</body>
```



#### 字体, 字体颜色 ，字体大小

可以使用font-family（字体），color（颜色），和font-size（字体大小）属性来定义字体的样式:

```css
<h1 style="font-family:verdana;">一个标题</h1>
<p style="font-family:arial;color:red;font-size:20px;">一个段落。</p>
```



#### 文本对齐方式

使用 text-align（文字对齐）属性指定文本的水平与垂直对齐方式：

```css
<h1 style="text-align:center;">居中对齐的标题</h1>
<p>这是一个段落。</p>
```



#### 内部样式表

当单个文件需要特别样式时，就可以使用内部样式表。你可以在\<head> 部分通过 \<style>标签定义内部样式表:

```css
<head>
<style type="text/css">
body {background-color:yellow;}
p {color:blue;}
</style>
</head>
```



#### 外部样式表

当样式需要被应用到很多页面的时候，外部样式表将是理想的选择。使用外部样式表，你就可以通过更改一个文件来改变整个站点的外观。

```css
<head>
<link rel="stylesheet" type="text/css" href="mystyle.css">
</head>
```





## 图像

```html
<p>
    一个图像:
    <img src="smiley.gif" alt="Smiley face" width="32" height="32"></p>

    一个动图:
    <img src="hackanm.gif" alt="Computer man" width="48" height="48"></p>
```




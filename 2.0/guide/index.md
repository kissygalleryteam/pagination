* author 首作

## 简介
这是一个简单的分页组件，使用者可以方便地自定义页码的展现形式和展现数量，可以监听页码的切换函数

## 快速使用

    S.use('gallery/pagination/2.0/index', function (S, Pagination) {
    	
		// 初始化组件实例
		var pagination = new Pagination('pagination-wrap', {
			currentPage: 1,    // 默认选中的页码
			totalPage: 12      // 总页数
		});

		// 监听页码切换
		pagination.on('switch', function(e) {
			// 打印切换至的页码
			console.log(e.toPage);	
		});
    });

## 配置参数
影响分页组件信息展现的因素如下图所示：
![demo](http://img03.taobaocdn.com/tps/i3/T1nyRlFbdaXXcARYnK-582-214.png)

组件提供以下配置参数：
* `totalPage`，总页数，默认值为10
* `currentPage`，初始选中的页码，默认值为1
* `firstPagesCount`，最前面的展现页数，默认值为2
* `preposePagesCount`，当前页的紧邻前置页数，默认值为2
* `postposePagesCount`，当前页的紧邻后置页数，默认值为1
* `lastPagesCount`，最后面的展现页数，默认值为0
* `render`，是否自动渲染组件，默认值为true

## 提供事件
* `switch`，在切换页码时触发，通过事件对象e的toPage属性获取切换到的页码

## 公有方法
* `render()`，渲染组件
* `show()`，显示组件
* `hide()`，隐藏组件

## Demo
Demo访问地址：[http://gallery.kissyui.com/pagination/2.0/demo/index.html](http://gallery.kissyui.com/pagination/2.0/demo/index.html)

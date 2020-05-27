## 移动端为什么不使用JQuery（不推荐）
1 JQuery体积大
2 JQuery做了大量的兼容（都是高版本浏览器，没有必要）

## 搜索框的滚动处理

## 轮播图的实现
### touch事件(触摸)
移动端特有事件(Android, ios)
touchstart：手指刚刚触摸到屏幕的时候触发
touchmove：手指在屏幕上滑动的时候（不停触发）
touchend：手指离开屏幕的时候触发
touchcancel：被迫中止滑动触发的事件（来电）

绑定：on,但是第二次会被覆盖
改用 addEventListener() => 谷歌 或 attachEvent() => 兼容IE

#### 滑动效果的分析
使用touch事件，根据触摸位置的改变，改变对应元素的位移(translate)
1 监听位置的改变
2 获取当前的坐标
3 计算位移再设置滑动

#### 触摸点的集合(记录触摸点)
changedTouches：当前页面发生改变（离开屏幕或发生滑动）的触摸点集合
targetTouches：当前元素上面的所有触摸点集合（touchend事件可能为空）
touches：页面上所有的触摸点集合（touchend事件可能为空）

##### 获取坐标信息
clientX、ClientY => 基于当前视口 触摸点的坐标
pageX、pageY => 基于当前页面 触发点的坐标
screenX、screenY => 基于当前屏幕 触摸点的坐标

### 过渡结束事件&动画结束事件
document.querySelector('div').addEventListener('transitionend', function() {
    console.log('过渡结束事件');
})
document.querySelector('div').addEventListener('animationend', function() {
    console.log('动画结束事件');
})

### 手势事件
滑动开始到滑动结束的过程
移动端 => touch事件

#### tap事件（轻触）=> 也是一种手势事件
click事件在移动端：有300ms左右的延迟 => 响应过慢，用户体验贼差
解决方案：
+ tap事件（基于touch事件），响应更快（150ms以内）,不能滑动
 - Zepto 
+ 插件： fastclick.js

## 两栏自适应
+ float: left;
+ overflow: hidden;

## isScroll
+ 引入isScroll.js
+ div挂载wrapper的类名
+ new IScroll(使用节点, {参数配置})

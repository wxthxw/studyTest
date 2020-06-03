## 实现功能
基于bootstrap 3.0下的响应式网站雏形

### 轮播图的实现
+ 定时器轮播
+ 监听页面尺寸改变时重新渲染
+ touch事件实现左滑右滑

### 滑动页签的实现
#### 获取元素的宽度：
+ width 内容的宽度
+ innerWidth 内容和内边距的宽度
+ outerWidth 内容和内边距及边框的宽度
+ outerWidth(true) 内容、内边距、边框及外边距的宽度
#### 使用isScroll实现滑动

### 产品区块
#### 两栏实现
+ 设置浮动元素在前
+ 设置第二个元素样式：overflow：hidden
不能颠倒顺序的原因：
+ 渲染时是自上而下的
+ 当先遇到块级元素时，它会默认占满整行
+ 如果是先遇到浮动元素的话，第二个会跟在浮动元素后面
+ 然后截掉超出的部分，从而实现了两栏功能
#### 实现优惠券上的圆形及虚线
+ ::before ::after实现圆形

### 导航栏
#### 吸顶导航
## 实现功能
苏宁移动端网页开发

### 媒体查询+rem适配方案

### less适配维护
#### 引入less.js
<link rel="stylesheet" type="text/less" href="./assets/less/index.less">
<script src="https://cdnjs.cloudflare.com/ajax/libs/less.js/3.11.1/less.min.js" ></script>
报错解决方案：https://blog.csdn.net/zeduan/article/details/104165628/

#### less适配
// 适配主流设备
// 需要对应的基准值
@psdWidth: 750px; // 设计稿宽度
@baseSize: 100; // 基准值
@deviceWidthList: 320px, 360px;
// length(@deviceWidthList) => 获取数组的长度
// when: 判定的条件，防止死循环
.adapterFun(@index) when (@index <= length(@deviceWidthList)) {
    // extract(@deviceWidthList, @index) => arr[index]
    @media (min-width: extract(@deviceWidthList, @index)) {
        html {
            font-size: extract(@deviceWidthList, @index)/@psdWidth*@baseSize;
        }
    }
    .adapterFun(@index+1); // 自调用
}
.adapterFun(1);

### 首页实现
移动端的适配：viewport
伸缩容器：flex
流式布局：百分比
响应式布局：媒体查询（超小屏幕下还是流式布局）
rem适配：rem单位用在内容的高度自适应

### 使用zepto完成轮播图
<!-- zepto 的核心功能 -->
<script src="./js/lib/zepto.min.js"></script>
<!-- zepto selector 模块  -->
<script src="./js/lib/zepto.selector.js"></script>
<!-- zepto 使用动画 -->
<script src="./js/lib/zepto.fx.js"></script>
<!-- zepto touch 手势事件 -->
<script src="./js/lib/zepto.touch.js"></script>

### 使用Swiper实现轮播图
+ 引入时注意版本的问题：
<script src="./swiper-3.4.2.min.js"></script>

+ 初始化
new Swiper('.swiper-container', {
    autoplay: 1000, // 自动播放
    loop: true, // 无缝滑动
    pagination: '.swiper-pagination', // 显示指示器
    autoplayDisableOnInteraction: false // 用户滑动后继续播放
});
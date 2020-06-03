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
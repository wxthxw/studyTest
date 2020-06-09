# 实现功能
从零实现React

## 安装生成react项目
npx create-react-app my-react

## 删除react依赖
+ 删除src文件夹下的所有文件
+ 新建react文件夹
+ 新建入口文件index.js

## element.js 实现babel转义
原理：返回虚拟dom，用对象来描述元素
+ 原先DOM元素：<div name="ccc">hh<span>121213</span></div>
+ 转义后：React.createElement('div', {name: 'ccc'}, 'hh', React.createElement('span',null,'121213'))

## index.js 实现渲染到DOM节点
+ createReactUnit：放置我们的工厂函数：用以创建对应的react元素
    - ReactTextUnit：对于文本节点的处理
    - ReactNativeUnit：处理React.createElement创建出来的元素
    - ReactCompositUnit：type是类的元素
+ 渲染到节点上
    $(container).html(markUp);
+ 渲染完成后，触发组件挂载完毕的方法
    $(document).trigger('mounted');

## component.js 实现setState更新状态
+ setState + domdiff

## 入口文件 index.js 实现调用
+ 组件生命周期
    - componentWillMount：组件将要挂载
    - render: 组件挂载
    - componentDidMount：组件挂载完毕


import $ from 'jquery';
import createReactUnit from './unit.js';
import createElement from './element.js';
import Component from './component.js';
// 在React中声明属性及方法，暴露出去后，可以直接在React.fn去调用
let React = {
    render,
    nextRootIndex: 0,
    createElement,
    Component,  
}
// 给每个元素添加一个属性：为了方便获取到这个元素
function render(element, container) {
    // 工厂函数：创建对应的react元素
    // 通过这个函数来创建
    let createReactUnitInstance = createReactUnit(element);
    let markUp = createReactUnitInstance.getMarkUp(React.nextRootIndex);
    $(container).html(markUp);
    // 渲染完成后，触发组件挂载完毕的方法
    $(document).trigger('mounted'); // 所有组件都完成了（发布之前的订阅内容）
}
export default React;
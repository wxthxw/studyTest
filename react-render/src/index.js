// 用react需要使用reader方法
import React from './react';

class SubCounter {
    componentWillMount() { // 组件将要挂载
        console.log('subCounter组件将要挂载')
    }
    componentDidMount() { // 组件挂载完毕
        console.log('subCounter组件挂载完毕')
    }
    render() {
        return '12121231dsa';
    }
}

class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {number: 112131}
    }
    componentWillMount() { // 组件将要加载
        console.log('Counter组件将要挂载')
    }
    componentDidMount() { // 组件挂载完毕
        console.log('Counter组件挂载完毕')
    }
    render() {
        console.log(this.props.name)
        // return this.state.number;
        // return React.createElement(SubCounter, {name: 1});
        return <SubCounter/>;
    }
}
let element = React.createElement(Counter, {name: '12121'});
React.render(element, document.getElementById('root')); // 在根节点下追加内容
// let element  = React.createElement('div', {name: 'ccc'}, 'hh', React.createElement('button',{onClick: show},'121213'));
// function show() {
//     console.log('adfsafsafas')
// }
console.log(element)
/* <div name="ccc">hh<span>121213</span></div>; */
// 通过babel转义成 => React.createElement('div', {name: 'ccc'}, 'hh', 
// React.createElement('span',null,'121213'))
// jsx 语法 => 虚拟dom对象
// element原先是字符串  '12121'
// React.render(element, document.getElementById('root')); // 在根节点下追加内容
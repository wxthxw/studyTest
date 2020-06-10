// 实现路由组件的切换
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Consumer } from './context';
// import pathToRegexp from 'path-to-regexp'; // 路径转正则
import * as pathToRegexp from 'path-to-regexp'
export default class Route extends Component {
    constructor() {
        super();
    }
    render() {
        return (<Consumer>
            { state => { // 组件创建几次，就会触发几次
                let {path, component:Component, extract=false} = this.props;
                let pathname = state.location.pathname;
                // 通过正则匹配path
                let keys = [];
                let reg = pathToRegexp(path, keys, {end:extract});
                keys = keys.map(item => item.name); // ['id', 'name']
                let result = pathname.match(reg);
                let [url, ...values] = result || []; // [1, '111']
                let props = { // 多级路由时需传值过去
                    location: state.location,
                    history: state.history,
                    match: {
                        params: keys.reduce((obj, current, idx) => {
                            obj[current] = values[idx];
                            return obj;
                        }, {})
                    }
                }
                if (result) {
                    return <Component {...props}></Component>
                }
                return null;
            }}
        </Consumer>);
    }
}
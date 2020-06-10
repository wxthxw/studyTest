// 避免路由一直被重定向
// 一旦匹配到前面的路由后，就不再执行后面的匹配规则
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Consumer} from './context';
import * as pathToRegexp from 'path-to-regexp'; // 路由匹配
export default class Switch extends Component {
    constructor() {
        super();
    }
    render() {
        return (<Consumer>
            {
                state => {
                    return (<Consumer>
                        {
                            state => {
                                let pathname = state.location.pathname;
                                let children = this.props.children;
                                for (let i=0; i<children.length; i++) {
                                    let child = children[i];
                                    // redirect可能没有path属性
                                    let path = child.props.path || '';
                                    let reg = pathToRegexp(path, [], {end: false});
                                    // switch 匹配成功了
                                    if (reg.test(pathname)) {
                                        return child; // 将匹配到的组件返回即可
                                    }
                                }
                                return null;
                            }
                        }
                    </Consumer>)
                }
            }
        </Consumer>);
    }
}
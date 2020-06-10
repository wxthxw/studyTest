import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Provider} from './context';
export default class HashRouter extends Component {
    constructor() {
        super();
        this.state = {
            location: {
                // window.location.hash => 格式为：#/
                pathname: window.location.hash.slice(1) || '/'
            }
        }
    }
    componentDidMount() {
        // 默认hash没有时跳转到/
        window.location.hash = window.location.hash || '/';
        // 监听hash值变化，重新设置状态
        window.addEventListener('hashchange', () => {
           this.setState({
               location: {
                   ...this.state.location, // 保留原有的数据
                   pathname: window.location.hash.slice(1) || '/'
               }
           })
        })
    }
    render() {
        let value = {
            location:  this.state.location,
            history: {
                push(to) { // 实现路由跳转的方法
                    window.location.hash = to;
                }
            }
        }
        return (<Provider value={value}> 
            {this.props.children}
        </Provider>);
    }
}
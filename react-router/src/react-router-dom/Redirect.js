// 实现路由重定向功能
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Consumer} from './context';
export default class Redirect extends Component {
    constructor() {
        super();
    }
    render() {
        return (<Consumer>
            {
                state => {
                    state.history.push(this.props.to);
                    return null;
                }
            }
        </Consumer>);
    }
}
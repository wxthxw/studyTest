import React, {Component} from 'react';
import ReactDOM from 'react-dom';
export default class UserAdd extends Component {
    constructor() {
        super();
        // 16.3新提供的
        this.text = React.createRef();
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="text" ref={this.text} />
                <button type="submit">提交</button>
            </form>
        );
    }
    handleSubmit = (e) => {
        e.preventDefault();
        // 获取到当前文本框的值
        console.log(this.text.current.value);
        this.props.history.push('/user/list');
    }
}
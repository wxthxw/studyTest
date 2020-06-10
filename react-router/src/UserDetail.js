import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Link} from './react-router-dom';
export default class UserDetail extends Component {
    constructor() {
        super();
    }
    render() {
        return (<div>
            Detail {this.props.match.params.id}
        </div>);
    }
}
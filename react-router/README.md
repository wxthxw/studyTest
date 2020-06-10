# 实现功能
从零实现React-router

## 安装生成react项目
npx create-react-app my-react
+ 引入router模块
    cnpm i react-router-dom

## 删除react依赖
+ 删除src文件夹下的所有文件
+ 新建react文件夹
+ 新建入口文件index.js

## 监听hash变化
+ hash
    <a href="#/a">a</a>
    <a href="#/b">b</a>
    window.addEventListener('hashchange', () => {
        console.log(window.location.hash)
    })
+ push
    <a onclick="push('/a')">a</a>
    <a onclick="push('/b')">b</a>
    function push(path) {
        history.pushState({p:path}, null, path)
    }
    //  网页后退时生效
    window.addEventListener('popstate', e => {
        console.log(history.length);
        console.log(e);
    })

### Provider和Consumer实现跨组件传递数据
+ context.js: 创建并暴露成员
    import React, {Component} from 'react';
    // 这个方法是react16.3新增的
    let {Provider, Consumer} = React.createContext();
    export { Provider, Consumer }
+ HashRouter.js 使用Provider
    <Provider value={{a: 1}}> 
        {this.props.children}
    </Provider>
+ Router.js 使用Consumer
    <Consumer>
    { state => { // 组件创建几次，就会触发几次
        console.log(state)
        return null;
    }}
    </Consumer>);

### 安装路径转正则的包
    cnpm i path-to-regexp
+ 遇到问题
    Attempted import error: 'path-to-regexp' does not contain a default export (imported as 'pathToRegexp').
    - 原因：版本问题
    - 解决方案： cnpm i path-to-regexp@2.4.0 -S

### 严格匹配：extract="true"
+ /home/123/w1格式的都可以匹配到
    <Route path="/home" component={Home}></Route>
+ 只能匹配/profile
    <Route path="/profile" extract="true" component={Profile}></Route>

### Link.js 实现路由跳转功能
+  定义一个实现路由跳转的方法 
    history: {
        push(to) {
            window.location.hash = to;
        }
    }
+ 返回一个a标签，绑定切换的点击事件
    return <a onClick={() => {
        state.history.push(this.props.to);
    }}>{this.props.children}</a>
    - {this.props.children} 获取到Link标签下的文本内容

### UI界面美化
+ 引入bootstrap：cnpm i bootstrap@3.3.7

### redirect.js 重定向
+ 匹配不到后直接跳转到redirect中的to路径

### Switch.js 避免路由一直被重定向
+ 一旦匹配到前面的路由后，就不再执行后面的匹配规则

### 实现多级路由功能
+ 新建UserAdd.js UserList.js
+ 获取到文本框的值
    -  this.text = React.createRef(); // React 16.3新提供的
    -  this.text.current.value // 获取到当前文本框的值
+ 进行路由跳转
    -  将props值传递出去（为了调用跳转方法）
        <Component {...props}></Component>
    -  调用路由跳转方法
        this.props.history.push('/user/list');

### 实现路由带参数
+ 新建UserDetail.js
+ 获取到路由参数：keys及values数组
    - 借由正则匹配
        let keys = [];
        let reg = pathToRegexp(path, keys, {end:extract});
        keys = keys.map(item => item.name); // ['id', 'name']
        let result = pathname.match(reg);
        let [url, ...values] = result || []; // [1, '111']
    - 处理所得的数组内容
        params: keys.reduce((obj, current, idx) => {
            obj[current] = values[idx];
            return obj;
        }, {})
    - 使用参数（直接使用this.props.match.params会报错）
        Detail {this.props.match.params.id}
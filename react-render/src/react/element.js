class Element {
    constructor(type, props) {
        this.type = type;
        this.props = props;
    }
}
// 返回虚拟dom，用对象来描述元素
// type => 标签类型 div span 之类
// props => 属性集合 name = "ccc"
// children => 子元素对象(可能有多个,所以用扩展运算符遍历出来)
function createElement(type, props, ...children) {
    props = props || {}; // 设置属性集合对象的默认值
    props.children = children; // 获取到子元素对象集合
    return new Element(type, props);
    // return {
        // type,
        // props
    // }
}
export default createElement;
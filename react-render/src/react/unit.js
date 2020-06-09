import $ from 'jquery';

// 放置我们的工厂函数：用以创建对应的react元素
function createReactUnit(element) {
    if (typeof element == 'string' || typeof element === 'number') {
        return new ReactTextUnit(element);
    }
    // 判断element是不是由React.createElement创建出来的元素
    if (typeof element === 'object' && typeof element.type === 'string') {
        return new ReactNativeUnit(element);
    }
    // type是类的元素
    if (typeof element === 'object' && typeof element.type === 'function') {
        return new ReactCompositUnit(element); // {type:Counter, {name: 'ccc'}}
    }
}
// 编写这个父类的原因是为了减免在创建ReactTextUnit实例时，
// 每次都要在constructor上获取element，直接在父类获取，
// 那么创建出来的实例都能继承父类上获取到的element
class Unit { // 注意：父类要先于子类进行定义，不然会报错（无变量提升）
    constructor(element) {
        this.currentElement = element;
    }
}
class ReactTextUnit extends Unit {
  getMarkUp(rootId) {
      this._rootId = rootId; // 保存当前元素的id，以便于后面方法的拓展
      return `<span data-reactid="${rootId}">${this.currentElement}</span>`; // 返回对应的html脚本 
  }
}
class ReactNativeUnit extends Unit { // 继承到Unit的属性
    getMarkUp(rootId) {
        this._rootId = rootId; // 保存当前元素的id，以便于后面方法的拓展
        // 拼接需要渲染的内容
        let {type, props} = this.currentElement; // 通过解构赋值的方法获取到type props的值
        let tagStart = `<${type} data-reactid="${rootId}"` // 起始标签
        let tagEnd = `</${type}>`; // 结束标签
        let contentStr; // 子元素的全部内容
        for (let propName in props) { // 遍历属性列表
            if (/on[A-Z]/.test(propName)) { // 绑定的事件 以on开头
               let eventType = propName.slice(2).toLocaleLowerCase(); // onClick => click
               // 通过事件委托的机制，由document去触发我们在元素上绑定的事件
               // 原因：返回的字符串无法直接绑定并触发事件，会报错
               $(document).on(eventType, `[data-reactid="${rootId}"]`, props[propName]);
            }
            else if (propName === 'children') { // 子元素对象
                contentStr = props[propName].map((child, idx) => {
                    // 递归循环子节点
                    let childInstance = createReactUnit(child);
                    // 返回的是多个元素的字符串的数组
                    return childInstance.getMarkUp(`${rootId}.${idx}`);
                }).join(''); // 合并同级的子元素
            } else { // 真正的属性
                tagStart += (` ${propName}=${props[propName]}`); // 追加元素上的属性
            }
        }
        return tagStart + '>' + contentStr + tagEnd; // 返回拼接后的字符串
    }
}
class ReactCompositUnit extends Unit { // 负责渲染react组件
    getMarkUp(rootId) {
        this._rootId = rootId;
        let { type:Component, props } = this.currentElement; // 解构赋值获取信息
        // Counter 是 Component的子类,所以可以访问到Counter上的render方法
        let componentInstance = new Component(props);
        // 如果有componentWillMount方法，则对其进行调用
        componentInstance.componentWillMount && componentInstance.componentWillMount(); 
        // $(document).on('mounted', () => { // 组件挂载完毕的订阅内容
        //     componentInstance.componentDidMount && componentInstance.componentDidMount();
        // }) 如果放置在这，会造成父组件先挂载先完成，而不是先挂载后完成
        // 调用render后返回的结果
        let reactComponentRender = componentInstance.render(); // 0
        let reactUnitInstance = createReactUnit(reactComponentRender); // 递归渲染组件render后的返回结果
        // 先序深度优先 有儿子就进入 树的遍历
        let markup = reactUnitInstance.getMarkUp(rootId);
        // 在递归后绑定的事件： 子组件先绑定成功，再绑定父组件
        $(document).on('mounted', () => { // 组件挂载完毕的订阅内容
            componentInstance.componentDidMount && componentInstance.componentDidMount();
        })
        return markup; // 实现把render方法返回的结果，作为字符串返回回去
    }
}
export default createReactUnit;
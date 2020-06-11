# 实现功能
日历组件

##  安装vue-cli脚手架
+ 安装： cnpm i -g @vue/cli
+ 查看是否成功：vue --version
+ 安装vue serve指令需要的包
    cnpm i -g @vue/cli-service-global

## 运行项目
+ 运行指令 vue serve
    - 默认运行App.vue文件，如果是别的文件需要在后面声明
+ 初始化：cnpm init -y
+ 安装stylus模块
    cnpm i stylus stylus-loader -D
+ 安装webpack
    cnpm i webpack -D

## 自定义指令
+ v-click-outside：用以判断是否在元素内部进行点击事件
    - <div v-click-outside></div>
    -   clickOutside: { // 指令的生命周期
            bind(el, bindings, vnode) { // context
                let handler = (e) => {
                    if (el.contains(e.target)) { // 判断是否在元素内部点击
                        // 判断弹框是否已经展示出来
                        !vnode.context.isVisible && vnode.context.focusEvent();
                    } else {
                        vnode.context.isVisible && vnode.context.blurEvent();
                    }
                }
                el.handler = handler;
                // 把事件绑定在document上，判断是否在元素内部进行点击事件
                document.addEventListener('click', handler);
            },
            unbind(el) {
                document.removeEventListener('click', el.handler);
            }
        }
+ 获取单个日历栏
    - 获取当前日历栏的42个日期
    - 类似乘法表式的遍历数据
        <div v-for="i in 6" :key="i">  
            <span v-for="j in 7" :key="j" class="cell">
                {{visibleDays[(i-1)*7+(j-1)].getDate()}}
            </span>
        </div>

## 判断日期
+ 判断是否当月：year === y && month === m
+ 判断是否当日：year === y && month === m && day === d

## 点击切换当前时间
+ 简写父组件接受emit回来的参数的形式
    -  v-model="now" 等价于下面
    -  :value="now" @input="val => now = val"

## 切换上一月，下一月
let d = utils.getDate(this.time.year, this.time.month, 1);
d.setMonth(d.getMonth() - 1);
this.time = utils.getYearMonthDay(d);

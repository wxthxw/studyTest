<template>
    <div v-click-outside>
        <input type="text" :value="formatDate" />
        <div class="pannel" v-if="isVisible">
            <div class="pannel-nav">
                <span>&lt;</span>
                <span @click="preMonthBtn">&lt;&lt;</span>
                <span>{{time.year}}年</span>
                <span>{{time.month + 1}}月</span>
                <span @click="nextMonthBtn">>&gt;&gt;</span>
                <span>&gt;</span>
            </div>
            <div class="pannel-content">
                <div class="days">
                    <span v-for="j in 7" :key="''+j" class="cell">
                        {{ weekDays[j-1] }}
                    </span>
                    <!-- 直接列出一个6*7的列表 -->
                    <div v-for="i in 6" :key="i">  
                        <span v-for="j in 7" :key="j" 
                            @click="chooseDate(visibleDays[(i-1)*7+(j-1)])"
                            class="cell cell-days"
                            :class="[
                                {notCurrentMonth: !isCurrentMonth(visibleDays[(i-1)*7+(j-1)])},
                                {isToday:isToday(visibleDays[(i-1)*7+(j-1)])},
                                {select: isSelect(visibleDays[(i-1)*7+(j-1)])}
                            ]">
                            {{visibleDays[(i-1)*7+(j-1)].getDate()}}
                        </span>
                    </div>
                </div>
            </div>
            <div class="pannel-footer">
                今日
            </div>
        </div>
    </div>
</template>
<script>
import * as utils from './util';
export default {
    directives: {
        clickOutside: { // 指令的生命周期
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
    },
    props: {
        value: {
            type: Date,
            default: ()=> new Date() // 返回的默认值必须是一个函数类型
        }
    },
    data() {
        let {year, month} = utils.getYearMonthDay(this.value);
        return {
            isVisible: false, // 日历弹窗显示标识
            weekDays: ['日', '一', '二', '三', '四', '五', '六'],
            time: {year, month}
        }
    },
    computed: {
        formatDate() {
            let {year,month,day} = utils.getYearMonthDay(this.value);
            return `${year}-${month+1}-${day}`
        },
        visibleDays() {
            const oneDay = 60 * 60 * 24 * 1000; // 一天的毫秒数
            let {year, month } = utils.getYearMonthDay(utils.getDate(this.time.year, this.time.month, 1));
            let currentFirstDay = utils.getDate(year, month, 1);  // 获取当前月份的第一天
            let week = currentFirstDay.getDay(); // 首先获取当前周几
            let startDay = currentFirstDay - week * oneDay; // 当前开始的天数
            // 循环42天
            let arr = [];
            for (let i=0; i < 42; i++) {
                arr.push(new Date(startDay + i * oneDay))
            }
            return arr;
        }
    },
    methods: {
        focusEvent() {
            this.isVisible = true;
        },
        blurEvent() {
            this.isVisible = false;
        },
        isCurrentMonth(date) { // 判断是不是当月
            let {year, month} = utils.getYearMonthDay(utils.getDate(this.time.year, this.time.month, 1));
            let {year:y, month:m} = utils.getYearMonthDay(date);
            return year === y && month === m
        },
        isToday(date) { // 是否是今天
            let {year, month, day} = utils.getYearMonthDay(new Date());
            let {year:y, month:m, day:d} = utils.getYearMonthDay(date);
            return year === y && month === m && day === d
        },
        chooseDate(date) { // 选择日期
            this.time = utils.getYearMonthDay(date);
            this.$emit('input', date);
            this.blurEvent();
        },
        isSelect(date) { // 是否选中
            let {year, month, day} = utils.getYearMonthDay(this.value);
            let {year:y, month:m, day:d} = utils.getYearMonthDay(date);
            return year === y && month === m && day === d
        },
        preMonthBtn() { // 切换到上一月
            let d = utils.getDate(this.time.year, this.time.month, 1);
            d.setMonth(d.getMonth() - 1);
            this.time = utils.getYearMonthDay(d);
        },
        nextMonthBtn() { // 切换到下一月
            let d = utils.getDate(this.time.year, this.time.month, 1);
            d.setMonth(d.getMonth() + 1);
            this.time = utils.getYearMonthDay(d);
        }
    }
}
</script>
<style lang="stylus" scoped>
.pannel
    width 32*7px;
    position absolute
    background-color #ffffff
    box-shadow 2px 2px 2px pink , -2px -2px 2px pink;
    &-nav
        height 30px
        display flex
        justify-content space-around
        span
            cursor pointer
            user-select none
    &-content  
        .cell
            display inline-flex
            justify-content  center
            align-items center
            width 32px
            height 32px
            font-weight bold
        .cell-days
            cursor pointer
            &:hover
                border 1px solid #267dff 
                box-sizing border-box
    &-footer
        height 30px
        text-align center
.notCurrentMonth 
    color grey
.isToday
    color #ffffff
    border-radius 4px
    background-color #267dff
.select
    border 1px solid pink
    box-sizing border-box
</style>
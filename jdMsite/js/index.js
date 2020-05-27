window.onload = function() {
    // 初始化页面功能 
    search(); // 搜索框滚动处理
    banner(); // 轮播图的播放处理
    downTime(); // 倒计时
}
let search = function() { // 搜索框滚动处理
    // 1 未发生滚动时，透明度为0
    let search = document.querySelector('.jd_search_box'); // 获取搜索框dom对象
    let banner = document.querySelector('.jd_banner'); // 获取轮播图对象
    let height = banner.offsetHeight; // 最大距离
    let opacity = 0; // 背景透明度
    window.onscroll = function() { // 监听滚动事件
        // 获取当前页面滚动的距离
        let top = document.body.scrollTop; // 谷歌; IE浏览器=> document.documentElement.scrollTop
        if (top > height) { // 3 超出轮播图区域时，透明度不再改变
            opacity = 0.85;
        } else { // 2 页面滚动距离越大，透明度越大
            opacity = 0.85*(top/height);
        }
        // 设置颜色给搜索框
        search.style.background = 'rgba(216, 80, 92,'+opacity+')';
    }
}
let banner = function() { // 轮播图的播放处理
    let banner = document.querySelector('.jd_banner'); // 大容器
    // querySelector 用的选择器就是css中的有效选择器
    let imageBox = banner.querySelector('ul:first-child'); // 图片容器
    let pointBox = banner.querySelector('ul:last-child'); // 点容器
    let points = pointBox.querySelectorAll('li'); // 所有的点
    let width = banner.offsetWidth; // 轮播图宽度
    // 1 无缝滚动 无缝滑动(定时器 过渡 位移)
    let index = 1; // 默认索引
    // 抽离出公用的方法
    let addTransition = function() { // 添加过渡效果
        imageBox.style.transition = "all 0.2s"; // 过渡效果
        imageBox.style.webkitTransition = "all 0.2s"; // 兼容
    };
    let removeTransition = function() { // 清除过渡效果
        imageBox.style.transition = "none"; // 清除过渡，已达到无缝衔接
        imageBox.style.webkitTransition = "none"; // 兼容
    }
    let setTransilateX = function(translateX) { // 设置转换效果
        imageBox.style.transform = `translateX(${ translateX }px)`;
        imageBox.style.webkitTransform = `translateX(${ translateX }px)`;
    }
    let timer = setInterval(function() { // 自动切换的定时器
        index++;
        addTransition(); 
        setTransilateX(-index*width);
    }, 3000)
    // 监听过渡结束事件
    imageBox.addEventListener('transitionend', function() {
        if (index >= 7) { // 无缝滚动
            index = 1;
            removeTransition();
            setTransilateX(-index*width);
        } else if (index <= 0) { // 无缝滑动
            index = 6; // 瞬间定位到第6张
            removeTransition();
            setTransilateX(-index*width);
        }
        setPoint(); // 取值范围为1-6
    });
    // 2 点盒子对应改变(改变当前样式)
    let setPoint = function() {
        // 去除所有的now样式
        for(let i = 0; i < points.length; i++) {
            points[i].classList.remove('now');
        }
        points[index-1].classList.add('now');
    }
    // 3 可以滑动(监听touch事件 触摸点坐标改变距离 位移)
    let startX = 0; // 开始位置的X坐标
    let distanceX = 0; // 记录坐标轴的改变
    let isMove = false; // 严谨判断，以防只是点击而没有发生触摸移动的情况
    imageBox.addEventListener('touchstart', function(e) { // 触摸开始
        clearInterval(timer); // 清除定时器
        startX = e.touches[0].clientX; // 记录开始的位置
    })
    imageBox.addEventListener('touchmove', function(e) { // 触摸移动
        let moveX = e.touches[0].clientX;
        distanceX = moveX - startX; // 触摸移动时，水平位置的位移
        let translateX = -index*width + distanceX; // 获取触摸时的位移
        removeTransition();
        setTransilateX(translateX);
        isMove = true;
    })
    imageBox.addEventListener('touchend', function(e) { // 触摸结束
        if(isMove) { // 以防只是点击而没有发生触摸移动的情况
            // 4 当滑动距离不够，吸附回去(过渡 位移) 假定是1/3距离
            if (Math.abs(distanceX) < width/3) {
                addTransition();
                setTransilateX(-index*width);
            } else { // 5 滑动距离超过 跳转到 上一张/下一张
                if (distanceX > 0) { // 向右滑动 => 上一张
                    index--;
                } else { // 向左滑动 => 下一张
                    index++;
                }
                addTransition();
                setTransilateX(-index*width);
            }
        }
        clearInterval(timer); // 清除定时器,以防多开
        timer = setInterval(function() { // 开启定时器
            index++;
            addTransition(); 
            setTransilateX(-index*width);
        }, 3000)
        // 重置参数
        startX = 0;
        distanceX = 0;
        isMove = false; // 防止下次触发判断失效
    })
}
let downTime = function() { // 倒计时功能
    let time = 10;
    let skTime = document.querySelector('.sk_time');
    let spans = skTime.querySelectorAll('span');
    let timer = setInterval(function() {
        time--;
        if (time === 0) {
            clearInterval(timer);
        }
        let h = Math.floor(time/3600);
        let m = Math.floor(time%3600/60);
        let s = time%60;
        spans[0].innerHTML = Math.floor(h/10);
        spans[1].innerHTML = h%10;
        spans[3].innerHTML = Math.floor(m/10);
        spans[4].innerHTML = m%10;
        spans[6].innerHTML = Math.floor(s/10);
        spans[7].innerHTML = s%10;
    }, 1000);
}
$(function() {
    banner(); // 动态的响应式轮播图
    initTab(); // 初始化标签切换
    $('[data-toggle="tooltip"]').tooltip(); // 打开提示
})
let banner = function() { // 动态的响应式轮播图
    let $banner = $('.wjs_banner'); // 获取轮播图组件对象
    let $point = $banner.find('.carousel-indicators'); // 点容器
    let $image = $banner.find('.carousel-inner'); // 图片容器
    let $window = $(window); // 窗口对象
    // 1 获取数据
    let data = [
        {
            pcImg: './images/banner/1.jpg',
            mImg: './images/banner/1.jpg'
        },
        {
            pcImg: './images/banner/2.jpg',
            mImg: './images/banner/2.jpg'
        },
        {
            pcImg: './images/banner/3.jpg',
            mImg: './images/banner/3.jpg'
        },
        {
            pcImg: './images/banner/4.jpg',
            mImg: './images/banner/4.jpg'
        },
        {
            pcImg: './images/banner/5.jpg',
            mImg: './images/banner/5.jpg'
        },
        {
            pcImg: './images/banner/6.jpg',
            mImg: './images/banner/6.jpg'
        },
        {
            pcImg: './images/banner/7.jpg',
            mImg: './images/banner/7.jpg'
        },
        {
            pcImg: './images/banner/8.jpg',
            mImg: './images/banner/8.jpg'
        }
    ]
    let render = function() {
        let isMobile = $window.width() < 768 ? true : false; // 2 判断当前设备
        // 3 数据转换成html结构
        let pointHtml = ''; // + 点容器内容
        let imageHtml = ''; // + 图片容器内容
        $.each(data, function(k, v) {
            pointHtml += `<li data-target="#carousel-example-generic" data-slide-to="${k}" class="${k===0? 'active' : ''}"></li>`;
            imageHtml += `<div class="item ${k===0? 'active' : ''}">`;
            if (isMobile) {
                imageHtml += `<a href="#" class="m_img hidden-sm hidden-md hidden-lg"><img src="${v.mImg}" alt=""></a>`;
            } else {
                imageHtml += `<a href="#" class="pc_img hidden-xs" style="background-image:url('${v.pcImg}');"></a>`;
            }
            imageHtml += `</div>`;
        })
        $point.html(pointHtml); 
        $image.html(imageHtml);
    }
    // 5 监听页面尺寸改变时重新渲染
    $window.on('resize', function() {
        render(); // 4 渲染到页面上
    }).trigger('resize')
    // 6 移动端手势切换 
    let startX = 0;
    let distanceX = 0; // 触摸位移
    let isMove = false;
    $banner.on('touchstart', function(e) {
        startX = e.originalEvent.touches[0].clientX;
    }).on('touchmove', function(e) {
        let moveX = e.originalEvent.touches[0].clientX;
        distanceX = moveX - startX;
        isMove = true;
    }).on('touchend', function(e) {
        if (isMove && Math.abs(distanceX) >= 50) {
            console.log($banner)
            if (distanceX > 0) { // 右滑
                $banner.carousel('prev');
            } else { // 左滑
                $banner.carousel('next')
            }
        }
        // 恢复初始值，以免影响到下一次触发事件
        startX = 0;
        distanceX = 0;
        isMove = false;
    })
}
let initTab = function() { //初始化标签切换
    let tabs = $('.wjs_product .nav-tabs'); // 父容器
    let liList = tabs.find('li'); // 所有的子容器
    let width = 0; // 计算宽度之和
    // 1 所有页签在一行显示
    $.each(liList, function(i, item) {
        // width 内容的宽度
        // innerWidth 内容和内边距的宽度
        // outerWidth 内容和内边距及边框的宽度
        // outerWidth(true) 内容、内边距、边框及外边距的宽度
        width += $(item).outerWidth(true);
    })
    tabs.width(width);
    // 2 满足滚动的html结构，实现滑动功能
    new IScroll('.nav-tabs-parent', {
        scrollX: true,
        scrollY: false
    });
}
$(function() { // 入口函数
    banner();
})
let banner = function() {
    let $banner = $(".sn_banner"), // 轮播图对象
        $width = $banner.width(),  // 轮播区域总宽度
        $image = $banner.find('ul:first'), // 图片盒子
        $point = $banner.find('ul:eq(1)'), // 点盒子
        $points = $point.find('li'),  // 所有的点
        $index = 0, // 当前索引
        animateFun = function() { // 抽离出来的动画函数
            $image.animate({'transform': `translateX(${-$index*$width}px)`}, 200, 'linear', function() {
                // 无缝滚动
                if ($index >= 7) {
                    $index = 1;
                    $image.css({'transform': `translateX(${-$index*$width}px)`});
                } else if ($index <= 0) {
                    $index = 6;
                }
                // 2 点对应切换
                $points.removeClass('now').eq($index - 1).addClass('now');
            });
        },
        timer = setInterval(function() { // 1 无缝轮播
            $index ++;
            animateFun();
        }, 5000);
    
    // 3 手势切换
    $image.on('swipeRight', function() { // 右滑 上一张
        $index --;
        animateFun();
    })
    $image.on('swipeLeft', function() { // 左滑 下一张
        $index ++;
        animateFun();
    }) 
}
// 初始化Swiper
$(function() {
    new Swiper('.swiper-container', {
        autoplay: 1000, // 自动播放
        loop: true, // 无缝滑动
        pagination: '.swiper-pagination', // 显示指示器
        autoplayDisableOnInteraction: false // 用户滑动后继续播放
    });
})
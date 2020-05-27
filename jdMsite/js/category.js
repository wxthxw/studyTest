window.onload = function() {
    leftSwipe(); // 左侧滑动
    rightSwipe(); // 右侧滑动
}
let leftSwipe = function() {
    let parentBox = document.querySelector('.cate_left');
    let childBox = parentBox.querySelector('ul');
    let startY = 0;
    let distanceY = 0;
    let isMove = false;
    let currentY = 0; // 程序的核心点，当前的坐标
    childBox.addEventListener('touchstart', function(e) {
        startY = e.touches[0].clientY;
    })
    childBox.addEventListener('touchmove', function(e) {
        distanceY = e.touches[0].clientY - startY;
        isMove = true;
        let translateY = currentY + distanceY;
        childBox.style.transform = `translateY(${ translateY }px)`
        childBox.style.webkitTransform = `translateY(${ translateY }px)`
    })
    childBox.addEventListener('touchend', function(e) {
        currentY += distanceY; // 记录下当前的位移
    })
}
let rightSwipe = function() {

}
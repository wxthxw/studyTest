function hh() {
    let div = document.querySelector('div');
    let startTime = 0; // 开始时间
    let isMove = false; // 是否移动标识
    div.addEventListener('touchstart', function() {
        startTime = Date.now(); // 比new Date()更快
    })
    div.addEventListener('touchmove', function() {
        isMove = true;
    })
    div.addEventListener('touchend', function() {
        console.timeEnd('time'); // 去除某个参数和现在时间的差
        if (!isMove && (Date.now() - startTime) < 150) {
            // tap事件
        }
        isMove = false;
        startTime = 0;
    })
}
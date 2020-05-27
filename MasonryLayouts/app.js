$(document).ready(function() {
    $(window).on("load", function() { // 图片加载完成之后再显示
        ImgLocation();
        let dataImg = {"data": [{"src": '1.jpg'}, {"src": '2.jpg'}, {"src": '3.jpg'}]};
        $(window).scroll(function() { // 监听浏览器滚动事件
            if (getSideHeight) { // 如果需要增加数据的话
                $.each(dataImg.data, function(index, value) {
                    let pin = $("<div>").addClass("pin").appendTo("#main");
                    let box = $("<div>").addClass('box').appendTo(pin);
                    let img = $('<img>').attr("src", "img/"+ $(value).attr("src")).appendTo(box);
                })
                ImgLocation();
            }
        })
    })
})
function getSideHeight() {
    let box = $('.pin');
     // 获取最后一张图片距离顶端的高度 - 它自身高度的一半
    let lastImgHeight = (box.last().get(0)).offsetTop - Math.floor(box.last().height()/2);
    let documentHeight = $(document).height(); // 当前窗口的高度
    let scrollHeight = $(window).scrollTop(); // 获取窗口的滚动距离
    return (lastImgHeight < documentHeight + scrollHeight);
}
function ImgLocation() {
    let box = $(".pin"); // 返回的是元素集合
    let boxWidth = box.eq(0).width(); // 第一个图片盒子的宽度
    let num = Math.floor($(window).width()/boxWidth); // 一行可以放置的图片数量
    let numArr = []; // 图片对应的高度数组
    box.each(function(index, value) {
        let boxHeight = box.eq(index).height(); // 获取每张图片的高度
        if (index<num) { // 第一排
            numArr[index] = boxHeight;
        } else { // 超出第一排
            // 取到高度最低的图片
            let minboxHeight = Math.min.apply(null, numArr);
            // $.inArray(val,arr,index) => 根据值获取索引
            // 获取最小高度图片的索引值
            let minIndex = $.inArray(minboxHeight, numArr);
            $(value).css({
                position: "absolute",
                top: minboxHeight,
                left: box.eq(minIndex).position().left
            })
            numArr[minIndex] += box.eq(index).height(); // 追加后的新高度
        }
    })
}
// 放置工具方法
const getYearMonthDay = (date) => { // 获取年月日
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    return { year, month, day }
}
const getDate = (year, month, day) => {
    return new Date(year, month, day);
}
export {
    getYearMonthDay,
    getDate
}
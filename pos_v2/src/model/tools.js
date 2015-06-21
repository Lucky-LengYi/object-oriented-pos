function Tools() {
    this.format_time = function () {
        var date = new Date();
        var seperator2 = ":";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        var hour = date.getHours();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        if (hour < 10) {
            hour = "0" + hour;
        }
        var currentdate = date.getFullYear() + '年' + month + '月' + strDate +
                          "日 " + hour + seperator2 + date.getMinutes() +
                          seperator2 + date.getSeconds();
        return currentdate;
    };
}
module.exports = Tools;

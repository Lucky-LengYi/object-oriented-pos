function Tools() {
    this.format_time = function () {
        var now = new Date();

        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        var day = now.getDate();

        var hh = now.getHours();
        var mm = now.getMinutes();

        var clock = year + "年";

        if(month < 10)
            clock += "0";

        clock += month + "月";

        if(day < 10)
            clock += "0";

        clock += day + "日 ";

        if(hh < 10)
            clock += "0";

        clock += hh + ":";
        if (mm < 10) clock += '0';
        clock += mm;
        return clock;
    };
}
module.exports = Tools;

function Scanner() {

}

Scanner.prototype.scan = function (tag) {
    var info = tag.split("-");
    info[1] = parseFloat((info[1]) || 1);

    var result = {
        barcode : info[0],
        count : info[1]
    };

    return result;
};

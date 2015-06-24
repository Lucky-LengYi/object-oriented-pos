function Scanner() {

}

Scanner.prototype.scan = function (tag) {
    var result = tag.split("-");
    result[1] = parseFloat((result[1]) || 1);
    return result;
};

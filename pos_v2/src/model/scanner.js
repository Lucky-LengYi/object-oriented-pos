function Scanner() {
    this.calculate_count = function (tag) {
        var result = tag.split("-");
        result[1] = parseInt(result[1]) || 1;
        return result;
    };
}
module.exports = Scanner;

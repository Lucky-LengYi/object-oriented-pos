function Cart() {
    this.conclusion = {};
    this.group_by_barcode = function (item) {
        this.conclusion[item[0]] = this.conclusion[item[0]] || 0;
        this.conclusion[item[0]] += item[1];
    };
}
module.exports = Cart;

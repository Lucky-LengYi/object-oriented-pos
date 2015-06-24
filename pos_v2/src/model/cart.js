function Cart() {
    this.conclusion = {};
}

Cart.prototype.group_by_barcode = function (item) {
    this.conclusion[item[0]] = this.conclusion[item[0]] || 0;
    this.conclusion[item[0]] += item[1];
};

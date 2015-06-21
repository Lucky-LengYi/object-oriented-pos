function Promotion(type, barcodes, func) {
    this.type = type;
    this.barcodes = barcodes || [];
    this.to_reduce_price = func;
}
module.exports = Promotion;

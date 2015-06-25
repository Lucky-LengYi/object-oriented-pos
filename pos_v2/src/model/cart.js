function Cart() {
    this.cart_items = [];
}
Cart.prototype.get_cart_item = function(barcode, count) {
    var exist = false;
    var x;
    this.cart_items.forEach(function(item, i) {
        if (item.barcode === barcode) {
            exist = true;
            x = i;
        }
    });
    if (!exist) {
        this.cart_items.push(new CartItem(barcode, count));
    } else {
        this.cart_items[x].count += count;
    }
};

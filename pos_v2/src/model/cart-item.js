var CartItem = (function (barcode,count) {

    function find_item_by_barcode(barcode) {
        var all_item = loadAllItems();
        var result;
        all_item.forEach(function (item,i) {
            if (item.barcode === barcode) {
                result = item;
            }
        });
        return result;
    }

    function CartItem(barcode, count) {
        this.barcode = barcode;
        this.count = count;
        this.item = find_item_by_barcode(barcode);
        this.sum_price = 0;
        this.reduce = {};
    }

    CartItem.prototype.find_reduce = function () {
        var promotions = loadPromotions();
        var result;
        var temp = this;
        promotions.forEach(function(item, i) {
            result = PromotionFunc[item.type](temp);
        });
        this.reduce = result;
    };

    CartItem.prototype.calculate_sum_price = function () {
        this.sum_price = this.item.price * this.count;
    };

    return CartItem;

})();

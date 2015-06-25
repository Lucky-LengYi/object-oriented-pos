var PromotionFunc = (function() {

    function get_reduce_count(item) {
        var count = 0;
        var promotions = loadPromotions();
        barcodes = promotions[0].barcodes;

        barcodes.forEach(function(element, x) {
            if (item.barcode === element) {
                count = Math.floor(item.count / 3);
            }
        });

        return count;
    }

    var PromotionFunc = {};

    PromotionFunc.BUY_TWO_GET_ONE_FREE = function(cart_item) {
        var result = {};
        result.count = get_reduce_count(cart_item);
        result.price = result.count * cart_item.item.price;

        return result;
    };

    return PromotionFunc;
})();

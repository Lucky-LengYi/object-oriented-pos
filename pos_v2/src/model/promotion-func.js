var PromotionFunc = (function() {

    function get_reduce_item(item, i) {
        var result;
        var promotions = loadPromotions();
        barcodes = promotions[0].barcodes;
        barcodes.forEach(function (element,x) {
            if (item.barcode === element) {
                result = {
                    name: item.name,
                    count: Math.floor(item.count / 3),
                    unit: item.unit
                };
            }
        });

        return result;
    }

    var PromotionFunc = {};

    PromotionFunc.BUY_TWO_GET_ONE_FREE = function(collection) {
        var result = [];

        collection.forEach(function (item,i) {
            var temp = get_reduce_item(item, i);
            if (temp !== undefined) {
                result.push(temp);
                collection[i].sum_price = (item.count - Math.floor(item.count / 3)) * item.price;
            }
        });

        return result;
    };

    return PromotionFunc;
})();

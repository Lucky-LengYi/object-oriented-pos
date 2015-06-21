var load = require('../../spec/fixtures');
var _ = require('../my_lodash');

function Pos() {
    this.settlement_list = {};
    this.setllement = function (collection) {
        var all_item = load.loadAllItems();
        var price_list = [];
        _.each(collection,function (value,key) {
            _.each(all_item,function (value_a,key_a) {
                if (key === value_a.barcode) {
                    var temp = value_a;
                    temp.count = value;
                    temp.sum_price = temp.count * temp.price;
                    price_list.push(temp);
                }
            });
        });
        var promotions = load.loadPromotions();
        var promotions_result = [];
        var type;
        _.each(promotions,function (item,i) {
            type = item.type;
            promotions_result.push(item.to_reduce_price(price_list));
        });
        this.settlement_list.pay = price_list;
        this.settlement_list[type] = promotions_result;
    };
}

module.exports = Pos;

var _ = require('../src/my_lodash');
var Item = require('../src/model/item');

function loadAllItems() {
    return [
        new Item('ITEM000000', '可口可乐', '瓶', 3.00),
        new Item('ITEM000001', '雪碧', '瓶', 3.00),
        new Item('ITEM000002', '苹果', '斤', 5.50),
        new Item('ITEM000003', '荔枝', '斤', 15.00),
        new Item('ITEM000004', '电池', '个', 2.00),
        new Item('ITEM000005', '方便面', '袋', 4.50)
    ];
}

var Promotion = require('../src/model/promotion');

function loadPromotions() {
    return [
        new Promotion('BUY_TWO_GET_ONE_FREE', [
            'ITEM000000',
            'ITEM000001',
            'ITEM000005'
            ],
            function (collection) {
                var result = [];
                var promotions = loadPromotions();
                barcodes = promotions[0].barcodes;
                _.each(collection,function (item,i) {
                    _.each(barcodes,function (element,x) {
                        if (item.barcode === element) {
                            result.push(
                                {
                                    name:item.name,
                                    count:Math.floor(item.count / 3),
                                    unit:item.unit
                                }
                            );
                            collection[i].sum_price = (item.count - Math.floor(item.count / 3)) * item.price;
                        }
                    });
                });
                return result;
            }
        )
    ];
}

exports.loadAllItems = loadAllItems;
exports.loadPromotions = loadPromotions;

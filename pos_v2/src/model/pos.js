var load = require('../../spec/fixtures');
var Tools = require('./tools');
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
        var promotions_result;
        var type;
        _.each(promotions,function (item,i) {
            type = item.type;
            promotions_result = item.to_reduce_price(price_list);
        });
        this.settlement_list.pay = price_list;
        this.settlement_list[type] = promotions_result;
    };
    this.print_the_list = function () {
        var result = '***<没钱赚商店>购物清单***\n';
        result += "打印时间：";
        var tools = new Tools();
        result += tools.format_time() + '\n' +
                  '----------------------\n';

        var sum_price = 0;
        var gift_price = 0;
        _.each(this.settlement_list,function (value,key) {
            if (key === 'pay') {
                _.each(value,function (item,i) {
                    result += "名称：" + item.name + "，" +
                              "数量：" + item.count + item.unit + "，" +
                              "单价：" + item.price.toFixed(2) + "(元)，" +
                              "小计：" + item.sum_price.toFixed(2) + "(元)\n";
                    sum_price += item.sum_price;
                    gift_price += item.count * item.price - item.sum_price;
                });
            }
            if (key === 'BUY_TWO_GET_ONE_FREE') {
                result += '----------------------\n' +
                '挥泪赠送商品：\n';
                _.each(value,function (item,i) {
                    result += "名称：" + item.name + "，" +
                              "数量：" + item.count + item.unit + "\n";
                });
            }
        });
        result += '----------------------\n' +
                  "总计：" + sum_price.toFixed(2) + "(元)\n" +
                  "节省：" + gift_price.toFixed(2) + "(元)\n";

        result += '**********************';

        return result;
    };
}

module.exports = Pos;

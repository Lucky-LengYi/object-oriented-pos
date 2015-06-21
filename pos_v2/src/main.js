var load = require('../spec/fixtures');
var Scanner = require('./model/scanner');
var Cart = require('./model/cart');
var _ = require('./my_lodash');
var Pos = require('./model/pos');

function printInventory(collection) {
    var scanner = new Scanner();
    var cart = new Cart();
    _.each(collection,function (tag,i) {
        cart.group_by_barcode(scanner.calculate_count(tag));
    });
    var pos = new Pos();
    pos.setllement(cart.conclusion);
    pos.print_the_list();
    return pos.settlement_list;
}
    // var group_to_sum = get_group_to_sum(collection);
    // console.log(group_to_sum);
    // var shopping_cart = [];
    // each(group_to_sum,function (value,key) {
    //     shopping_cart.push(get_one_item(value,key));
    // });
    // each(shopping_cart,function (value,key) {
    //     shopping_cart[key].sum_price = calculate_sum_price(value);
    // });
    // var gift_item = [];
    // each(shopping_cart,function (value,key) {
    //     if (get_gift_item(value,key) !== undefined) {
    //         gift_item.push(get_gift_item(value,key));
    //     }
    // });
    // return get_pos(shopping_cart,gift_item);

function get_pos(shopping_cart,gift_item) {
    var result = '***<没钱赚商店>购物清单***\n';
    result += "打印时间：";
    result += time() + '\n' +
              '----------------------\n';

    var sum_price = 0;
    var gift_price = 0;

    each(shopping_cart,function (item,i) {
        result += "名称：" + shopping_cart[i].name + "，" +
                  "数量：" + shopping_cart[i].count + shopping_cart[i].unit + "，" +
                  "单价：" + shopping_cart[i].price.toFixed(2) + "(元)，" +
                  "小计：" + shopping_cart[i].sum_price.toFixed(2) + "(元)\n";
        sum_price += shopping_cart[i].sum_price;
        gift_price += shopping_cart[i].count * shopping_cart[i].price - shopping_cart[i].sum_price;
    });

    result += '----------------------\n' +
    '挥泪赠送商品：\n';

    each(gift_item,function (item,i) {
        result += "名称：" + gift_item[i].name + "，" +
                  "数量：" + gift_item[i].count + gift_item[i].unit + "\n";
    });

    result += '----------------------\n' +
              "总计：" + sum_price.toFixed(2) + "(元)\n" +
              "节省：" + gift_price.toFixed(2) + "(元)\n";

    result += '**********************';

    return result;
}


function time() {
    var date = new Date();
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    var hour = date.getHours();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    if (hour < 10) {
        hour = "0" + hour;
    }
    var currentdate = date.getFullYear() + '年' + month + '月' + strDate +
                      "日 " + hour + seperator2 + date.getMinutes() +
                      seperator2 + date.getSeconds();
    return currentdate;
}

module.exports = printInventory;

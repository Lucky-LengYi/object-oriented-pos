var load = require('../spec/fixtures');
var Scanner = require('./model/scanner');
var Cart = require('./model/cart');

function printInventory(collection) {
    var scanner = new Scanner();
    var cart = new Cart();
    each(collection,function (tag,i) {
        cart.group_by_barcode(scanner.calculate_count(tag));
    });
    return cart.conclusion;
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
function get_gift_item(object) {
    var promotions = $.loadPromotions();
    var result;
    each(promotions[0].barcodes,function (value,key) {
        if (object.barcode === value) {
            result = new Gift_item(object.name,Math.floor(object.count / 3),object.unit);
        }
    });
    return result;
}
function calculate_sum_price(object) {
    var sum_price;
    var promotions = $.loadPromotions();
    each(promotions[0].barcodes,function (value,key) {
        if (object.barcode === value) {
            sum_price = (object.count - Math.floor(object.count / 3)) * object.price;
        }
    });
    if (sum_price === undefined) {
        sum_price = object.count * object.price;
    }
    return sum_price;
}
function Gift_item(name,count,unit) {
    this.name = name;
    this.count = count;
    this.unit = unit;
}
function Item(barcode,name, count, unit, price) {
    this.barcode = barcode;
    this.name = name;
    this.count = count;
    this.unit = unit;
    this.price = price || 0.00;
}

function get_one_item(value,key) {
    var result;
    var all_item = $.loadAllItems();
    each(all_item,function (value_a,key_a) {
        if (key === value_a.barcode) {
            result = new Item(value_a.barcode,value_a.name,value,value_a.unit,value_a.price);
        }
    });
    return result;
}
function get_group_to_sum(collection) {
    var result;
    result = _(collection).group(function (item,i) {
        return item.split("-")[0];
    }).value();
    each(result,function (item,i) {
        result[i] = _(item).map(function (item_a,i) {
            return parseInt(item_a.split("-")[1]) || 1;
        }).value();
    });
    each(result,function (item,i) {
        result[i] = sum(item);
    });

    return result;
}
function each(collection,func) {
    if (Array.isArray(collection)) {
        for (var i = 0; i < collection.length; i++) {
            func(collection[i],i);
        }
    }else {
        for (var x in collection) {
            func(collection[x],x);
        }
    }
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

function reduce(collection,func) {
    var temp;
    each(collection,function (item,i) {
        if (i === 0) {
            temp = item;
        }else{
            temp = func(temp,item);
        }
    });
}

function sum(collection) {
    var result;
    if (collection.length === 1) {
        result = collection[0];
    }else {
        reduce(collection,function (num_a,num_b) {
            result = num_a + num_b;
            return result;
        });
    }
    return result;
}

function _(collection) {
    if(!(this instanceof _)) {
        return new _(collection);
    }
    this.collection = collection;
}

_.prototype = {
    each: function (func) {
        each(this.collection,func);
    },
    filter: function (func) {
        var result = [];
        this.each(function (item,i) {
            if (func(item,i)) {
                result.push(item);
            }
        });
        this.collection = result;
        return this;
    },
    map: function (func) {
        var result = [];
        this.each(function (item,i) {
            result.push(func(item,i));
        });
        this.collection = result;
        return this;
    },
    group: function (func) {
        var result = {};
        this.each(function (item,i) {
            result[func(item,i)] = result[func(item,i)] || [];
            result[func(item,i)].push(item);
        });
        this.collection = result;
        return this;
    },
    value: function () {
        return this.collection;
    }
};
module.exports = printInventory;

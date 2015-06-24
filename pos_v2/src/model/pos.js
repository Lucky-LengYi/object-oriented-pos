var Pos = (function() {

    function Pos() {
        this.settlement_list = {};
    }

    Pos.prototype.setllement = function(object) {
        var price_list = [];

        console.log(object);
        for (var key in object) {
            price_list.push(find_pay_item(object[key],key));
        }

        var promotions = loadPromotions();
        var promotions_result;
        var type;

        promotions.forEach(function (item,i) {
            type = item.type;
            promotions_result = PromotionFunc[type](price_list);
        });

        this.settlement_list.pay = price_list;
        this.settlement_list[type] = promotions_result;
    };

    Pos.prototype.print_the_list = function() {
        var result = '***<没钱赚商店>购物清单***\n';
        result += "打印时间：";
        result += Tools.format_time() + '\n' +
            '----------------------\n';

        result += get_pay_list(this.settlement_list.pay);
        result += get_promotion_list(this.settlement_list.BUY_TWO_GET_ONE_FREE);
        result += get_sum_price_list(this.settlement_list.pay);

        return result;
    };

    function find_pay_item(value, key) {
        var all_item = loadAllItems();
        var temp;

        all_item.forEach(function (value_a,key_a) {
            if (key === value_a.barcode) {
                temp = value_a;
                temp.count = value;
                temp.sum_price = temp.count * temp.price;
            }
        });

        return temp;
    }

    function get_pay_list(pay_list) {
        var result = '';

        pay_list.forEach(function (item,i) {
            result += "名称：" + item.name + "，" +
                "数量：" + item.count + item.unit + "，" +
                "单价：" + item.price.toFixed(2) + "(元)，" +
                "小计：" + item.sum_price.toFixed(2) + "(元)\n";
        });

        return result;
    }

    function get_promotion_list(promoton_list) {
        var result = '----------------------\n' +
            '挥泪赠送商品：\n';

        promoton_list.forEach(function (item,i) {
            result += "名称：" + item.name + "，" +
                "数量：" + item.count + item.unit + "\n";
        });

        return result;
    }

    function get_sum_price_list(pay_list) {
        var sum_price = 0;
        var reduce_price = 0;

        pay_list.forEach(function (item,i) {
            sum_price += item.sum_price;
            reduce_price += item.count * item.price - item.sum_price;
        });

        var result = '----------------------\n' +
            "总计：" + sum_price.toFixed(2) + "(元)\n" +
            "节省：" + reduce_price.toFixed(2) + "(元)\n";

        result += '**********************';

        return result;
    }

    return Pos;
})();

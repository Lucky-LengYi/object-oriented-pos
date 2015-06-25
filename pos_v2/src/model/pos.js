var Pos = (function() {

    var Pos = {};

    Pos.print_the_list = function(cart_list) {
        var result = '***<没钱赚商店>购物清单***\n';
        result += "打印时间：";
        result += Tools.format_time() + '\n' +
            '----------------------\n';

        result += get_pay_list(cart_list);
        result += get_promotion_list(cart_list);
        result += get_sum_price_list(cart_list);

        return result;
    };

    function get_pay_list(cart_list) {
        var result = '';

        cart_list.forEach(function(element, i) {
            element.find_reduce();
            element.calculate_sum_price();
            console.log(element);
            result += "名称：" + element.item.name + "，" +
                "数量：" + element.count + element.item.unit + "，" +
                "单价：" + element.item.price.toFixed(2) + "(元)，" +
                "小计：" + (element.sum_price - element.reduce.price).toFixed(2) + "(元)\n";
        });

        return result;
    }

    function get_promotion_list(cart_list) {
        var reduce = false;

        var result = '----------------------\n' +
            '挥泪赠送商品：\n';

        cart_list.forEach(function(element, i) {
            element.find_reduce();
            if (element.reduce.count > 0) {
                result += "名称：" + element.item.name + "，" +
                    "数量：" + element.reduce.count + element.item.unit + "\n";
                reduce = true;
            }
        });
        if (reduce) {
            return result;
        } else {
            return '';
        }
    }

    function get_sum_price_list(cart_list) {
        var sum_price = 0;
        var reduce_price = 0;

        cart_list.forEach(function(element, i) {
            element.find_reduce();
            element.calculate_sum_price();

            sum_price += element.sum_price - element.reduce.price;
            reduce_price += element.reduce.price;
        });

        var result = '----------------------\n' +
            "总计：" + sum_price.toFixed(2) + "(元)\n" +
            "节省：" + reduce_price.toFixed(2) + "(元)\n";

        result += '**********************';

        return result;
    }

    return Pos;
})();

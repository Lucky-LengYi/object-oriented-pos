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
    return pos.print_the_list();
}

module.exports = printInventory;

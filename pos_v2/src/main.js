function printInventory(collection) {
    var scanner = new Scanner();
    var cart = new Cart();

    collection.forEach(function(tag) {
        var temp = scanner.scan(tag);
        cart.get_cart_item(temp.barcode, temp.count);
    });

    console.log(Pos.print_the_list(cart.cart_items));

}

function printInventory(collection) {
    var cart = new Cart();
    var scanner = new Scanner();

    collection.forEach(function(tag, i) {
        cart.group_by_barcode(scanner.scan(tag));
    });

    var pos = new Pos();
    pos.setllement(cart.conclusion);

    console.log(pos.print_the_list());
}

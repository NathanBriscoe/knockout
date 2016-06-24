/**
 * Created by NathanBriscoe on 6/24/16.
 */
var viewModel = {
    newItemName: ko.observable(),
    newItemPrice: ko.observable(0.25),
    newItemQuantity: ko.observable(1),
    addNewItem: function () {
        //this creates the new item
        var newItem = {
            name: ko.observable(this.newItemName()),
            price: ko.observable(this.newItemPrice()),
            quantity: ko.observable(this.newItemQuantity())
        };
        //these boom-a-rang to the DOM
        this.itemsInCart.push(newItem);
        this.newItemName("");
        this.newItemPrice(0);
        this.newItemQuantity(0);
        //sort items here
        this.itemsInCart = this.itemsInCart.sort(function(a,b){
            var a1 = a.name().toLowerCase();
            var b1 = b.name().toLowerCase();
            return a1.localeCompare(b1);
        })
    },
    //Remove selected item from array
    removeItem: function(item) {
        viewModel.itemsInCart.remove(item)
    },
    showPrice: function(){
        if(viewModel.newItemName() == !null)
            return true;
    },
    //the cart storage
    itemsInCart: ko.observableArray([])
};

//whenever any events fire including keyups, downs,..etc this part updates
viewModel.addNewItemEnabled = ko.pureComputed(function() {
    var name = this.newItemName(),
        price = this.newItemPrice(),
        quantity = this.newItemQuantity();
    return name && name.length;
}, viewModel);

//combine cost of added prices here
viewModel.combinedCost = ko.computed(function() {
    var total = 0;
    for (var i = 0; i <= viewModel.itemsInCart().length - 1; i++) {
        total += parseFloat(viewModel.itemsInCart()[i].price() * viewModel.itemsInCart()[i].quantity());
    }
    return total;
}, viewModel);

ko.applyBindings(viewModel);
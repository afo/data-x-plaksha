pragma solidity ^0.4.13;


contract Amazon {
    uint public skuCount;
    mapping (uint => Item) public items;

    enum State { ForSale, Sold, Shipped, Received }

    struct Item {
        string name;
        uint sku;
        uint price;
        State state;
        address seller;
        address buyer;
    }

    event ForSale(uint sku);
    event Sold(uint sku);
    event Shipped(uint sku);
    event Received(uint sku);

    modifier isOwner (address owner) {require(msg.sender == owner); _;}
    modifier paidEnough(uint value) {require(value <= msg.value); _;}

    modifier checkValue(uint amount) {
        _;
        if (msg.value > amount) {
            uint amountToRefund = amount - msg.value;
            msg.sender.transfer(amountToRefund);
        }
    }

    modifier forSale (uint sku) {require(items[sku].state == State.ForSale); _;}
    modifier sold (uint sku) {require(items[sku].state == State.Sold); _;}
    modifier shipped (uint sku) {require(items[sku].state == State.Shipped); _;}
    modifier received (uint sku) {require(items[sku].state == State.Received); _;}


    function Amazon() {
        skuCount = 0;
    }

    function addItem(string _name, uint _price) {
        ForSale(skuCount);
        skuCount = skuCount + 1;
        items[skuCount] = Item({
            name: _name, 
            sku: skuCount, 
            price: _price, 
            state: State.ForSale,
            seller: msg.sender, 
            buyer: msg.sender
        });
    }

    function buyItem(uint sku) payable
    forSale(sku)
    paidEnough(items[sku].price)
    checkValue(items[sku].price) 
    {
        Sold(sku);
        items[sku].seller.transfer(msg.value);
        items[sku].buyer = msg.sender;
        items[sku].state = State.Sold;
    }

    function shipItem(uint sku)
    isOwner(items[sku].seller)
    sold(sku) 
    {
        Shipped(sku);
        items[sku].state = State.Shipped;
    }

    function receiveItem(uint sku)
    isOwner(items[sku].buyer)
    shipped(sku) 
    {
        Received(sku);
        items[sku].state = State.Received;
    }

    function fetchLast() returns (string name, uint sku, uint price, uint state, address seller, address buyer) {
        name = items[skuCount].name;
        sku = items[skuCount].sku;
        price = items[skuCount].price;
        state = uint(items[skuCount].state);
        seller = items[skuCount].seller;
        buyer = items[skuCount].buyer;
        return (name, sku, price, state, seller, buyer);
    }

}

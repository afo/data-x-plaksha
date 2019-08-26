var Amazon = artifacts.require('Amazon');

contract('Amazon', function(accounts) {

  const owner = accounts[0];
  const alice = accounts[1];
  const bob = accounts[2];

  it("should add one item", async () => {
    let amazon = await Amazon.deployed();

    const addedItem = await amazon.addItem("Spoon", web3.toWei('10', 'ether'), {from: alice});
    sku = await amazon.skuCount();
    const item = await amazon.fetchLast.call();

    const expectedItem = {name: "Spoon", sku: sku.toString(), price: web3.toWei('10', 'ether'), state: 0};
    assert.equal(item[0], expectedItem.name, 'item name incorrect, check addItem/queryItem');
    assert.equal(item[1].toString(), expectedItem.sku, 'item sku incorrect, check addItem/queryItem');
    assert.equal(item[2].toString(), expectedItem.price, 'item price incorrect, check addItem/queryItem');
    assert.equal(item[3].toString(), expectedItem.state, 'item state incorrect, check addItem/queryItem');
  });

  it("should sell one item", async () => {
    let amazon = await Amazon.deployed();
    const sku = await amazon.skuCount();

    await amazon.buyItem(sku, {from: bob, value: web3.toWei('10', 'ether')});

    const expectedItem = {name: "Spoon", sku: sku.toString(), price: web3.toWei('10', 'ether'), state: 1};
    const item = await amazon.fetchLast.call();
    assert.equal(item[0], expectedItem.name, 'item name incorrect, check buyItem/queryItem');
    assert.equal(item[1].toString(), expectedItem.sku, 'item sku incorrect, check buyItem/queryItem');
    assert.equal(item[2], expectedItem.price, 'item price incorrect, check buyItem/queryItem');
    assert.equal(item[3], expectedItem.state, 'item state incorrect, check buyItem/queryItem');
  });

  it("should ship one item", async () => {
    let amazon = await Amazon.deployed();

    const sku = await amazon.skuCount();
    await amazon.shipItem(sku, {from: alice});

    const expectedItem = {name: "Spoon", sku: sku.toString(), price: web3.toWei('10', 'ether'), state: 2};
    const item = await amazon.fetchLast.call();

    assert.equal(item[0], expectedItem.name, 'item name incorrect, check shipItem/queryItem');
    assert.equal(item[1].toString(), expectedItem.sku, 'item sku incorrect, check shipItem/queryItem');
    assert.equal(item[2], expectedItem.price, 'item price incorrect, check shipItem/queryItem');
    assert.equal(item[3], expectedItem.state, 'item state incorrect, check shipItem/queryItem');
  });

  it("should receive one item", async () => {
    let amazon = await Amazon.deployed();

    const sku = await amazon.skuCount();
    await amazon.receiveItem(sku, {from: bob});

    const expectedItem = {name: "Spoon", sku: sku.toString(), price: web3.toWei('10', 'ether'), state: 3};
    const item = await amazon.fetchLast.call();
    assert.equal(item[0], expectedItem.name, 'item name incorrect, check receiveItem/queryItem');
    assert.equal(item[1].toString(), expectedItem.sku, 'item sku incorrect, check receiveItem/queryItem');
    assert.equal(item[2], expectedItem.price, 'item price incorrect, check receiveItem/queryItem');
    assert.equal(item[3], expectedItem.state, 'item state incorrect, check receiveItem/queryItem');
  });
});

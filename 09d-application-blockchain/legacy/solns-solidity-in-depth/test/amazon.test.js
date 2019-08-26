var Amazon = artifacts.require('Amazon');

contract('Amazon', function (accounts) {

  const owner = accounts[0];
  const alice = accounts[1];
  const bob = accounts[2];

  it("should add one item", async () => {
    let amazon = await Amazon.deployed();

    const addedItem = await amazon.addItem("Spoon", web3.toWei('10', 'ether'), { from: alice });
    sku = await amazon.skuCount();
    const item = await amazon.fetchLast.call();

    const expectedItem = { name: "Spoon", sku: sku, price: web3.toWei('10', 'ether'), state: web3.toBigNumber(0) };
    assert.equal(item[0], expectedItem.name, 'item name incorrect, check addItem/queryItem');
    assert.isOk(item[1].equals(expectedItem.sku), 'item sku incorrect, check addItem/queryItem');
    assert.isOk(item[2].equals(expectedItem.price), 'item price incorrect, check addItem/queryItem');
    assert.isOk(item[3].equals(expectedItem.state), 'item state incorrect, check addItem/queryItem');
    return;
  });

  it("should sell one item", async () => {
    let amazon = await Amazon.deployed();
    const sku = await amazon.skuCount();

    await amazon.buyItem(sku, { from: bob, value: web3.toWei('10', 'ether') });

    const expectedItem = { name: "Spoon", sku: sku, price: web3.toWei('10', 'ether'), state: web3.toBigNumber(1) };
    const item = await amazon.fetchLast.call();
    
    assert.equal(item[0], expectedItem.name, 'item name incorrect, check buyItem/queryItem');
    assert.isOk(item[1].equals(expectedItem.sku), 'item sku incorrect, check buyItem/queryItem');
    assert.isOk(item[2].equals(expectedItem.price), 'item price incorrect, check buyItem/queryItem');
    assert.isOk(item[3].equals(expectedItem.state), 'item state incorrect, check buyItem/queryItem');
    return;
  });

  it("should ship one item", async () => {
    let amazon = await Amazon.deployed();

    const sku = await amazon.skuCount();
    await amazon.shipItem(sku, { from: alice });

    const expectedItem = { name: "Spoon", sku: sku, price: web3.toWei('10', 'ether'), state: web3.toBigNumber(2) };
    const item = await amazon.fetchLast.call();

    assert.equal(item[0], expectedItem.name, 'item name incorrect, check shipItem/queryItem');
    assert.isOk(item[1].equals(expectedItem.sku), 'item sku incorrect, check shipItem/queryItem');
    assert.isOk(item[2].equals(expectedItem.price), 'item price incorrect, check shipItem/queryItem');
    assert.isOk(item[3].equals(expectedItem.state), 'item state incorrect, check shipItem/queryItem');
    return;
  });

  it("should receive one item", async () => {
    let amazon = await Amazon.deployed();

    const sku = await amazon.skuCount();
    await amazon.receiveItem(sku, { from: bob });

    const expectedItem = { name: "Spoon", sku: sku, price: web3.toWei('10', 'ether'), state: web3.toBigNumber(3) }
    const item = await amazon.fetchLast.call();
    assert.equal(item[0], expectedItem.name, 'item name incorrect, check receiveItem/queryItem');
    assert.isOk(item[1].equals(expectedItem.sku), 'item sku incorrect, check receiveItem/queryItem');
    assert.isOk(item[2].equals(expectedItem.price), 'item price incorrect, check receiveItem/queryItem');
    assert.isOk(item[3].equals(expectedItem.state), 'item state incorrect, check receiveItem/queryItem');
    return;
  });
});

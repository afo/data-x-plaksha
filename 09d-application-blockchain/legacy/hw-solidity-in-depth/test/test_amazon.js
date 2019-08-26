const Amazon = artifacts.require('Amazon')

contract('Amazon', function(accounts) {

  const owner = accounts[0]
  const alice = accounts[1]
  const bob = accounts[2]
  const events = {
    ForSale: 'ForSale'
  }

  it("should add, sell, ship, receive one item", async () => {
    let amazon = await Amazon.deployed()

    await amazon.addItem("Spoon", 10)

    // .then(function(instance) {
    //   amazon = instance;
    //   return new Promise(function(resolve, reject) {
    //     resolve(instance.addItem("Spoon", web3.toBigNumber(10), {from: owner}));
    //   });
    // })
    // .then(function(txReceipt) {
    //   var events = amazon.allEvents();
    //   return new Promise(function(resolve, reject) {
    //     events.watch(function(error, log){ resolve(log);});
    //   });
    // })
    // .then(function(log) {
    //   assert.equal(log.args.sku, 1, "should emit ForSale event when adding item");
    //   return new Promise(function(resolve, reject) {
    //     resolve(amazon.queryItem.call(1));
    //   });
    // })
  })


})

var SimpleBank = artifacts.require("./SimpleBank.sol");

contract('SimpleBank', function(accounts) {

  const owner = accounts[0]
  const alice = accounts[1];
  const bob = accounts[2];

  it("should put 1000 tokens in the first and second account", async () => {
    const bank = await SimpleBank.deployed();

    await bank.enroll({from: alice});
    await bank.enroll({from: bob});

    const aliceBalance = await bank.balance({from: alice});
    assert.equal(aliceBalance, 1000, 'enroll balance is incorrect, check balance method or constructor');

    const bobBalance = await bank.balance({from: bob});
    assert.equal(bobBalance, 1000, 'enroll balance is incorrect, check balance method or constructor');

    const ownerBalance = await bank.balance({from: owner});
    assert.equal(ownerBalance, 0, 'only enrolled users should have balance, check balance method or constructor')
  });

  it("should deposit correct amount", async () => {
    const bank = await SimpleBank.deployed();
    const deposit = web3.toBigNumber(2);

    await bank.enroll({from: alice});
    await bank.enroll({from: bob});

    await bank.deposit(deposit, {from: alice});
    const balance = await bank.balance({from: alice});
    assert.equal(deposit.plus(1000).toString(), balance, 'deposit amount incorrect, check deposit method');

    const expectedEventResult = {accountAddress: alice.address, amount: deposit};

    const LogDepositMade = await bank.allEvents();
    const log = await new Promise(function(resolve, reject) {
        LogDepositMade.watch(function(error, log){ resolve(log);});
    });

    const logAccountAddress = log.args.accountAddress;
    const logAmount = log.args.amount;
    assert.equal(expectedEventResult.accountAddress, expectedEventResult.accountAddress, "LogDepositMade event accountAddress property not emmitted, check deposit method");
    assert.equal(expectedEventResult.amount, expectedEventResult.amount, "LogDepositMade event amount property not emmitted, check deposit method");
  });

  it("should withdraw correct amount", async () => {
    const bank = await SimpleBank.deployed();
    const deposit = web3.toBigNumber(2);

    await bank.enroll({from: alice});
    await bank.enroll({from: bob});

    await bank.deposit(deposit, {from: alice});
    await bank.withdraw(deposit, {from: alice});
    let balance = await bank.balance({from: alice});
    
    assert.isOk(web3.toBigNumber(1000).equals(balance), 'withdraw amount incorrect, check withdraw method for deposit + withdrawal');
    
    await bank.withdraw(deposit.times(1000000000), { from: alice });
    balance = await bank.balance({ from: alice });
    assert.isOk(web3.toBigNumber(1000).equals(balance), 'withdraw amount incorrect, check withdraw method for insufficient balance');
    
    await bank.withdraw(deposit.times(10), { from: alice });
    balance = await bank.balance({ from: alice });
    assert.isOk(web3.toBigNumber(1000).minus(deposit.times(10)).equals(balance), 'withdraw amount incorrect, check withdraw method for withdrawal');
  });


});

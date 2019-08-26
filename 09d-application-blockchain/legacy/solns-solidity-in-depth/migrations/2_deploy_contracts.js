var SimpleBank = artifacts.require("./SimpleBank.sol");
var Amazon = artifacts.require("./Amazon.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleBank);
  deployer.deploy(Amazon);
};

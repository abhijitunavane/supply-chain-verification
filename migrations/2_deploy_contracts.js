var ProductStorage = artifacts.require("./ProductStorage.sol");

module.exports = function(deployer) {
  deployer.deploy(ProductStorage);
};

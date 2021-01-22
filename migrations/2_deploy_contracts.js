const DStorage = artifacts.require("./DStorage.sol");

module.exports = (deployer) => {
  deployer.deploy(DStorage);
};

const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("Faucet", function () {
    // Contracts are deployed using the first signer/account by default

    async function deployContractAndSetVariables() {
      const [owner, address1] = await ethers.getSigners();
      const _value = ethers.utils.parseEther("10");
      let withdrawAmount = ethers.utils.parseUnits("1", "ether");
    
      const Faucet = await ethers.getContractFactory("Faucet");
      const faucet = await Faucet.deploy( { value: _value } );

      console.log('Owner address: ', owner.address);
      console.log('Address1 address: ', address1.address);
      return { faucet, owner, address1, withdrawAmount };
    }

    it('should deploy and set the owner correctly', async function () {
      const { faucet, owner } = await loadFixture(deployContractAndSetVariables);
  
      expect(await faucet.owner()).to.equal(owner.address);
    });

    it('should have a contract blance of 10 Ether', async function () {
      const { faucet } = await loadFixture(deployContractAndSetVariables);

      expect(await ethers.provider.getBalance(faucet.address)).to.equal(ethers.utils.parseEther("10"));
    });

    it('should not allow withdrawals above .1 ETH at a time', async function () {
      const { faucet, withdrawAmount } = await loadFixture(deployContractAndSetVariables);
      
      await expect(faucet.withdraw(withdrawAmount)).to.be.reverted;
    });
});

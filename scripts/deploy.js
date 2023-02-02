
const hre = require("hardhat");

async function main() {

  const _value = hre.ethers.utils.parseEther("10");

  const Faucet = await hre.ethers.getContractFactory("Faucet");
  const faucet = await Faucet.deploy({ value: _value });

  await faucet.deployed();

  console.log(
    `Faucet deployed to ${faucet.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

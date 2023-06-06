// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
 
  const RewardSystemFactory = await hre.ethers.getContractFactory("RewardSystemFactory");
  const rewardSystemFactory = await RewardSystemFactory.deploy();

  await rewardSystemFactory.deployed();
  console.log(`rewardSystemFactory deployed to ${rewardSystemFactory.address}` );
  
  //wait for 5 block transactions to ensure deployment before verifying
  await rewardSystemFactory.deployTransaction.wait(3);

  //verify (source: https://hardhat.org/hardhat-runner/plugins/nomiclabs-hardhat-etherscan#using-programmatically)
  await hre.run("verify:verify", {
     address: rewardSystemFactory.address,
     contract: "contracts/RewardSystemFactory.sol:RewardSystemFactory", //Filename.sol:ClassName
     constructorArguments: [],
  });
}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

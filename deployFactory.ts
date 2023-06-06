import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deployAndVerify: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, ethers } = hre;
  const { deploy, execute, read, getArtifact } = deployments;

  // Deploy the factory contract
  const { deployer } = await ethers.getNamedSigners();
  const factory = await deploy("Factory", {
    from: deployer.address,
    args: [/* constructor arguments if any */],
    log: true,
  });

  // Verify the deployed contract
  const factoryArtifact = await getArtifact("Factory");
  await hre.run("verify:verify", {
    address: factory.address,
    constructorArguments: factoryArtifact.abiConstructor ?? [],
  });

  // Additional post-deployment tasks if needed
  // ...

  // Example of calling a function on the deployed contract
  const instance = await ethers.getContractAt(factoryArtifact.abi, factory.address);
  const result = await instance.someFunction(/* function arguments if any */);
  console.log("Result:", result);
};

deployAndVerify.tags = ["Factory"];
export default deployAndVerify;

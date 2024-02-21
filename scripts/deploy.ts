import { ethers } from "hardhat";

async function main() {


  const TokenSwap = await ethers.deployContract("TokenSwap");

  await TokenSwap.waitForDeployment();

  console.log(
    `TokenSwap  eployed to ${TokenSwap.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

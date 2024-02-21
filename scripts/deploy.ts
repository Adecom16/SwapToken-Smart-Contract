import { ethers } from "hardhat";

async function main() {
  const token1 = await ethers.deployContract("Token1");

  await token1.waitForDeployment();

  console.log(`Token A Contract address: ${token1.target}`);

  const token2 = await ethers.deployContract("Token2");

  await token2.waitForDeployment();

  console.log(`Token A Contract address: ${token2.target}`);

  const tokenSwap = await ethers.deployContract("TokenSwap", [
    token1.target,
    token2.target,
  ]);

  await tokenSwap.waitForDeployment();

  console.log(`Token A Contract address: ${tokenSwap.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
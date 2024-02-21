
import "chai";

const { expect } = require("chai");

describe("TokenSwap", function () {
  let token1, token2, tokenSwap, owner, addr1, addr2;

  beforeEach(async function () {
    token1 = await token1.deploy("Token1", "TK1", 18, 1000000);
    token2 = await token2.deploy("Token2", "TK2", 18, 1000000);

    // Deploy the TokenSwap contract
    tokenSwap = await ethers.getContractFactory("TokenSwap");
    tokenSwap = await tokenSwap.deploy(token1.address, token2.address);

    // Get the owner and two other accounts
    [owner, addr1, addr2] = await ethers.getSigners();

    // Transfer some tokens to addr1 and tokenSwap
    await token1.transfer(addr1.address, 1000);
    await token2.transfer(tokenSwap.address, 1000);
  });

  it("should swap tokens correctly", async function () {
    // Approve the tokenSwap to spend addr1's tokens
    await token1.connect(addr1).approve(tokenSwap.address, 500);

    // Swap 500 tokens from addr1
    await tokenSwap.connect(addr1).swap(500);

    // Check the balances after the swap
    expect(await token1.balanceOf(addr1.address)).to.equal(500);
    expect(await token2.balanceOf(addr1.address)).to.equal(500);
    expect(await token1.balanceOf(tokenSwap.address)).to.equal(500);
    expect(await token2.balanceOf(tokenSwap.address)).to.equal(500);
  });

  it("should revert if the sender has insufficient balance of token1", async function () {
    // Approve the tokenSwap to spend addr2's tokens
    await token1.connect(addr2).approve(tokenSwap.address, 500);

    // Try to swap 500 tokens from addr2
    await expect(tokenSwap.connect(addr2).swap(500)).to.be.revertedWith(
      "Insufficient balance of token1"
    );
  });

  it("should revert if the contract has insufficient balance of token2", async function () {
    // Approve the tokenSwap to spend addr1's tokens
    await token1.connect(addr1).approve(tokenSwap.address, 2000);

    // Try to swap 2000 tokens from addr1
    await expect(tokenSwap.connect(addr1).swap(2000)).to.be.revertedWith(
      "Insufficient balance of token2"
    );
  });
});

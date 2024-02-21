// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract TokenSwap {
    IERC20 public token1;
    IERC20 public token2;
    address public owner;
    
    constructor(address _tokenAddress1, address _tokenAddress2) {
        token1 = IERC20(_tokenAddress1);
        token2 = IERC20(_tokenAddress2);
        owner = msg.sender;
    }
    
    function swap(uint amount) external {
        require(token1.balanceOf(msg.sender) >= amount, "Insufficient balance of token1");
        require(token2.balanceOf(address(this)) >= amount, "Insufficient balance of token2");
        
        token1.transferFrom(msg.sender, address(this), amount);
        token2.transfer(msg.sender, amount);
    }
}

// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract TokenSwap {
    address Token1;
    address Token2;

    mapping(address => uint256) public Token1Deposit;

    mapping(address => uint256) public Token2Deposit;

    constructor(address _token1, address _token2) {
        Token1 = _token1;
        Token2 = _token2;
    }

    function AddLiquidity(
        uint256 _amountToken1,
        uint256 _amountToken2
    ) external {
        require(
            IERC20(Token1).transferFrom(
                msg.sender,
                address(this),
                _amountToken1
            ),
            "Deposit Faild for Token1"
        );
        require(
            IERC20(Token2).transferFrom(
                msg.sender,
                address(this),
                _amountToken2
            ),
            "Deposit Failed for Token2"
        );
        Token1Deposit[msg.sender] = _amountToken1;
        Token2Deposit[msg.sender] = _amountToken2;
    }

    function ViewApproval() external view returns (uint256) {
        return IERC20(Token1).allowance(msg.sender, address(this));
    }

    function SwapToken(uint256 _toAmount) external {
        require(swap(_toAmount), "Unable to Swap Token");
    }

    function swap(uint256 _value) internal returns (bool) {
        require(msg.sender != address(0x0), "Wrong EOA");

        Token1Deposit[msg.sender] = Token1Deposit[msg.sender] - _value;

        Token2Deposit[msg.sender] = Token2Deposit[msg.sender] + _value;
        
        return true;
    }
}

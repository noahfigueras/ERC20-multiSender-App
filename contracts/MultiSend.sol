// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract MultiSender{
    

    constructor() {
    }
    
    //Returns total value of transaction transfer
    function sum(uint[] memory amounts) internal pure returns(uint totalAmount){
        totalAmount = 0;

        for (uint i=0; i < amounts.length; i++) {
            totalAmount += (amounts[i] * (10**18));
        }
    }

    //Perform multi Sender Transfer
    function multiSender(address payable[] memory addrs, 
         uint[] memory amounts,
         address _token
        ) external {
        IERC20 token = IERC20(address(_token));
        require(addrs.length == amounts.length, "Amount of addresses or transfer values are wrong");
        require(token.allowance(msg.sender, address(this)) >= sum(amounts), "Allowance is less than amounts to transfer");

        //Initialize token and transfer
        for (uint i=0; i < addrs.length; i++) {
            //send the specified amount to the recipients
           _tokenTransfer(token, addrs[i], msg.sender, amounts[i]);
        }
   
    } 
    
    //Internal token Transfer
    function _tokenTransfer(IERC20 token, address payable addrs, address sender, uint amount) internal {
        token.transferFrom(sender, addrs, amount * (10**18));
   } 
}

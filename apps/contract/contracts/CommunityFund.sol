// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

contract CommunityFund {
    mapping(address => uint256) public balances;

    // Function to handle receiving Ether
    receive() external payable {
        balances[msg.sender] += msg.value;
    }

    function deposit() public payable {
        balances[msg.sender] += msg.value;
    }

    function getBalance(address account) public view returns (uint256) {
        return balances[account];
    }
}

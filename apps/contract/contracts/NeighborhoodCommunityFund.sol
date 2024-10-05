// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/utils/ReentrancyGuard.sol';

contract NeighborhoodCommunityFund is Ownable, ReentrancyGuard {
    struct Unit {
        address owner;
        uint256 totalPaid;
        uint256 lastPaidDate;
    }

    mapping(uint256 => Unit) public units; // Mapping unit number to unit data
    mapping(address => bool) public whitelistedCommittees; // Mapping for whitelisted committees

    event UnitOwnerSet(uint256 unitNumber, address owner);
    event CommitteeWhitelisted(address committee);
    event CommitteeRemoved(address committee);

    constructor() Ownable(msg.sender) {}

    // Function to whitelist a committee
    function whitelistCommittee(address committee) external onlyOwner {
        whitelistedCommittees[committee] = true;
        emit CommitteeWhitelisted(committee);
    }

    // Function to remove a committee from the whitelist
    function removeCommittee(address committee) external onlyOwner {
        whitelistedCommittees[committee] = false;
        emit CommitteeRemoved(committee);
    }

    function setUnitOwner(uint256 unitNumber, address owner) external onlyOwner {
        require(units[unitNumber].owner == address(0), 'Unit is already assigned');
        units[unitNumber] = Unit({owner: owner, totalPaid: 0, lastPaidDate: 0});
        emit UnitOwnerSet(unitNumber, owner);
    }

    function payCommunityFund(uint256 unitNumber) external payable {
        Unit storage unit = units[unitNumber];
        require(unit.owner == msg.sender, 'Only the unit owner can make payments');
        require(msg.value > 0, 'Payment must be greater than 0');

        unit.totalPaid += msg.value; // Update total paid
        unit.lastPaidDate = block.timestamp; // Update last paid date
    }

    // Custom getter function to return the Unit struct
    function getUnitOwner(uint256 unitNumber) external view returns (address) {
        return units[unitNumber].owner;
    }
}

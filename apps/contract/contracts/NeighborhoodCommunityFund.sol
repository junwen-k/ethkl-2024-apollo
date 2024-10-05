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

    struct PaymentRequest {
        address committee;
        uint256 amount;
        string remark;
        uint256 deadline;
        mapping(address => bool) paidStatus; // Track which owners have paid
    }

    mapping(uint256 => Unit) public units; // Mapping unit number to unit data
    mapping(address => bool) public whitelistedCommittees; // Mapping for whitelisted committees
    PaymentRequest[] public paymentRequests; // Array of payment requests

    event UnitOwnerSet(uint256 unitNumber, address owner);
    event CommitteeWhitelisted(address committee);
    event CommitteeRemoved(address committee);
    event PaymentRequested(
        uint256 requestId,
        address committee,
        uint256 amount,
        string remark,
        uint256 deadline
    );
    event PaymentMade(uint256 requestId, address owner, uint256 amount);

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

    function requestPayment(uint256 amount, string memory remark, uint256 deadline) external {
        require(
            whitelistedCommittees[msg.sender],
            'Only whitelisted committees can request payments'
        );

        PaymentRequest storage newRequest = paymentRequests.push();
        newRequest.committee = msg.sender;
        newRequest.amount = amount;
        newRequest.remark = remark;
        newRequest.deadline = deadline;

        emit PaymentRequested(paymentRequests.length - 1, msg.sender, amount, remark, deadline);
    }
    function payCommunityFund(uint256 requestId, uint256 unitNumber) external payable nonReentrant {
        require(msg.value > 0, 'Payment must be greater than 0');
        require(requestId < paymentRequests.length, 'Invalid request ID');

        PaymentRequest storage request = paymentRequests[requestId];
        require(msg.value == request.amount, 'Incorrect payment amount');
        require(!request.paidStatus[msg.sender], 'You have already paid');

        Unit storage unit = units[unitNumber]; // Get the unit by unit number
        require(unit.owner == msg.sender, 'Only the unit owner can make payments');

        unit.totalPaid += msg.value; // Update total paid
        unit.lastPaidDate = block.timestamp; // Update last paid date

        request.paidStatus[msg.sender] = true; // Mark as paid

        emit PaymentMade(requestId, msg.sender, msg.value);
    }

    // Custom getter function to return the Unit struct
    function getUnitOwner(uint256 unitNumber) external view returns (address) {
        return units[unitNumber].owner;
    }

    // Function to check if an owner has paid a specific payment request
    function hasPaid(uint256 requestId, address owner) external view returns (bool) {
        require(requestId < paymentRequests.length, 'Invalid request ID');
        return paymentRequests[requestId].paidStatus[owner];
    }
}

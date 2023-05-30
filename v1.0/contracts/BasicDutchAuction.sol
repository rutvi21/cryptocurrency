// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";

contract BasicDutchAuction {
    uint public reservePrice; //the minimum amount seller is willing to accept for the item

    uint public initialPrice; //initial price for the item

    uint public numBlocksAuctionOpen; //the no. of blockchain blocks that the auction is open for

    uint public offerPriceDecrement; //amount by which auction price should decrease by during each subsequent block.

    uint public auctionStartBlock; //block where auction was deployed

    address payable public owner; //who is selling

    address public winner; // who is winner

    //constructor
    constructor(
        uint256 _reservePrice,
        uint256 _numBlocksAuctionOpen,
        uint256 _offerPriceDecrement
    ) {
        initialPrice =
            _reservePrice +
            (_numBlocksAuctionOpen * _offerPriceDecrement);
        reservePrice = _reservePrice;
        offerPriceDecrement = _offerPriceDecrement;
        numBlocksAuctionOpen = _numBlocksAuctionOpen;
        auctionStartBlock = block.number;
        owner = payable(msg.sender);
    }

    // bid can be called by anyone to place a bid
    function bid() public payable returns (address) {
        uint currentPrice = initialPrice -
            ((block.number - auctionStartBlock) * offerPriceDecrement); // calculate the current price

        require(
            block.number <= auctionStartBlock + numBlocksAuctionOpen,
            "Auction is over"
        ); // if the auction is over, the bid is reverted
        require(msg.value >= currentPrice, "Low bid");

        // bid is accepted, transfer token to owner
        owner.transfer(msg.value);
        return msg.sender;
    }
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/interfaces/IERC721.sol";

contract NFTDutchAuction {
    IERC721 internal immutable nft;
    uint256 public immutable startBlock;
    uint256 public immutable initialPrice;
    address public winner;
    address payable public immutable owner;
    uint256 public immutable nftTokenId;
    uint256 public immutable reservePrice;
    address public immutable erc721TokenAddress;
    uint256 public immutable numBlocksAuctionOpen;
    uint256 public immutable offerPriceDecrement;

    constructor(
        address _erc721TokenAddress,
        uint256 _nftTokenId,
        uint256 _reservePrice,
        uint256 _numBlocksAuctionOpen,
        uint256 _offerPriceDecrement
    ) {
        owner = payable(msg.sender);
        erc721TokenAddress = _erc721TokenAddress;
        nftTokenId = _nftTokenId;
        reservePrice = _reservePrice;
        numBlocksAuctionOpen = _numBlocksAuctionOpen;
        offerPriceDecrement = _offerPriceDecrement;

        nft = IERC721(_erc721TokenAddress);
        require(
            nft.ownerOf(_nftTokenId) == owner,
            "NFT token Id does not belong to the Auction's Owner"
        );

        startBlock = block.number;
        initialPrice =
            reservePrice +
            (numBlocksAuctionOpen * offerPriceDecrement);
    }

    function bid() external payable returns (address) {
        //Throw error if auction has already been won
        require(winner == address(0), "Auction has already concluded");

        //Throw error if auction has expired already
        require(
            (block.number - startBlock) <= numBlocksAuctionOpen,
            "Auction expired"
        );

        uint256 currentPrice = getCurrentPrice();
        //uint256 currentPrice = initialPrice -((block.number - startBlock) * offerPriceDecrement);

        require(msg.value >= currentPrice, "Value sent is not acceptable");

        winner = msg.sender; //Set bidder as winner
        owner.transfer(msg.value); //Transfer the NFT to bidder
        nft.transferFrom(owner, winner, nftTokenId); //Transfer the bid amount to owner
        return winner;
    }

    function getCurrentPrice() public view returns (uint256) {
        uint256 blocksElapsed = block.number - startBlock;
        if (blocksElapsed >= numBlocksAuctionOpen) {
            return reservePrice;
        } else {
            return initialPrice - (blocksElapsed * offerPriceDecrement);
        }
    }
}

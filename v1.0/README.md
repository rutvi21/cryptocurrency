# Dutch Auction v1.0

The BasicDutchAuction.sol contract works as follows:

-The seller instantiates a DutchAuction contract to manage the auction of a single, physical item at a single auction event. The contract is initialized with the following parameters:

-reservePrice: the minimum amount of wei that the seller is willing to accept for the item
-numBlocksAuctionOpen: the number of blockchain blocks that the auction is open for
-offerPriceDecrement: the amount of wei that the auction price should decrease by during each subsequent block.
-The seller is the owner of the contract.
-The auction begins at the block in which the contract is created.
-The initial price of the item is derived from reservePrice, numBlocksAuctionOpen, and offerPriceDecrement: initialPrice = reservePrice + numBlocksAuctionOpen\*offerPriceDecrement
-A bid can be submitted by any Ethereum externally-owned account.
-The first bid processed by the contract that sends wei greater than or equal to the current price is the winner. The wei should be transferred immediately to the seller and the contract should not accept any more bids. All bids besides the winning bid should be refunded immediately.

Coverage Report:
 BasicDutchAuction
    Deployment
      ✔ Set the correct initialPrice (569ms)
      ✔ Set the correct reservePrice
      ✔ Set the correct numBlocksAuctionOpen
      ✔ Set the right owner
    bid
      ✔ Should have rejected a bid lower than currentPrice (80ms)
      ✔ Should have accepted a bid that higher than currentPrice (38ms)
      ✔ Should have reverted the bid if auction over and winner finalised
      ✔ Should have bid at the reservePrice when the auction is passing a certain amount of time
      ✔ Should have sent the accepted bid value from bidder's account to owner's account (53ms)

9 passing (941)

------------------------|----------|----------|----------|----------|----------------|
File                    |  % Stmts | % Branch |  % Funcs |  % Lines |Uncovered Lines |
------------------------|----------|----------|----------|----------|----------------|
 contracts/             |      100 |      100 |      100 |      100 |                |
  BasicDutchAuction.sol |      100 |      100 |      100 |      100 |                |
------------------------|----------|----------|----------|----------|----------------|
All files               |      100 |      100 |      100 |      100 |                |
------------------------|----------|----------|----------|----------|----------------|
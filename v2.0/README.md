# NFT Dutch Auction v2.0

Create a new contract called NFTDutchAuction.sol. It should have the same functionality as BasicDutchAuction.sol but it sells an NFT instead of a physical item. The constructor for the NFTDutchAuction.sol should be:
constructor(address erc721TokenAddress, uint256 \_nftTokenId, uint256 \_reservePrice, uint256 \_numBlocksAuctionOpen, uint256 \_offerPriceDecrement)

Output:

NFTDutchAuction
Deployment
✔ Should set the right owner (566ms)
✔ Should have no winner
✔ Should not allow Auction creator to deploy contract if the NFT does not belong to them (127ms)
✔ Should have the initial price as per Dutch Auction formula
Bids
✔ Should have expected current price after 5 blocks as per formula
✔ Should reject low bids (63ms)
✔ Should accept bids higher than currentPrice and set winner as bidder's address (103ms)
✔ Should reject bids after a winning bid is already accepted (94ms)
✔ Bids should not be accepted after the auction expires
✔ Should return reservePrice when max number of auction blocks have elapsed (69ms)
✔ Should send the accepted bid wei value from bidder's account to owner's account (92ms)
✔ Should transfer the NFT from Owner's account to Bidder's account (213ms)
✔ Owner should still own the NFT after the auction expires if there is no winning bid

Deployment
✔ Should set the right owner (110ms)
✔ Should allow owner to mint an NFT and emit minting/transfer event (63ms)
✔ Should not allow non-owner addresses to mint an NFT (65ms)
✔ Should mint NFT with correct tokenUri (78ms)
Transfers & Approvals
✔ Should allow owner to transfer the NFT (152ms)
✔ Should allow recipient to transfer the NFT after receiving the token (123ms)
✔ Should not allow non-token-owning addresses to transfer the NFT unless approved (229ms)
✔ Should allow only token-owner addresses to set ERC721 approvals (191ms)
✔ Should allow approved addresses to transfer the NFT (139ms)



  22 passing (3s)

----------------------|----------|----------|----------|----------|----------------|
File                  |  % Stmts | % Branch |  % Funcs |  % Lines |Uncovered Lines |
----------------------|----------|----------|----------|----------|----------------|
 contracts/           |      100 |      100 |      100 |      100 |                |
  NFTDutchAuction.sol |      100 |      100 |      100 |      100 |                |
  RandomNFT.sol       |      100 |      100 |      100 |      100 |                |
----------------------|----------|----------|----------|----------|----------------|
All files             |      100 |      100 |      100 |      100 |                |
----------------------|----------|----------|----------|----------|----------------|

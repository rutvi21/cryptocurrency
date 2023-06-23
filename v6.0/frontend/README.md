#Basic dutch auction v6.0

The seller instantiates a DutchAuction contract to manage the auction of a single, physical item at a single auction event. The contract is initialized with the following parameters:
reservePrice: the minimum amount of wei that the seller is willing to accept for the item
numBlocksAuctionOpen: the number of blockchain blocks that the auction is open for
offerPriceDecrement: the amount of wei that the auction price should decrease by during each subsequent block.
The seller is the owner of the contract.
The auction begins at the block in which the contract is created.
The initial price of the item is derived from reservePrice, numBlocksAuctionOpen, and offerPriceDecrement: initialPrice = reservePrice + numBlocksAuctionOpen\*offerPriceDecrement
A bid can be submitted by any Ethereum externally-owned account.
The first bid processed by the contract that sends wei greater than or equal to the current price is the winner. The wei should be transferred immediately to the seller and the contract should not accept any more bids. All bids besides the winning bid should be refunded immediately.


The UI should has three sections. Feel free to use the following layouts in your app, or something similar.

Section 1: Deployment
Inputs:
A textbox for each parameter in the constructor
A button called “Deploy”
Outputs:
A label with the address of the newly created BasicDutchAuction

Section 2: Look up info on an auction
Inputs:
A textbox for the address of a BasicDutchAction.
A button called “Show Info”
Outputs:
A label for each property of the BasicDutchAction:
Winner, if one already exists
Constructor parameters
Current price

Section 3: Submit a bid
Input: 
A textbox for the address of a BasicDutchAction.
A textbox for the bid
A button called “Bid”
Outputs:
A label indicating whether the bid was accepted as the winner or not

Coverage:

------------------------|----------|----------|----------|----------|----------------|
File                    |  % Stmts | % Branch |  % Funcs |  % Lines |Uncovered Lines |
------------------------|----------|----------|----------|----------|----------------|
 contracts/             |      100 |      100 |      100 |      100 |                |
  BasicDutchAuction.sol |      100 |      100 |      100 |      100 |                |
  Greeter.sol           |      100 |      100 |      100 |      100 |                |
------------------------|----------|----------|----------|----------|----------------|
All files               |      100 |      100 |      100 |      100 |                |

# Important commands

npx hardhar coverage
npx hardhat deploy
npx hardhat node
npm start

# Basic Duct Auction v7.0

1. Deploy your Version 6.0 dapp on an Ethereum testnet.
This step will require getting test ETH from a faucet.
Sometimes these faucets can be unreliable, so you'll have to keep searching online for a faucet that gives you enough ETH to successfully deploy your contract.
Hardhat can deploy your contracts for you: Deploying to a Live Network

2. Host your UI through IPFS.
You will host your UI on your own machine, and you will use IPFS to enable others to access it through an ipfs:// URL.
Get the CID of your build directory that contains your built UI, and prefix the CID with "ipfs://".

My IPFS URL is: https://ipfs.io/ipfs/QmSHnwtocARE3xvJU19XtofZ7pPnVDoHMWBFXTYN5GCkr3/

3. Steps:
Generate build files for your UI.
Install IPFS desktop and IPFS browser plugin.
Pin your UI build files to your IPFS Desktop node.
Add the IPFS URL to your README.md file in your repo.

4. Final Output:
Show that your contracts are deployed on a testnet.
Show that your UI is accessible by anyone through the IPFS URL.
Show that users can interact with your UI through IPFS and the MetaMask plugin by:
Deploying a new BasicDutchAuction.
Submitting a winning bid.
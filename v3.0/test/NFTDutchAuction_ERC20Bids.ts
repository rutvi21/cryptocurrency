import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { mine } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { NFTDutchAuction_ERC20Bids } from "../typechain-types/contracts/NFTDutchAuction_ERC20Bids";

describe("NFTDutchAuction_ERC20Bids", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.

  const NUM_BLOCKS_AUCTION_OPEN: number = 10;
  const RESERVE_PRICE: number = 500;
  const OFFER_PRICE_DECREMENT: number = 50;
  const NFT_TOKEN_ID: number = 0;
  const TOKEN_URI = "https://www.youtube.com/watch?v=pXRviuL6vMY";

  async function deployNFTDAFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, account1, account2] = await ethers.getSigners();

    //Deploy and mint NFT contract
    const RandomNFT = await ethers.getContractFactory("RandomNFT");
    const randomNFT = await RandomNFT.deploy();
    await randomNFT.mintNFT(owner.address, TOKEN_URI);

    //Deploy and mint TMP tokens
    const Token = await ethers.getContractFactory("Token");
    const tempToken = await Token.deploy();
    await tempToken.mint(account1.address, 1000);

    const NFTDutchAuction_ERC20Bids = await ethers.getContractFactory(
      "NFTDutchAuction_ERC20Bids"
    );

    const nftDutchAuctionERC20Bids = await NFTDutchAuction_ERC20Bids.deploy(
      tempToken.address,
      randomNFT.address,
      NFT_TOKEN_ID,
      RESERVE_PRICE,
      NUM_BLOCKS_AUCTION_OPEN,
      OFFER_PRICE_DECREMENT
    );

    randomNFT.approve(nftDutchAuctionERC20Bids.address, NFT_TOKEN_ID);

    return {
      randomNFT,
      tempToken,
      nftDutchAuctionERC20Bids,
      owner,
      account1,
      account2,
    };
  }

  describe("Deployment", function () {
   

    it("Should have no winner", async function () {
      const { nftDutchAuctionERC20Bids } = await loadFixture(
        deployNFTDAFixture
      );

      expect(await nftDutchAuctionERC20Bids.winner()).to.equal(
        ethers.constants.AddressZero
      );
    });
    it("Should set the right owner", async function () {
      const { nftDutchAuctionERC20Bids, owner } = await loadFixture(
        deployNFTDAFixture
      );

      expect(await nftDutchAuctionERC20Bids.owner()).to.equal(owner.address);
    });
    it("Should have the initial price as per Dutch Auction formula", async function () {
      const { nftDutchAuctionERC20Bids } = await loadFixture(
        deployNFTDAFixture
      );
      const initialPrice =
        RESERVE_PRICE + NUM_BLOCKS_AUCTION_OPEN * OFFER_PRICE_DECREMENT;

      expect(await nftDutchAuctionERC20Bids.initialPrice()).to.equal(
        initialPrice
      );
    });

    it("Should not allow Auction creator to deploy contract if the NFT does not belong to them", async function () {
      const { randomNFT, tempToken, account1 } = await loadFixture(
        deployNFTDAFixture
      );
      //Mint NFT with tokenId 1 to account1
      await expect(randomNFT.mintNFT(account1.address, "Test URI"))
        .to.emit(randomNFT, "Transfer")
        .withArgs(ethers.constants.AddressZero, account1.address, 1);
      //Deploy NFT contract with account1's tokenId, should fail
      const NFTDutchAuction_ERC20Bids = await ethers.getContractFactory(
        "NFTDutchAuction_ERC20Bids"
      );
      await expect(
        NFTDutchAuction_ERC20Bids.deploy(
          tempToken.address,
          randomNFT.address,
          1,
          RESERVE_PRICE,
          NUM_BLOCKS_AUCTION_OPEN,
          OFFER_PRICE_DECREMENT
        )
      ).to.revertedWith(
        "The NFT tokenId does not belong to the Auction's Owner"
      );
    });

    
  });

  describe("Bids", function () {
    it("Should have expected current price after 5 blocks as per formula", async function () {
      const { nftDutchAuctionERC20Bids } = await loadFixture(
        deployNFTDAFixture
      );

      const initialPrice =
        RESERVE_PRICE + NUM_BLOCKS_AUCTION_OPEN * OFFER_PRICE_DECREMENT;

      const priceAfter5Blocks = initialPrice - 5 * OFFER_PRICE_DECREMENT;
      //Mine 5 blocks, since 1 block was already mined
      //when we approved the Auction contract for NFT Transfer
      await mine(4);

      expect(await nftDutchAuctionERC20Bids.getCurrentPrice()).to.equal(
        priceAfter5Blocks
      );
    });

    it("Should reject low bids", async function () {
      const { nftDutchAuctionERC20Bids, account1 } = await loadFixture(
        deployNFTDAFixture
      );

      //Mine 1 block, 1 already mined
      //when we approved the Auction contract for NFT Transfer
      await mine(1);

      //This is the Bid price which would be accepted three blocks later
      //But should be rejected now
      const lowBidPrice =
        RESERVE_PRICE +
        NUM_BLOCKS_AUCTION_OPEN * OFFER_PRICE_DECREMENT -
        OFFER_PRICE_DECREMENT * 5;

      await expect(
        nftDutchAuctionERC20Bids.connect(account1).bid(lowBidPrice)
      ).to.be.revertedWith("The bid amount sent is not acceptable");

      //Test with an arbitrarily low value too
      await expect(
        nftDutchAuctionERC20Bids.connect(account1).bid(50)
      ).to.be.revertedWith("The bid amount sent is not acceptable");
    });

    it("Should acknowledge bids higher than currentPrice but still fail if proper allowance is not set to the contract's address", async function () {
      const { nftDutchAuctionERC20Bids, tempToken, account1 } =
        await loadFixture(deployNFTDAFixture);
      //mine 5 blocks
      await mine(5);

      const initialPrice =
        RESERVE_PRICE + NUM_BLOCKS_AUCTION_OPEN * OFFER_PRICE_DECREMENT;
      //Get price after 4 blocks
      const highBidPrice = initialPrice - OFFER_PRICE_DECREMENT * 4;

      //Bid function should succeed
      await expect(
        nftDutchAuctionERC20Bids.connect(account1).bid(highBidPrice)
      ).to.be.revertedWith(
        "Bid amount was accepted, but bid failed as not enough balance/allowance to transfer erc20 token TMP"
      );

      //Approve auction contract to spend less tokens than bid price, should be reverted with same error
      await tempToken
        .connect(account1)
        .approve(nftDutchAuctionERC20Bids.address, highBidPrice - 10);

      await expect(
        nftDutchAuctionERC20Bids.connect(account1).bid(highBidPrice)
      ).to.be.revertedWith(
        "Bid amount was accepted, but bid failed as not enough balance/allowance to transfer erc20 token TMP"
      );
    });

    it("Should accept bids higher than currentPrice and set winner as bidder's address", async function () {
      const { nftDutchAuctionERC20Bids, tempToken, account1 } =
        await loadFixture(deployNFTDAFixture);
      //mine 5 blocks
      await mine(5);

      const initialPrice =
        RESERVE_PRICE + NUM_BLOCKS_AUCTION_OPEN * OFFER_PRICE_DECREMENT;
      //Get price after 4 blocks
      const highBidPrice = initialPrice - OFFER_PRICE_DECREMENT * 4;

      //Set allowance for auction contract to spend bid amount
      await tempToken
        .connect(account1)
        .approve(nftDutchAuctionERC20Bids.address, highBidPrice);

      //Bid function should succeed
      expect(await nftDutchAuctionERC20Bids.connect(account1).bid(highBidPrice))
        .to.not.be.reverted;

      //Winner should be account1
      expect(await nftDutchAuctionERC20Bids.winner()).to.equal(
        account1.address
      );
    });

    it("Should reject bids after a winning bid is already accepted", async function () {
      const { nftDutchAuctionERC20Bids, tempToken, account1, account2 } =
        await loadFixture(deployNFTDAFixture);
      //mine 5 blocks
      await mine(5);

      const initialPrice =
        RESERVE_PRICE + NUM_BLOCKS_AUCTION_OPEN * OFFER_PRICE_DECREMENT;
      //Get price after 4 blocks
      const highBidPrice = initialPrice - OFFER_PRICE_DECREMENT * 4;

      //Set allowance for auction contract to spend bid amount
      await tempToken
        .connect(account1)
        .approve(nftDutchAuctionERC20Bids.address, highBidPrice);

      //Bid function should succeed
      expect(await nftDutchAuctionERC20Bids.connect(account1).bid(highBidPrice))
        .to.not.be.reverted;

      //Bid should be rejected
      await expect(
        nftDutchAuctionERC20Bids.connect(account2).bid(highBidPrice)
      ).to.be.revertedWith("Auction has already concluded");
    });

    it("Bids should not be accepted after the auction expires", async function () {
      const { nftDutchAuctionERC20Bids, account1, account2 } =
        await loadFixture(deployNFTDAFixture);
      //mine 5 blocks
      await mine(NUM_BLOCKS_AUCTION_OPEN + 1);

      const initialPrice =
        RESERVE_PRICE + NUM_BLOCKS_AUCTION_OPEN * OFFER_PRICE_DECREMENT;
      //Get price after 4 blocks
      const highBidPrice = initialPrice - OFFER_PRICE_DECREMENT * 4;

      //Bid function should fail with auction expired message
      await expect(
        nftDutchAuctionERC20Bids.connect(account2).bid(highBidPrice)
      ).to.be.revertedWith("Auction expired");
    });

    it("Should return reservePrice when max number of auction blocks have elapsed", async function () {
      const { nftDutchAuctionERC20Bids } = await loadFixture(
        deployNFTDAFixture
      );
      //mine 10 blocks
      await mine(NUM_BLOCKS_AUCTION_OPEN);
      //Should return reserve price after 10 blocks are mined
      expect(await nftDutchAuctionERC20Bids.getCurrentPrice()).to.equal(
        RESERVE_PRICE
      );

      //Mine 5 more blocks
      await mine(5);
      //Should return reserve price after 15 blocks are mined
      expect(await nftDutchAuctionERC20Bids.getCurrentPrice()).to.equal(
        RESERVE_PRICE
      );
    });

    it("Should send the accepted bid amount in TMP tokens from bidder's account to owner's account", async function () {
      const { nftDutchAuctionERC20Bids, tempToken, owner, account1 } =
        await loadFixture(deployNFTDAFixture);
      //mine 5 blocks
      await mine(5);

      //Amount of TMP in owner's account
      const ownerTMP: number = (
        await tempToken.balanceOf(owner.address)
      ).toNumber();
      //Amount of TMP in bidder's account
      const bidderTMP: number = (
        await tempToken.balanceOf(account1.address)
      ).toNumber();

      const initialPrice =
        RESERVE_PRICE + NUM_BLOCKS_AUCTION_OPEN * OFFER_PRICE_DECREMENT;
      //Get price after 4 blocks
      const highBidPrice = initialPrice - OFFER_PRICE_DECREMENT * 4;

      //Set allowance for auction contract to spend bid amount
      await tempToken
        .connect(account1)
        .approve(nftDutchAuctionERC20Bids.address, highBidPrice);

      //Bid function should succeed
      await expect(nftDutchAuctionERC20Bids.connect(account1).bid(highBidPrice))
        .to.not.be.reverted;

      //Owner's TMP balance should be sum of previous balance & bid amount
      expect(await tempToken.balanceOf(owner.address)).to.equal(
        ownerTMP + highBidPrice
      );

      //Bidder's TMP balance should be difference of previous balance & bid amount
      expect(await tempToken.balanceOf(account1.address)).to.equal(
        bidderTMP - highBidPrice
      );
    });

    it("Should transfer the NFT from Owner's account to Bidder's account", async function () {
      const {
        nftDutchAuctionERC20Bids,
        tempToken,
        randomNFT,
        owner,
        account1,
      } = await loadFixture(deployNFTDAFixture);
      //mine 5 blocks
      await mine(5);

      const initialPrice =
        RESERVE_PRICE + NUM_BLOCKS_AUCTION_OPEN * OFFER_PRICE_DECREMENT;
      //Get price after 4 blocks
      const highBidPrice = initialPrice - OFFER_PRICE_DECREMENT * 4;

      //Set allowance for auction contract to spend bid amount
      await tempToken
        .connect(account1)
        .approve(nftDutchAuctionERC20Bids.address, highBidPrice);

      //Bid function should succeed and teansfer NFT from account1 to owner
      await expect(nftDutchAuctionERC20Bids.connect(account1).bid(highBidPrice))
        .to.emit(randomNFT, "Transfer")
        .withArgs(owner.address, account1.address, NFT_TOKEN_ID);

      //NFT contract should reflect the NFT ownership in account1's address

      expect(await randomNFT.ownerOf(NFT_TOKEN_ID)).to.equal(
        account1.address
      );
    });

    it("Owner should still own the NFT after the auction expires if there is no winning bid", async function () {
      const { nftDutchAuctionERC20Bids, randomNFT, owner, account2 } =
        await loadFixture(deployNFTDAFixture);
      //mine 5 blocks
      await mine(NUM_BLOCKS_AUCTION_OPEN + 1);

      const initialPrice =
        RESERVE_PRICE + NUM_BLOCKS_AUCTION_OPEN * OFFER_PRICE_DECREMENT;
      //Get price after 4 blocks
      const highBidPrice = initialPrice - OFFER_PRICE_DECREMENT * 4;

      //Bid function should fail with auction expired message
      await expect(
        nftDutchAuctionERC20Bids.connect(account2).bid(highBidPrice)
      ).to.be.revertedWith("Auction expired");

      //NFT should still belong to owner
      expect(await randomNFT.ownerOf(NFT_TOKEN_ID)).to.equal(
        owner.address
      );
    });
  });
});

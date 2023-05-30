import { time, loadFixture, mine } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("BasicDutchAuction", function () {
  // We define a fixture to reuse the same setup in every test.
  async function basicDutchAuctionFixture() {
    // initialPrice =350
    const [owner, anotherAccount] = await ethers.getSigners();
    const reservePrice = 50;
    const numBlocksAuctionOpen = 100;
    const offerPriceDecrement = 3;
   
    const BasicDutchAuctionFactory = await ethers.getContractFactory("BasicDutchAuction");
    const basicDutchAuction = await BasicDutchAuctionFactory.deploy(reservePrice, numBlocksAuctionOpen, offerPriceDecrement);

    return { basicDutchAuction, owner, anotherAccount, reservePrice, numBlocksAuctionOpen, offerPriceDecrement};
  }

  describe("Deployment", function () {
    it("Set the correct initialPrice", async function () {
      const { basicDutchAuction, reservePrice, offerPriceDecrement, numBlocksAuctionOpen } = await loadFixture(basicDutchAuctionFixture);

      expect(await basicDutchAuction.initialPrice()).to.equal(reservePrice + (numBlocksAuctionOpen * offerPriceDecrement));
    });

    it("Set the correct reservePrice", async function () {
      const { basicDutchAuction, reservePrice } = await loadFixture(basicDutchAuctionFixture);

      expect(await basicDutchAuction.reservePrice()).to.equal(reservePrice);
    });

    it("Set the correct numBlocksAuctionOpen", async function () {
      const { basicDutchAuction, numBlocksAuctionOpen } = await loadFixture(basicDutchAuctionFixture);

      expect(await basicDutchAuction.numBlocksAuctionOpen()).to.equal(numBlocksAuctionOpen);
    });

    it("Set the right owner", async function () {
      const { basicDutchAuction, owner, } =await loadFixture(basicDutchAuctionFixture);

      expect(await basicDutchAuction.owner()).to.equal(owner.address);
    });
   
  });

  describe("bid", function () {
    it('Should have rejected a bid lower than currentPrice', async function () {
      const { basicDutchAuction, anotherAccount } = await loadFixture(basicDutchAuctionFixture);
      await time.advanceBlock(10);
      await expect(basicDutchAuction.connect(anotherAccount).bid({value: 220})).to.be.revertedWith("Low bid");
    });

    it('Should have accepted a bid that higher than currentPrice', async function () {
        const { basicDutchAuction, anotherAccount } = await loadFixture(basicDutchAuctionFixture);
        await time.advanceBlock(10);
        const anotherAccountAddress = await basicDutchAuction.connect(anotherAccount).callStatic.bid({value: 330});
        expect(anotherAccountAddress).to.equal(anotherAccount.address);
    });

    it("Should have reverted the bid if auction over and winner finalised", async function () {
        const { basicDutchAuction, anotherAccount } = await loadFixture(basicDutchAuctionFixture);
        await time.advanceBlock(101);
        await expect(basicDutchAuction.connect(anotherAccount).bid({value: 1000})).to.be.revertedWith("Auction is over");
    });

    it("Should have bid at the reservePrice when the auction is passing a certain amount of time", async function () {
      const { basicDutchAuction, anotherAccount } = await loadFixture(basicDutchAuctionFixture);
      await time.advanceBlock(100);
      expect(await basicDutchAuction.connect(anotherAccount).callStatic.bid({value: 50})).to.equal(anotherAccount.address);
    });

    it("Should have sent the accepted bid value from bidder's account to owner's account", async function () {
      const { basicDutchAuction, owner, anotherAccount, reservePrice, offerPriceDecrement, numBlocksAuctionOpen } = await loadFixture(
        basicDutchAuctionFixture
      );
      //mine 5 blocks
      await mine(6);
      const initialPrice = reservePrice  + numBlocksAuctionOpen * offerPriceDecrement;
      const higherBidValue = initialPrice - offerPriceDecrement * 5;

      //Bid function should succeed and teansfer wei value from account1 to owner
      await expect(
        basicDutchAuction.connect(anotherAccount).bid({
          value: higherBidValue,
        })
      ).to.changeEtherBalances(
        [anotherAccount, owner],
        [-higherBidValue, higherBidValue]
      );
    });
  });
});



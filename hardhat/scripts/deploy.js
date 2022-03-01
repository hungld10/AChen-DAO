const { ethers } = require("hardhat");
const { CHICKEN_NFT_CONTRACT_ADDRESS } = require("../constants");

async function main() {
    // Deploy the NFTMarketplace contract first
    const NFTMarketplace = await ethers.getContractFactory(
        "NFTMarketplace"
    );
    const nftMarketplace = await NFTMarketplace.deploy();
    await nftMarketplace.deployed();

    console.log("NFTMarketplace deployed to: ", nftMarketplace.address);

    // Now deploy the ChickenDAO contract
    const ChickenDAO = await ethers.getContractFactory("ChickenDAO");
    const chickenDAO = await ChickenDAO.deploy(
        nftMarketplace.address,
        CHICKEN_NFT_CONTRACT_ADDRESS,
    {
        // This assumes your account has at least 1 ETH in it's account
        // Change this value as you want
        value: ethers.utils.parseEther("1"),
    }
    );
    await chickenDAO.deployed();

    console.log("ChickenDAO deployed to: ", chickenDAO.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
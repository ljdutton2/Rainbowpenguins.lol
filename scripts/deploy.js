
const hre = require("hardhat");

async function main() {


  // We get the contract to deploy
  const RainbowPenguins = await hre.ethers.getContractFactory("RainbowPenguins");
  const rainbowpenguins = await RainbowPenguins.deploy();

  await rainbowpenguins.deployed();

  console.log("Rainbow Penguins deployed to:", rainbowpenguins.address);
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
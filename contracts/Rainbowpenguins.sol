//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract RainbowPenguins is ERC721, Ownable {
    //price to mint each penguin
    uint256 public penguinPrice;
    //current total minted
    uint256 public totalSupply;
    //max that can be minted evnper
    uint256 public maxSupply;
    //making sure nobody is hoarding penguins
    uint256 public maxPerWallet;
    /// can be toggled on off to pause minting if needed
    bool public isPublicMintEnabled;
    // for the metadata and for opensea to find our penguins
    string internal baseTokenUri;
    // for me to withdraw all the cash revenue from da penguins
    //determine and keeps track of all of the mints per wallet to align with the maxperWallet
    mapping(address => uint256) walletMints;
    address payable public withdrawWallet;

    constructor() payable ERC721("Rainbow Penguins", "PNGN") {
        penguinPrice = 0.01 ether;
        totalSupply = 0;
        maxSupply = 7;
        maxPerWallet = 2;
        isPublicMintEnabled = true;
    }

    //here is the functionality for the on/off toggling. we add an underscore to say it is an argument and different than the function
    function setIsPublicMintEnabled(bool isPublicMintEnabled_)
        external
        onlyOwner
    {
        isPublicMintEnabled = isPublicMintEnabled_;
    }

    function setBaseTokenUri(string calldata baseTokenUri_) external onlyOwner {
        baseTokenUri = baseTokenUri_;
    }

    // this exists in ERC721 and defines each individual penguin, override to make sure we are calling correcly
    function tokenURI(uint256 tokenId_)
        public
        view
        override
        returns (string memory)
    {
        require(_exists(tokenId_), "Oops! This penguin does not exist yet");
        //bam bam take the base uri from ipfs, the each token metadata based on ID and append the extension
        return
            string(
                abi.encodePacked(
                    baseTokenUri,
                    Strings.toString(tokenId_),
                    "json"
                )
            );
    }

    // we grab the wallet of whoever is calling this function (only the owner can, so my connected MM address)
    //set up error handling
    function withdraw() external onlyOwner {
        (bool success, ) = withdrawWallet.call{value: address(this).balance}(
            ""
        );
        require(success, "Oops! Withdraw failed");
    }

    function mint(uint256 quantity_) public payable {
        require(
            isPublicMintEnabled,
            "Sorry! Penguins arent up for adopt ad this time"
        );
        //to ensure minting only happens at the correct price

        //we increment the 'quantity' by one as we mint our new penguin
        for (uint256 i = 0; i < quantity_; i++) {
            uint256 newTokenId = totalSupply + 1;
            totalSupply++;
            _safeMint(msg.sender, newTokenId);
        }
    }
}

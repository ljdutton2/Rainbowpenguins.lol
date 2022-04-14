import { useState } from "react";
import { ethers, BigNumber } from "ethers";
import RainbowPenguins from "./RainbowPenguins.json";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";

const RainbowPenguinsAddress = "0x6Df9E9C369E0e3AfFc72383cD956AA1ECd22b201";

const mintPage = ({ accounts, setAccounts }) => {
  /* we can set use state to 1 - determines the quanitity the user is minting and can be updated with setMintAmount, so it starts at 1 */
  const [mintAmount, setMintAmount] = useState(1);
  const isConnected = Boolean(accounts[0]);

  async function mintPenguin() {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      /* contract ALWAYS needs three things: the address the abi and the signer. always. */
      const contract = new ethers.Contract(
        RainbowPenguinsAddress,
        /*how cool is this? you just dot abi and it gets it from the contract. love this. */
        RainbowPenguins.abi,
        signer
      );
      try {
        const penguintxn = await contract.mint(BigNumber.from(mintAmount));
        console.log("Penguin hatching...");
      } catch (err) {
        console.log("error:", err);
      }
    }
  }

  const mintLess = () => {
    if (mintAmount <= 1) return;
    setMintAmount(mintAmount - 1);
  };
  const mintMore = () => {
    if (mintAmount >= 1) return;
    setMintAmount(mintAmount + 1);
  };
  return (
    <div>
      <h1>Welcome to the penguin exhibit!</h1>
      {isConnected ? (
        <div>
          <div>
            <button onClick={mintLess}>-</button>
            <input type="number" value={mintAmount} />
            <button onClick={mintMore}>+</button>
          </div>
          <button onClick={mintPenguin}>Adopt Rainbow Penguin</button>
        </div>
      ) : (
        <p>Please connect to metamask to adopt a penguin</p>
      )}
    </div>
  );
};

export default mintPage;

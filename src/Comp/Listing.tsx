import { BigNumber, ethers } from "ethers";
import { useState } from "react";
import { useConnectWallet } from "@web3-onboard/react";

import nftApprovalAbi from "../JSON/nftApprovalAbi.json";
import configJSON from "../JSON/config.json";

const Listing = ({ listNFTForSale, notify, walletAddress }: any) => {
  const [{ wallet }] = useConnectWallet();

  const [listingTokenId, updateListingTokenId] = useState("");
  const [listingTokenAddress, updateListingTokenAddress] = useState("");
  const [listingPrice, updateListingPrice] = useState("");

  const operatorAddress = configJSON.contract;

  const handleListingTokenIdChange = (event: any) => {
    updateListingTokenId(event.target.value);
  };
  const handleListingTokenAddressChange = (event: any) => {
    updateListingTokenAddress(event.target.value);
  };
  const handleListingPriceChange = (event: any) => {
    updateListingPrice(event.target.value);
  };

  const handleListing = async () => {
    console.log("listing action fired!");
    const tokenId = BigNumber.from(listingTokenId);
    const weiBigNumber = ethers.utils.parseEther(listingPrice);
    const wei = weiBigNumber.toString();
    const price = BigNumber.from(wei);
    let provider: any;
    let NFTTransferContract: any;

    if (wallet?.provider) {
      console.log('working')
      provider = new ethers.providers.Web3Provider(wallet.provider, "any");

      NFTTransferContract = new ethers.Contract(
        // "0x3425b20D584A59939c5CF05e2674f216D914FB18",
        listingTokenAddress,
        nftApprovalAbi,
        provider.getUncheckedSigner()
      );

      const isApproved = await NFTTransferContract.functions.isApprovedForAll(
        walletAddress,
        operatorAddress
      );

      console.log("isApproved", isApproved)

      if(isApproved.length>0 && isApproved[0] != true) {
        alert('Need to Approve Contract. Enter the token address and click Approve contract')
      }
      else if(isApproved.length>0 && isApproved[0] == true){
        // const tx = await contract.functions.listTokenForETH(tokenId, listingTokenAddress, price)
        // const receipt = await tx.wait();
        listNFTForSale(tokenId, listingTokenAddress, price);

      }
    }
  };

  const handleContractApproval = async () => {
    let provider: any;
    let NFTTransferContract: any;

    if (wallet?.provider) {
      console.log('working')
      provider = new ethers.providers.Web3Provider(wallet.provider, "any");

      NFTTransferContract = new ethers.Contract(
        // "0x3425b20D584A59939c5CF05e2674f216D914FB18",
        listingTokenAddress,
        nftApprovalAbi,
        provider.getUncheckedSigner()
      );
      console.log('contract',NFTTransferContract)
      const { hash } = await NFTTransferContract.functions.setApprovalForAll(
        operatorAddress,
        true
      );

      const { emitter } = notify.hash(hash);

      emitter.on("txPool", (transaction: any) => {
        return {
          // message: `Your transaction is pending, click <a href="https://rinkeby.etherscan.io/tx/${transaction.hash}" rel="noopener noreferrer" target="_blank">here</a> for more info.`,
          // or you could use onclick for when someone clicks on the notification itself
          onclick: () =>
            window.open(`https://polygonscan.com//tx/${transaction.hash}`),
        };
      });

      emitter.on("txSent", console.log);
      emitter.on("txConfirmed", console.log);
      emitter.on("txSpeedUp", console.log);
      emitter.on("txCancel", console.log);
      emitter.on("txFailed", console.log);
    }
  };

  return (
    <div className="form-container">
      <h1>Listing</h1>
      <div className="form">
        <label>
          <strong>TokenID:</strong>
        </label>
        <textarea
          value={listingTokenId}
          onChange={handleListingTokenIdChange}
          className="input-box"
        />
        <label>
          <strong>Token Address:</strong>
        </label>
        <textarea
          value={listingTokenAddress}
          onChange={handleListingTokenAddressChange}
          className="input-box"
        />
        <label>
          <strong>Price in $MATIC: </strong>
        </label>
        <textarea
          value={listingPrice}
          onChange={handleListingPriceChange}
          className="input-box"
        />
      </div>
      <div>
        <button
          onClick={async () => {
            // const ready = await readyToTransact();
            // if (!ready) return;
            handleListing();
          }}
        >
          List
        </button>
        <button onClick={async () => handleContractApproval()}>Approve Contract</button>
      </div>
    </div>
  );
};

export default Listing;

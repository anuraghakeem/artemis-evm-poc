import { BigNumber, ethers } from "ethers";
import { useState } from "react";
import getNFTDetails from "../Utils/getNFTDetails";

const Buying = ({ checkPrice, buyNFT }: any) => {
  const [buyingTokenId, updateBuyingTokenId] = useState("");
  const [buyingTokenAddress, updateBuyingTokenAddress] = useState("");
  const [buyingSellerAddress, updateBuyingSellerAddress] = useState("");

  const [buyingPrice, updatebuyingPrice] = useState("");
  const [displaybuyingPrice, updateDisplaybuyingPrice] = useState(
    "Not for sale on last check"
  );

  const [NFTDetails, updateNFTDetails] = useState<any>()

  const handleBuyingTokenIdChange = (event: any) => {
    updateBuyingTokenId(event.target.value);
  };
  const handleBuyingTokenAddressChange = (event: any) => {
    updateBuyingTokenAddress(event.target.value);
  };
  const handleBuyingSellerAddressChange = (event: any) => {
    updateBuyingSellerAddress(event.target.value);
  };

  const handleCheckPrice = async () => {
    const tokenId = BigNumber.from(buyingTokenId);
    const listingKey = ethers.utils.AbiCoder.prototype.encode(
      ["uint256", "address", "address"],
      [tokenId, buyingTokenAddress, buyingSellerAddress]
    );
    updateDisplaybuyingPrice("Checking price");
    const price = await checkPrice(listingKey);
    if (!!price) {
      const priceBigNum = BigNumber.from(price._hex);
      if(priceBigNum>BigNumber.from(0)){
        updatebuyingPrice("" + priceBigNum);
        updateDisplaybuyingPrice("" + ethers.utils.formatEther(price) + " Matic");
      }
      else{
        updatebuyingPrice("");
        updateDisplaybuyingPrice("Not for sale on last check");
      }
    } else {
      updatebuyingPrice("");
      updateDisplaybuyingPrice("Not for sale on last check");
    }
    // const tx = await contract.functions.listings(listingKey);
    // const price = BigNumber.from(tx[1]._hex);
    // updatebuyingPrice("" + price);
    // updateDisplaybuyingPrice("" + ethers.utils.formatEther(price) + " Matic");
  };

  const handleBuying = async () => {
    const tokenId = BigNumber.from(buyingTokenId);
    const listingKey = ethers.utils.AbiCoder.prototype.encode(
      ["uint256", "address", "address"],
      [tokenId, buyingTokenAddress, buyingSellerAddress]
    );
    if (buyingPrice.length > 0) {
      buyNFT(listingKey, buyingPrice);
    }
    else{
      alert("Not for sale.")
    }

    // const tx = await contract.functions.buyListingWithETH(listingKey, {
    //   value: ethers.BigNumber.from(buyingPrice),
    // });
    // const receipt = await tx.wait();
  };

  const handleNFTDetails = async () =>{
    console.log("NFT detaisl cheking...")
    const res = await getNFTDetails(buyingTokenId,buyingTokenAddress)
    updateNFTDetails(res)
  }

  return (
    <div className="form-container">
      <h1>Buying</h1>
      <div className="form">
        <label>
          <strong>TokenID:</strong>
        </label>
        <textarea onChange={handleBuyingTokenIdChange} className="input-box" />
        <label>
          <strong>Token Address:</strong>
        </label>
        <textarea
          className="input-box"
          onChange={handleBuyingTokenAddressChange}
        />
        <label>
          <strong>Seller Address:</strong>
        </label>
        <textarea
          className="input-box"
          onChange={handleBuyingSellerAddressChange}
        />
      </div>

      <div className="buy-data-row">
        <strong>Price: </strong>
        {displaybuyingPrice}
      </div>
      {!!NFTDetails && (
        <div className="nft-details">
        <div className="nft-details-image">
          <img src={NFTDetails.metadata.image}></img>
        </div>
        <h2 className="nft-details-title">{NFTDetails.title}</h2>
        <p className="nft-details-desc">{NFTDetails.description}</p>
      </div>
      )}
      <div>
        <button onClick={async () => handleNFTDetails()}>See NFT Details</button>
        <button
          onClick={async () => handleCheckPrice()}
          className="btn-checkPrice"
        >
          Check Price
        </button>
        <button onClick={async () => handleBuying()}>Buy</button>
      </div>
    </div>
  );
};

export default Buying;

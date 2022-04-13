import { BigNumber, ethers } from "ethers";
import { useState } from "react";


const Cancel = ({cancelListing, walletAddress}:any) => {

  const [cancelTokenId, updateCancelTokenId] = useState();
  const [cancelTokenAddress, updateCancelTokenAddress] = useState("");

  const handleCancelTokenIdChange = (event:any) => {
    updateCancelTokenId(event.target.value);
  };
  const handleCancelTokenAddressChange = (event:any) => {
    updateCancelTokenAddress(event.target.value);
  };
  const handleCancelSubmit = async () => {
    const tokenId = BigNumber.from(cancelTokenId);
    console.log('tokenId',tokenId)
    console.log('cancelTokenAddress',cancelTokenAddress)
    console.log('walletAddress',walletAddress)
    const listingKey = ethers.utils.AbiCoder.prototype.encode(['uint256', 'address', 'address'], [tokenId, cancelTokenAddress, walletAddress])
    cancelListing(listingKey)
    
  };
  
  return (
    <div className="form-container">
      <h1>Cancelling</h1>
      <div className="form">
        <label>
          <strong>TokenID:</strong>
        </label>
        <textarea className="input-box" 
          onChange={handleCancelTokenIdChange}
          />
        <label>
          <strong>Token Address:</strong>{cancelTokenAddress}
        </label>
        <textarea className="input-box" 
          onChange={handleCancelTokenAddressChange}
          />
        <div>
          <button onClick={async()=>handleCancelSubmit()} value="Cancel" className="btn">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cancel;

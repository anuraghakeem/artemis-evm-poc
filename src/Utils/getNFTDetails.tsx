// Installation: https://github.com/alchemyplatform/alchemy-web3

import { createAlchemyWeb3 } from "@alch/alchemy-web3";

// Using HTTPS
// Eth
// const web3 = createAlchemyWeb3(
//   "https://eth-mainnet.alchemyapi.io/v2/demo",
// );

// Matic
const web3 = createAlchemyWeb3(
  process.env.REACT_APP_ALCHEMY_API_POLYGON!,
);


const getNFTDetails = async (_tokenId:any, _contractAddress:any) =>{
    // Fetch metadata for a particular NFT:
console.log("fetching metadata for a crypto coven NFT...");
const response = await web3.alchemy.getNftMetadata({
  contractAddress: _contractAddress,
  tokenId: _tokenId
})

console.log(response);
return response;
}

export default getNFTDetails




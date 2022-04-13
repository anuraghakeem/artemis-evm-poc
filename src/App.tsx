import { initWeb3Onboard, initNotify } from "./Utils/onboard";
import { useConnectWallet, useSetChain, useWallets } from "@web3-onboard/react";

import "./App.css";
import Nav from "./Comp/Nav";
import Footer from "./Comp/Footer";
import Listing from "./Comp/Listing";
import Buying from "./Comp/Buying";
import Cancel from "./Comp/Cancel";
import { useEffect, useState } from "react";
import { ethers } from "ethers";

import internalTransferABI from "./JSON/transferAbi.json";
import { id } from "ethers/lib/utils";
import configJSON from "./JSON/config.json";


let provider: any;

let internalTransferContract: any;

function App() {
  const [{ wallet }, connect, disconnect] = useConnectWallet();
  const [{ chains, connectedChain, settingChain }, setChain] = useSetChain();
  const connectedWallets = useWallets();

  const [web3Onboard, setWeb3Onboard] = useState<any>(null);
  const [notify, setNotify] = useState<any>(null);
  // const [darkMode, setDarkMode] = useState(false)
  // const [desktopPosition, setDesktopPosition] = useState('bottomRight')
  // const [mobilePosition, setMobilePosition] = useState('top')
  const operatorAddress = configJSON.contract;

  const [toAddress, setToAddress] = useState("");

  useEffect(() => {
    setWeb3Onboard(initWeb3Onboard);

    setNotify(initNotify());
  }, []);

  useEffect(() => {
    if (!connectedWallets.length) return;

    const connectedWalletsLabelArray = connectedWallets.map(
      ({ label }) => label
    );
    window.localStorage.setItem(
      "connectedWallets",
      JSON.stringify(connectedWalletsLabelArray)
    );
  }, [connectedWallets]);

  useEffect(() => {
    if (!wallet?.provider) {
      provider = null;
    } else {
      provider = new ethers.providers.Web3Provider(wallet.provider, "any");

      internalTransferContract = new ethers.Contract(
        // "0x23398f90001c0c137e24f83bEbd5a63Dd4A0a194",
        operatorAddress,
        internalTransferABI,
        provider.getUncheckedSigner()
      );
    }
  }, [wallet]);

  useEffect(() => {
    const previouslyConnectedWallets = JSON.parse(
      window.localStorage.getItem("connectedWallets") || "{}"
    );
    async function setWalletFromLocalStorage() {
      await connect({ autoSelect: previouslyConnectedWallets[0] });
    }
    if (previouslyConnectedWallets?.length) {
      setWalletFromLocalStorage();
    }
  }, [web3Onboard, connect]);

  useEffect(()=>{
    if(!!wallet){
      if(!!connectedChain && !(chains.map((chain) => chain.id ).includes(connectedChain?.id))){
        alert('Incorrect Network Detected! Connect to Polygon Mainnet.');
        setChain({ chainId: '0x89' });
      }
    }
  },[connectedChain])

  // const readyToTransact = async () => {
  //   if (!wallet) {
  //     // const walletSelected = await connect()
  //     connect()
  //     // if (!walletSelected) return false
  //   }
  //   // prompt user to switch to Rinkeby for test
  //   await setChain({ chainId: '0x4' })

  //   return true
  // }

  // const sendHash = async () => {
  //   if (!toAddress) {
  //     alert("An Ethereum address to send Eth to is required.");
  //     return;
  //   }

  //   const signer = provider.getUncheckedSigner();

  //   const { hash } = await signer.sendTransaction({
  //     to: toAddress,
  //     value: 1000000000000000,
  //   });

  //   const { emitter } = notify.hash(hash);

  //   emitter.on("txPool", (transaction: any) => {
  //     return {
  //       // message: `Your transaction is pending, click <a href="https://rinkeby.etherscan.io/tx/${transaction.hash}" rel="noopener noreferrer" target="_blank">here</a> for more info.`,
  //       // or you could use onclick for when someone clicks on the notification itself
  //       onclick: () =>
  //         window.open(`https://rinkeby.etherscan.io/tx/${transaction.hash}`),
  //     };
  //   });

  //   emitter.on("txSent", console.log);
  //   emitter.on("txConfirmed", console.log);
  //   emitter.on("txSpeedUp", console.log);
  //   emitter.on("txCancel", console.log);
  //   emitter.on("txFailed", console.log);
  // };

  const listNFTForSale = async (
    tokenId: any,
    tokenAddress: any,
    price: any
  ) => {
    // const signer = provider.getUncheckedSigner()

    // const { hash } = await signer.sendTransaction({
    //   to: toAddress,
    //   value: 1000000000000000
    // })

    const { hash } = await internalTransferContract.listTokenForETH(
      tokenId,
      tokenAddress,
      price
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
  };
  
  const buyNFT = async (
    listingKey:any,
    buyingPrice:any,
  ) => {

    const { hash } = await internalTransferContract.buyListingWithETH(
      listingKey,
      {
        value: ethers.BigNumber.from(buyingPrice),
      }
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
  };

  const cancelListing = async (listingKey: any) => {
    const { hash } = await internalTransferContract.cancelListing(listingKey);

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
  };
  const checkPrice = async (listingKey: any) => {
    // const { hash } = await internalTransferContract.listing(listingKey);
    const res = await internalTransferContract.listings(listingKey);
    return res.price

    // const { emitter } = notify.hash(res.hash);

    // emitter.on("txPool", (transaction: any) => {
    //   return {
    //     // message: `Your transaction is pending, click <a href="https://rinkeby.etherscan.io/tx/${transaction.hash}" rel="noopener noreferrer" target="_blank">here</a> for more info.`,
    //     // or you could use onclick for when someone clicks on the notification itself
    //     onclick: () =>
    //       window.open(`https://polygonscan.com//tx/${transaction.hash}`),
    //   };
    // });

    // emitter.on("txSent", console.log);
    // emitter.on("txConfirmed", console.log);
    // emitter.on("txSpeedUp", console.log);
    // emitter.on("txCancel", console.log);
    // emitter.on("txFailed", console.log);
  };

  return (
    <div className="App">
      <Nav
        balance={wallet?.accounts[0]?.balance}
        address={wallet?.accounts[0]?.address}
        ens={wallet?.accounts[0]?.ens}
        connect={connect}
        connectedChain={wallet ? connectedChain : null}
        disconnect={disconnect}
        wallet={wallet}
        chains={chains}
        setChain={setChain}
        
      />
      <Listing 
      listNFTForSale={listNFTForSale} 
      notify={notify} 
      walletAddress={wallet?.accounts[0]?.address}
      />
      <Buying 
      checkPrice={checkPrice} 
      buyNFT={buyNFT}
      
      />
      <Cancel
        cancelListing={cancelListing}
        walletAddress={wallet?.accounts[0]?.address}
      />
      <Footer />
    </div>
  );
}

export default App;

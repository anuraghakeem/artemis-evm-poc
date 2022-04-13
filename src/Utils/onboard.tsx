import stagingNotify from "bnc-notify-staging";
import Notify from "bnc-notify";

// import blocknativeLogo from './icons/blocknative-logo'
// import blocknativeIcon from './icons/blocknative-icon'
import navLogo from "../Img/navLogo.png";

import { init } from "@web3-onboard/react";
import injectedModule from "@web3-onboard/injected-wallets";
// import trezorModule from '@web3-onboard/trezor'
// import ledgerModule from '@web3-onboard/ledger'
import walletConnectModule from "@web3-onboard/walletconnect";
// import walletLinkModule from '@web3-onboard/walletlink'
// import portisModule from '@web3-onboard/portis'
// import magicModule from '@web3-onboard/magic'
// import fortmaticModule from '@web3-onboard/fortmatic'
// import torusModule from '@web3-onboard/torus'
// import keepkeyModule from '@web3-onboard/keepkey'
// import gnosisModule from '@web3-onboard/gnosis'

// Replace with your DApp's Infura ID
const INFURA_ID = process.env.REACT_APP_ONBOARD_INFURA_ID;

const networkId = 137;
const apiUrl = process.env.REACT_APP_API_URL;
const staging = process.env.REACT_APP_STAGING;
const dappId = process.env.REACT_APP_ONBOARD_DAPP_ID;

const injected = injectedModule();
// const walletLink = walletLinkModule()
const walletConnect = walletConnectModule();

// const portis = portisModule({
//   apiKey: 'b2b7586f-2b1e-4c30-a7fb-c2d1533b153b'
// })

// const fortmatic = fortmaticModule({
//   apiKey: 'pk_test_886ADCAB855632AA'
// })

// const torus = torusModule()
// const ledger = ledgerModule()
// const keepkey = keepkeyModule()

// const gnosis = gnosisModule()

// const trezorOptions = {
//   email: 'test@test.com',
//   appUrl: 'https://www.blocknative.com'
// }

// const trezor = trezorModule(trezorOptions)

// const magic = magicModule({
//   apiKey: 'pk_live_02207D744E81C2BA'
// })

// type AccountCenter = {
//   enabled: boolean
//   position: AccountCenterPosition
//   expanded: boolean
// }
// type AccountCenterPosition =
//   | 'topRight'
//   | 'bottomRight'
//   | 'bottomLeft'
//   | 'topLeft'

// const AccountCenter = {
//   enabled: false,
// }

export const initWeb3Onboard = init({
  wallets: [
    injected,
    // ledger,
    // walletLink,
    // trezor,
    walletConnect,
    // gnosis,
    // magic,
    // fortmatic,
    // keepkey,
    // portis,
    // torus
  ],
  chains: [
    {
      id: "0x1",
      token: "ETH",
      label: "Ethereum",
      // rpcUrl: `https://mainnet.infura.io/v3/${INFURA_ID}`,
      rpcUrl: `https://cloudflare-eth.com/`,
    },
    // {
    //   id: '0x3',
    //   token: 'tROP',
    //   label: 'Ropsten',
    //   rpcUrl: `https://ropsten.infura.io/v3/${INFURA_ID}`
    // },
    // {
    //   id: "0x4",
    //   token: "rETH",
    //   label: "Rinkeby",
    //   rpcUrl: `https://rinkeby.infura.io/v3/${INFURA_ID}`,
    // },
    // {
    //   id: "0x38",
    //   token: "BNB",
    //   label: "Binance",
    //   rpcUrl: "https://bsc-dataseed.binance.org/",
    // },
    {
      id: "0x89",
      token: "MATIC",
      label: "Polygon",
      rpcUrl: "https://matic-mainnet.chainstacklabs.com",
    },
    // {
    //   id: '0xfa',
    //   token: 'FTM',
    //   label: 'Fantom',
    //   rpcUrl: 'https://rpc.ftm.tools/'
    // }
  ],
  appMetadata: {
    name: "Artemis EVM Listing",
    icon: navLogo,
    logo: navLogo,
    description: "Artemis Desc",
    recommendedInjectedWallets: [
      { name: "Coinbase", url: "https://wallet.coinbase.com/" },
      { name: "MetaMask", url: "https://metamask.io" },
    ],
    agreement: {
      version: "1.0.0",
      termsUrl: "https://www.blocknative.com/terms-conditions",
      privacyUrl: "https://www.blocknative.com/privacy-policy",
    },
    gettingStartedGuide: "https://blocknative.com",
    explore: "https://blocknative.com",
  },
  accountCenter: {
    desktop: {
      enabled: false,
      position: "bottomRight",
    },
  },
  i18n: {
    en: {
      "connect": {
        "selectingWallet": {
          "header": "One Click Login!",
          "sidebar": {
            "heading": "",
            "subheading": "Select Wallet to continue",
            "paragraph": "Simply click on any of the avaialble wallets and you're ready to go."
          },
          "recommendedWalletsPart1": "Artemis only supports",
          "recommendedWalletsPart2": "on this platform. Please use or install one of the supported wallets to continue",
          "installWallet": "You do not have any wallets installed that Artemis supports, please use a supported wallet",
          "agreement": {
            "agree": "I agree to the",
            "terms": "Terms & Conditions",
            "and": "and",
            "privacy": "Privacy Policy"
          }
        },
        "connectingWallet": {
          "header": "Waiting",
          "sidebar": {
            "subheading": "Approve Connection",
            "paragraph": "Please approve the connection in your wallet and authorize access to continue."
          },
          "mainText": "Connecting...",
          "paragraph": "Make sure to select all accounts that you want to grant access to.",
          "rejectedText": "Connection Rejected!",
          "rejectedCTA": "Click here to try again",
          "primaryButton": "Back to wallets"
        },
        "connectedWallet": {
          "header": "Connection Successful",
          "sidebar": {
            "subheading": "Connection Successful!",
            "paragraph": "Your wallet is now connected to Artemis"
          },
          "mainText": "Connected"
        }
      },
      "modals": {
        "actionRequired": {
          "heading": "Action required in {wallet}",
          "paragraph": "Please switch the active account in your wallet.",
          "linkText": "Learn more.",
          "buttonText": "Okay"
        },
        "switchChain": {
          "heading": "Switch Chain",
          "paragraph1": "Artemis requires that you switch your wallet to the {nextNetworkName} network to continue.",
          "paragraph2": "*Some wallets may not support changing networks. If you can not change networks in your wallet you may consider switching to a different wallet."
        },
        "confirmDisconnectAll": {
          "heading": "Disconnect all Wallets",
          "description": "Are you sure that you would like to disconnect all your wallets?",
          "confirm": "Confirm",
          "cancel": "Cancel"
        }
      },
      "accountCenter": {
        "connectAnotherWallet": "Connect another Wallet",
        "disconnectAllWallets": "Disconnect all Wallets",
        "currentNetwork": "Current Network",
        "appInfo": "App Info",
        "learnMore": "Learn More",
        "gettingStartedGuide": "Getting Started Guide",
        "smartContracts": "Smart Contract(s)",
        "explore": "Explore",
        "backToApp": "Back to App",
        "poweredBy": "powered by",
        "addAccount": "Add Account",
        "setPrimaryAccount": "Set Primary Account",
        "disconnectWallet": "Disconnect Wallet"
      }
    },
  },
});

export function initNotify() {
  const notify = staging ? stagingNotify : Notify;
  return notify({
    dappId,
    networkId,
    // apiUrl,
    onerror: (error) => console.log(`Notify error: ${error.message}`),
  });
}

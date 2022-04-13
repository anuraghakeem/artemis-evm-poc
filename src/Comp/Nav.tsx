import { useState } from "react";
import navLogo from "../Img/navLogo.png";
import networkEnum from "../Utils/networkEnum";

import walletIcon from "../Img/walletIcon.svg";

interface NAV {
  connect: any;
  address: any;
  balance: any;
  ens: any;
  connectedChain: any;
  disconnect:any;
  wallet: any;
  chains: any;
  setChain: any;
}

type NETWORKENUM = any;

const Nav = ({ connect, address, ens, balance, connectedChain, disconnect, wallet, chains, setChain }: NAV) => {

  const [dropdownVisibility, toggleDropdownVisibility] = useState(false);

  const networkenum: NETWORKENUM = networkEnum;

  const handleToggleDropdownVisibility = () => {
    console.log("fired!");
    toggleDropdownVisibility(!dropdownVisibility);
  };
  return (
    <div className="nav-container">
      <div className="logo-container">
        <img src={navLogo} className="artemis-logo" />
      </div>
      <div className="wallet-details">
        {!!address ? (
          <div onClick={() => handleToggleDropdownVisibility()}>
            <img className="wallet-image" src={walletIcon}></img>
          </div>
        ) : (
          <button onClick={() => connect()} className="btn-connect-wallet">
            Connect Wallet
          </button>
        )}
      </div>
      <div
        className={`profile-Dropdown ${dropdownVisibility ? ` visible ` : ``}`}
      >
        {!!address && (
          <div className={`user-info`}>
            {ens?.name ? (
              <div className="dropdown-item">
                <img
                  className="user-avatar"
                  src={ens.avatar ? ens.avatar : ""}
                  alt="avatar"
                ></img>
                <div
                  style={{
                    marginLeft: "10px",
                  }}
                >
                  {ens.name}
                </div>
              </div>
            ) : (
              address && (
                <div className="user-address dropdown-item">{address.substring(0, 6)}...{address.substr(-4)}</div>
              )
            )}
            {balance != null? (
              <div className="dropdown-item">
                <div className="dropdown-label">Balance</div>
                {Object.keys(balance).map((key, i) => (
                  <div key={key}>
                    <strong>
                      {Math.floor(balance[key] * 100) / 100} {key}
                    </strong>
                  </div>
                ))}
              </div>
            ):(
              <div className="dropdown-item">
                <div className="dropdown-label">Balance</div>
                  <div>
                    <strong>
                      0
                    </strong>
                  </div>
              </div>
            )
            }
            {connectedChain && connectedChain?.id && (
              <div className="dropdown-item">
                <div className="dropdown-label">Network</div>
                {/* <div>
                  <strong>{networkenum?.[connectedChain.id] || "local"}</strong>
                </div> */}
                <div>
                <select
                      onChange={({ target: { value } }) =>
                        setChain({ chainId: value })
                      }
                      value={connectedChain?.id}
                      className='chain-dropdown'
                    >
                      {chains.map(({ id, label }:any) => {
                        return (
                          <option value={id} key={id}>
                            {label}
                          </option>
                        )
                      })}
                    </select>
                </div>
              </div>
            )}
            <div className="logout-button">
              <button
                onClick={() => {
                  disconnect(wallet);
                  toggleDropdownVisibility(false);
                }
                }
                className="btn-connect-wallet"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Nav;

import navLogo from "../Img/navLogo.png";
const Nav = () => {
  return (
    <div className="nav-container">
      <div className="logo-container">
        <img src={navLogo} className="artemis-logo" />
      </div>
      <div className="wallet-details">
          <button className='btn-connect-wallet'>Connect Wallet</button>
      </div>
    </div>
  );
};

export default Nav;

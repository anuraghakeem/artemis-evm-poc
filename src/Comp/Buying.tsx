const Buying = () => {
  return (
    <div className="form-container">
      <h1>Buying</h1>
      <div className="form">
        <label>
          <strong>TokenID:</strong>
        </label>
        <textarea className="input-box" />
        <label>
          <strong>Token Address:</strong>
        </label>
        <textarea className="input-box" />
        <label>
          <strong>Seller Address:</strong>
        </label>
        <textarea className="input-box" />
      </div>

      <div className="buy-data-row">
        <strong>Price: </strong>
      </div>
      <div>
        <button className="btn-checkPrice">Check Price</button>
        <button>Buy</button>
      </div>
    </div>
  );
};

export default Buying;

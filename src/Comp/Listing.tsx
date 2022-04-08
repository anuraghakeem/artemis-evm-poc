const Listing = () => {
  return (
    <div className="form-container">
      <h1>Listing</h1>
      <div className="form">
        <label>
          <strong>TokenID:</strong>
        </label>
        <textarea value={0} className="input-box" />
        <label>
          <strong>Token Address:</strong>
        </label>
        <textarea className="input-box" />
        <label>
          <strong>Price in $MATIC: </strong>
        </label>
        <textarea className="input-box" />
      </div>
      <div>
        <button>List</button>
        <button>Approve Contract</button>
      </div>
    </div>
  );
};

export default Listing;

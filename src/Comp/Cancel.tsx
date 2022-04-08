const Cancel = () => {
  return (
    <div className="form-container">
      <h1>Cancelling</h1>
      <div className="form">
        <label>
          <strong>TokenID:</strong>
        </label>
        <textarea className="input-box" />
        <label>
          <strong>Token Address:</strong>
        </label>
        <textarea className="input-box" />
        <div>
          <button value="Cancel" className="btn">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cancel;

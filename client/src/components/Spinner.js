import React from "react";

class Spinner extends React.Component {
  render() {
    return (
      <div className="min-vh-100">
        <div className="row g-3 position-absolute top-50 start-50 translate-middle text-dark">
          <div className="col">{this.props.text} </div>
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Spinner;

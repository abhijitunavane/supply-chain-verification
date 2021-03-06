import React from "react";
import QrReader from "react-qr-reader";
import ShowProduct from "./ShowProduct";
import _private from "../keys/private.js";
import JSEncrypt from "jsencrypt";

function CheckValidity(license) {
  var _decrypt = new JSEncrypt();
  _decrypt.setPrivateKey(_private);
  var decrypted = _decrypt.decrypt(license);
  return decrypted;
}

class Customer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      scannedResult: null,
      productNotFound: null,
    };

    this.handleScan = this.handleScan.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  componentWillUnmount() {
    navigator.mediaDevices
      .getUserMedia({ audio: false, video: true })
      .then((mediaStream) => {
        mediaStream.getTracks().forEach((track) => track.stop());
      });
  }

  handleScan(result) {
    try {
      if (result) {
        result = CheckValidity(result);
        result = JSON.parse(result);
        this.props.handleSearchProductById(result.product_id);
        if (this.props.productFound) {
          this.setState({
            scannedResult: this.props.productFound,
            productNotFound: null,
          });
        }
      }
    } catch (err) {
      console.log("Error!", err);
      alert("Please, Use the correct QR code!");
    }
  }
  handleError(error) {
    console.log(`Error: ${error}`);
  }
  render() {
    return (
      <div className="container row d-flex mx-auto my-3">
        <div className="col-md-6 d-flex flex-column justify-content-center">
          <h1 className="text-center p-3">Hello Customer!</h1>
          <p className="text-center p-2">
            Scan the QR code present on the product
          </p>
        </div>
        <div className="col-md-6 p-3">
          <QrReader
            className="border border-success border-3"
            delay={300}
            onError={this.handleError}
            onScan={this.handleScan}
            style={{ width: "100%" }}
          />
        </div>
        {this.state.scannedResult ? (
          <ShowProduct
            showProductHeading={"Detailed View"}
            product={this.state.scannedResult}
            productNotFound={this.state.productNotFound}
          />
        ) : null}
        {this.props.productNotFound ? (
          <h1 className="text-center text-danger">Product is fake!</h1>
        ) : null}
      </div>
    );
  }
}

export default Customer;

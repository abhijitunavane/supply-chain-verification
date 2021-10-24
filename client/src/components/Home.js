import React from "react";
import company from "../imgs/company-goals.png";
import { Link } from 'react-router-dom';

class Home extends React.Component {
  render() {
    return (
      <div className="container-fluid my-3">
        <div className="row g-3">
          <div className="col-md-6 align-self-center p-5">
            <div className="my-3">
              <h1 className="text-uppercase text-danger text-center">
                Our Mission
              </h1>
              <p className="text-dark text-center fs-5 w-75 m-auto">
                We are a team of intelligence providing you a way out for your
                products from being counterfeited
              </p>
            </div>
            <div className="text-center my-3">
              <Link className="btn btn-danger rounded-pill" to="/manufacturer">
                Get Started
              </Link>
            </div>
          </div>
          <div className="d-none d-md-block col-md-6 align-self-center">
            <img src={company} className="img-fluid" alt="true" />
          </div>
        </div>
        <div className="row g-3">
          <div className="col p-5">
            <h1 className="text-center text-uppercase text-danger my-3">
              What Do We Offer
            </h1>
            <p className="text-center text-dark fs-5 w-50 m-auto">
              We offer you a solution to store your product details securely on
              our blockchain network and give you a QR code.
            </p>
          </div>
        </div>
        <div className="row g-3 px-4 d-flex justify-content-center">
          <div className="col-8 col-md-3 card shadow homecard">
            <div className="card-body text-center">
              <i className="fas fa-qrcode fs-1 d-block text-light m-auto my-1 bg-success p-2 rounded-pill"></i>
              <h5 className="card-title my-2">QR Codes</h5>
              <p className="card-text">
                QR codes are easy to use for customers and companies too. We
                will store the product details in the QR code.
              </p>
            </div>
          </div>
          <div className="col-8 col-md-3 card shadow homecard mx-3">
            <div className="card-body text-center">
              <i className="fas fa-handshake fs-1 d-block text-light m-auto my-1 bg-warning p-2 rounded-pill"></i>
              <h5 className="card-title my-2">Cost Effective</h5>
              <p className="card-text">
                Our motive is to store the data on the blockchain and it
                requires to pay some fees miners and it's very cheap
              </p>
            </div>
          </div>
          <div className="col-8 col-md-3 card shadow homecard ">
            <div className="card-body text-center">
              <i className="fas fa-lock fs-1 d-block text-light m-auto my-1 bg-success p-2 rounded-pill"></i>
              <h5 className="card-title my-2">Secure</h5>
              <p className="card-text">
                Storing your product details to blockchain is secure and not
                possible to get hacked.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;

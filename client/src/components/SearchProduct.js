import React from "react";
import axios from "axios";
import ShowProduct from "./ShowProduct";
import QRModal from "./../helpers/QRModal";
import Spinner from "./Spinner";

class SearchProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      searchQuery: "",
      scannedResult: null,
      showModal: false,
      product_brand: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleError = this.handleError.bind(this);
    this.handleScan = this.handleScan.bind(this);
    this.handleModalShowClick = this.handleModalShowClick.bind(this);
    this.handleModalCloseClick = this.handleModalCloseClick.bind(this);
    this.handleUserDetails = this.handleUserDetails.bind(this);
  }
  componentDidMount() {
    console.log("SearchProduct Mounted");
  }
  componentWillUnmount() {
    this.props.setProductFoundDefault();
    this.setState({
      scannedResult: null
    })
  }
  handleChange(event) {
    this.setState({
      searchQuery: event.target.value,
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.handleSearchProductById(this.state.searchQuery);
    if (this.props.productFound) {
      this.handleUserDetails();
    }
  }

  handleError(error) {
    console.log(`Error: ${error}`);
  }
  handleScan(result) {
    try {
      if (result) {
        result = JSON.parse(result);
        this.props.handleSearchProductById(result.product_id);
        if (this.props.productFound) {
          this.handleUserDetails(); 
          
          this.setState({
            scannedResult: this.props.productFound,
          });
      }
      }
    } catch (err) {
      console.log("Error!", err);
      alert("Please, Use the correct QR code!");
    }
  }

  handleModalShowClick(e) {
    e.preventDefault();
    this.setState({
      showModal: true,
    });
  }

  handleModalCloseClick() {
    this.setState({
      showModal: false,
    });
  }

  handleUserDetails() {
    this.setState({
      loading: true,
    });
    const user = JSON.parse(this.props.user);
    axios
      .post("http://localhost:2000/api/getManufacturerByEmail", {
        email: user.email,
      })
      .then((res) => {
        if (res.data.status === "User Found") {
          this.setState({
            product_brand: res.data.user.company_name,
          });

          if (this.state.product_brand !== this.props.productFound[2]) {
            this.props.handleFoundNotFound();            
          }
          this.setState({
            loading: false,
          });
        } else {
          console.log("User Not Found!");
        }
      })
      .catch((err) => console.error(err));
  }

  render() {
    if (this.state.loading) {
      return <Spinner text="Searching" />
    }
    return (
      <div className="container my-3 p-2 bg-light min-vh-100 ">
        <h1 className="text-center py-3 border-bottom border-3 border-success">
          Search Product
        </h1>
        <div className="card p-5 my-5">
          <div className="row d-flex ">
            <div className="col-md-6 align-self-center">
              <form
                className="d-block d-sm-flex justify-content-center align-content-center text-center my-3"
                onSubmit={this.handleSubmit}
              >
                <div>
                  <input
                    className="form-control my-2 shadow-none p-2 border-0 border-bottom border-success border-3 rounded-0"
                    type="search"
                    placeholder="Search product Id..."
                    aria-label="Search"
                    value={this.state.searchQuery}
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="btn p-2 my-2 btn-sm btn-outline-success shadow-none"
                  >
                    Search <i className="fas fa-search"></i>
                  </button>
                </div>
              </form>
            </div>
            <div className="col-md-6 align-self-center text-center my-3">
              <button
                type="button"
                className="btn btn-success shadow-none"
                onClick={this.handleModalShowClick}
              >
                Scan QR code <i className="fas fa-qrcode"></i>
              </button>
            </div>
          </div>
          {this.props.productFound || this.state.scannedResult ? (
            <ShowProduct
              showProductHeading={"Product Found"}
              product={this.props.productFound || this.state.scannedResult}
              productNotFound={this.props.productNotFound}
            />
          ) : this.props.productNotFound ? (
            <ShowProduct
              showProductHeading={"Product Not Found, Try Again!"}
              product={this.props.productFound}
              productNotFound={this.props.productNotFound}
            />
          ) : null}
        </div>

        {this.state.showModal ? (
          <QRModal
            handleError={this.handleError}
            handleScan={this.handleScan}
            handleModalCloseClick={this.handleModalCloseClick}
          />
        ) : null}
      </div>
    );
  }
}

export default SearchProduct;

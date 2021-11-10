import React from "react";
import axios from "axios";
import ShowProduct from "./ShowProduct";
import Spinner from "./Spinner";

class AddProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      err: false,
      loading: false,
      product_name: "",
      product_brand: "",
      product_price: "",
    };

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleAddProduct = this.handleAddProduct.bind(this);
    this.setDefaulState = this.setDefaulState.bind(this);
    this.handleUserDetails = this.handleUserDetails.bind(this);
  }

  componentDidMount() {
    console.log("AddProduct.js mounted");
    this.handleUserDetails();
  }
  componentWillUnmount() {
    console.log("AddProduct unmounted");
    this.props.setProductAddedDefault();
  }

  handleOnChange(event) {
    switch (event.target.id) {
      case "product_name": {
        this.setState({
          product_name: event.target.value,
        });
        break;
      }
      case "product_brand": {
        this.setState({
          product_brand: event.target.value,
        });
        break;
      }
      case "product_price": {
        this.setState({
          product_price: event.target.value,
        });
        break;
      }
      default: {
        console.log("Invalid method!");
      }
    }
  }
  handleAddProduct(event) {
    const { handleAddProductToChain } = this.props;

    event.preventDefault();

    const product_details = {
      product_name: this.state.product_name,
      product_brand: this.state.product_brand,
      product_price: this.state.product_price,
    };
    handleAddProductToChain(product_details, this.setDefaulState);
    
  }
  setDefaulState(err) {
    if (err) {
      console.log("Error");
      this.setState({
        err: true
      });
      return;
    }
    this.setState({
      product_name: "",
      product_price: "",
      err: false
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
      return <Spinner text="Loading" />
    } 
    return (
      <div className="container my-3 bg-light p-2 ">
        <h1 className="text-center border-bottom border-3 border-success py-3">Add Product</h1>
        <div className="card my-5 p-3 ">          
          <form onSubmit={this.handleAddProduct} className="form-group p-md-4 align-self-center">
            <div className="row m-4">
              <div className="col-md-2">
                <label className="form-label" htmlFor="product_name">
                  Product Name
                </label>
              </div>
              <div className="col-md-10">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Enter product name..."
                  id="product_name"
                  onChange={this.handleOnChange}
                  value={this.state.product_name}
                  autoFocus
                  required
                />
              </div>
            </div>
            <div className="row m-4">
              <div className="col-md-2">
                <label className="form-label" htmlFor="product_brand">
                  Product Brand
                </label>
              </div>
              <div className="col-md-10">
                <input
                  className="form-control"
                  type="text"
                  id="product_brand"
                  onChange={this.handleOnChange}
                  value={this.state.product_brand}
                  readOnly
                  required
                />
              </div>
            </div>
            <div className="row m-4">
              <div className="col-md-2">
                <label className="form-label" htmlFor="product_price">
                  Product Price
                </label>
              </div>
              <div className="col-md-5">
                <input
                  className="form-control"
                  type="number"
                  placeholder="Enter product price..."
                  id="product_price"
                  min="0"
                  onChange={this.handleOnChange}
                  value={this.state.product_price}
                  required
                />
              </div>
              <div
                id="productPriceHelp"
                className="form-text col text-success p-2"
              >
                Enter only number eg. 10000
              </div>
            </div>
            {this.state.err?<div className="col-md-12 m-0 text-center text-danger animate__animated animate__slideInUp">Error in adding product please, try again!</div>: null}
            <div className="row m-4">
              <input
                className="btn btn-primary form-control btn-lg col shadow-none"
                type="submit"
                value="Add Product"
              />
            </div>
          </form>
        </div>
        {this.props.product ? (
          <ShowProduct
            showProductHeading={"Product Added"}
            product={this.props.product}
          />
        ) : null}
      </div>
    );
  }
}

export default AddProduct;

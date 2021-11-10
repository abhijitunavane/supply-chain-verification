import React, { Component } from "react";
import ProductStorageContract from "./contracts/ProductStorage.json";
import getWeb3 from "./getWeb3";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/js/fontawesome";
import "@fortawesome/fontawesome-free/js/solid";
import "bootstrap/dist/js/bootstrap";
import "animate.css";
import "./App.css";
import Home from "./components/Home";
import AddProduct from "./components/AddProduct";
import Navbar from "./components/Navbar";
import Manufacturer from "./components/Manufacturer";
import SearchProduct from "./components/SearchProduct";
import Spinner from "./components/Spinner";
import Footer from "./components/Footer";
import ScrollButton from "./helpers/ScrollButton";
import Customer from "./components/Customer";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      web3: null,
      accounts: null,
      contract: null,
      productAdded: null,
      productFound: null,
      productNotFound: null,
      user: null,
      products: [],
    };

    this.handleAddProductToChain = this.handleAddProductToChain.bind(this);
    this.handleProductsPresent = this.handleProductsPresent.bind(this);
    this.handleSearchProductById = this.handleSearchProductById.bind(this);
    this.handleFoundNotFound = this.handleFoundNotFound.bind(this);
    this.handleUser = this.handleUser.bind(this);
    this.setProductAddedDefault = this.setProductAddedDefault.bind(this);
    this.setProductFoundDefault = this.setProductFoundDefault.bind(this);
  }
  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = ProductStorageContract.networks[networkId];
      const instance = new web3.eth.Contract(
        ProductStorageContract.abi,
        deployedNetwork && deployedNetwork.address
      );

      console.log("Mounted app");

      // Set web3, accounts, and contract to the state
      this.setState({ web3, accounts, contract: instance });

      const loggedInUser = localStorage.getItem("user");
      if (loggedInUser) {
        this.setState({
          user: loggedInUser,
        });
      }
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };
  handleAddProductToChain(state, setDefaulState) {
    const { contract, accounts } = this.state;
    const { product_name, product_brand, product_price } = state;

    console.log("Handle add product to chain");

    // Add the product to the blockchain
    contract.methods
      .createProduct(product_name, product_brand, product_price)
      .send({ from: accounts[0] })
      .then(() => {
        console.log("Product Added");
        this.handleProductsPresent();
        setDefaulState(false);
      })
      .catch((err) => {
        console.log(`There is an error`);
        setDefaulState(true);
      });
  }
  setProductAddedDefault() {
    this.setState({
      productAdded: null,
    });
  }
  setProductFoundDefault() {
    this.setState({
      productFound: null,
      productNotFound: null,
    });
  }
  handleProductsPresent() {
    const { contract } = this.state;
    contract.methods
      .getProductIds()
      .call()
      .then((productIds) => {
        if (productIds.length > 0) {
          this.setState({
            productAdded: productIds.length,
          });

          contract.methods
            .getNewlyAddedProduct()
            .call()
            .then((product, err) => {
              if (product) {
                // console.log(product);
                this.setState({
                  productAdded: product,
                });
              } else {
                console.log(`Error : ${err}`);
              }
            });
        } else {
          console.log("Products not present!");
          this.setState({
            productAdded: null,
          });
        }
      });
  }

  handleSearchProductById(id) {
    const { contract } = this.state;
    contract.methods
      .getProductIds()
      .call()
      .then((productIds) => {
        if (productIds.length > 0) {
          var exists = false;
          productIds.forEach((product_id) => {
            if (product_id === id) {
              exists = true;
              return;
            }
          });
          if (exists) {
            contract.methods
              .getProduct(id)
              .call()
              .then((product, err) => {
                if (product) {
                  this.setState({
                    productFound: product,
                    productNotFound: null,
                  });
                } else {
                  console.log(`Error : ${err}`);
                }
              });
          } else {
            this.handleFoundNotFound();
          }
        } else {
          // console.log(`Products Not Present!`);
          this.handleFoundNotFound();
        }
      })
      .catch((err) => {
        console.log("Error: ", err);
        this.handleFoundNotFound();
        return;
      });
  }
  handleFoundNotFound() {
    this.setState({
      productFound: null,
      productNotFound: 1,
    });
  }

  handleUser(event) {
    this.setState({
      user: event,
    });
  }

  render() {
    if (!this.state.web3 && localStorage.getItem("user") === this.state.user) {
      console.log(this.state.user);
      return (
        <div>
          <Spinner text="Loading Web3, accounts, and contract..." />
        </div>
      );
    }
    return (
      <div className="App position-relative">
        <Router>
          <div className="position-relative">
            <Navbar user={this.state.user} />
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/manufacturer">
                <Manufacturer
                  handleUser={this.handleUser}
                  products={this.state.products}
                  contract={this.state.contract}
                />
              </Route>
              {this.state.user ? (
                <Route path="/manufacturer/addproduct">
                  <AddProduct
                    user={this.state.user}
                    handleAddProductToChain={this.handleAddProductToChain}
                    product={this.state.productAdded}
                    setProductAddedDefault={this.setProductAddedDefault}
                  />
                </Route>
              ) : (
                <Route path="/manufacturer/addproduct">
                  <Spinner text="Loading" />
                </Route>
              )}
              {this.state.user ? (
                <Route path="/manufacturer/searchproduct">
                  <SearchProduct
                    user={this.state.user}
                    handleSearchProductById={this.handleSearchProductById}
                    productFound={this.state.productFound}
                    productNotFound={this.state.productNotFound}
                    setProductFoundDefault={this.setProductFoundDefault}
                    handleFoundNotFound={this.handleFoundNotFound}
                  />
                </Route>
              ) : (
                <Route path="/manufacturer/searchproduct">
                  <Spinner text="Loading" />
                </Route>
              )}

              <Route exact path="/customer">
                <Customer 
                handleSearchProductById={this.handleSearchProductById}
                productFound={this.state.productFound}
                productNotFound={this.state.productNotFound}
                />
              </Route>
            </Switch>
            <Footer />
            <ScrollButton />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;

import React from "react";
import Dashboard from "../helpers/Dashboard";
import EditProfile from "../helpers/EditProfile";
import Spinner from "./Spinner";
import axios from "axios";
import Sidebar from "../helpers/Sidebar";

class ManufacturerProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      loading: false,
      products: [],
      profile: false,
      dashboard: true,
    };
    this.handleLogout = this.handleLogout.bind(this);
    this.handleUserDetails = this.handleUserDetails.bind(this);
    this.handleGetProducts = this.handleGetProducts.bind(this);
    this.handleDashboard = this.handleDashboard.bind(this);
    this.handleProfile = this.handleProfile.bind(this);
  }
  handleLogout() {
    this.setState({
      loading: true,
      products: [],
    });
    this.props.handleLogout();
  }
  componentDidMount() {
    console.log("Manufacturer Profile Mounted");
    this.handleUserDetails();
  }
  componentWillUnmount() {
    console.log("Manufacturer Profile UnMounted");
    this.setState({
      loading: false,
      products: [],
    });
  }
  handleProfile(event) {
    event.preventDefault();
    this.setState({
      dashboard: false,
      profile: true
    });
  }
  handleDashboard(event) {
    event.preventDefault();
    this.setState({
      dashboard: true,
      profile: false,
    });
  }
  handleUserDetails() {
    const user = JSON.parse(this.props.user);
    axios
      .post("http://localhost:2000/api/getManufacturerByEmail", {
        email: user.email,
      })
      .then((res) => {
        if (res.data.status === "User Found") {
          this.setState({
            user: res.data.user,
            products: []
          });
          
          this.handleGetProducts();
        } else {
          console.log("User Not Found!");
        }
      })
      .catch((err) => console.error(err));
  }

  handleGetProducts() {
    const contract = this.props.contract;
    this.setState({
      loading: true,
    });
    contract.methods
      .getProductIds()
      .call()
      .then((productIds) => {
        if (productIds.length > 0) {
          productIds.forEach((id) => {
            contract.methods
              .getProduct(id)
              .call()
              .then((product, err) => {
                if (product && product[2] === this.state.user.company_name) {
                  this.setState({
                    products: [...this.state.products, product],
                  });
                } 
              });
          });
          this.setState({
            loading: false,
          });
        } else {
          // console.log("No Products");
          this.setState({
            loading: false,
          });
        }
      })
      .catch((err) => console.log(err));
  }

  render() {
    if (this.state.loading) {
      return <Spinner text="Fetching Data" />;
    }

    return (
      <div className="position-relative p-3">
        {this.state.user ? (
          <div className="row">
            <Sidebar
              handleProfile={this.handleProfile}
              handleDashboard={this.handleDashboard}
              handleLogout={this.handleLogout}
              user={this.state.user.name}
            />
            <div className="col">
              <h1 className="text-center p-3">
                Welcome {this.state.user.name}!
              </h1>
              {this.state.dashboard ? (
                <Dashboard products={this.state.products} />
              ) : null}
              {this.state.profile ? (
                <EditProfile handleGetProducts={this.handleGetProducts} handleUserDetails={this.handleUserDetails} user={this.state.user} />
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default ManufacturerProfile;

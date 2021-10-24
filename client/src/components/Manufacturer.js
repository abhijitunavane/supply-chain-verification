import React from "react";
import Signup from "./Signup";
import Login from "./Login";
import Spinner from "./Spinner";
import ManufacturerProfile from "./ManufacturerProfile";

class Manufacturer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      LoggedIn: 0,
      SignedUp: 0, // change this to 0
      user: null,
    };

    this.handleNavigation = this.handleNavigation.bind(this);
    this.handleAuth = this.handleAuth.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }
  componentDidMount() {
    console.log("Manufacture Mounted");
    
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      this.setState({
        user: loggedInUser,
      });
      this.props.handleUser(loggedInUser);
    }

    
  }
  componentWillUnmount() {
  }

  handleNavigation(event) {
    event.preventDefault();
    console.log("handleNavigation");

    this.handleAuth(event.target.id);
  }
  handleAuth(event) {
    switch (event) {
      case "login": {
        console.log("LOGIN");
        this.setState({
          SignedUp: !this.state.SignedUp,
        });
        break;
      }
      case "signup": {
        console.log("SIGNUP");
        this.setState({
          LoggedIn: !this.state.LoggedIn,
        });
        break;
      }
      default: {
        console.log("Wrong Event!");
      }
    }
  }

  handleSignup() {
    this.setState({
      LoggedIn: 0,
      SignedUp: 1,
    });
  }
  handleLogin() {
    this.setState({
      LoggedIn: 1,
      SignedUp: 1,
    });
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      this.setState({
        user: loggedInUser,
      });
      this.props.handleUser(loggedInUser);
    }
  }

  handleLogout() {
    this.setState({
      LoggedIn: 0,
      SignedUp: 0,
      user: null,
    });
    localStorage.clear();
    this.props.handleUser(null);
  }

  

  render() {
    const { LoggedIn, SignedUp, user } = this.state;
    const { handleNavigation, handleSignup, handleLogin, handleLogout } = this;
    
    
    return (
      <div className="container bg-light my-3 p-md-3 min-vh-100">
        <h1 className="text-center p-3 border-3 border-bottom border-warning text-dark">
          Manufacturer
        </h1>
        {user ? (
          <ManufacturerProfile
            user={user}
            handleLogout={handleLogout}
            contract={this.props.contract}
          />
        ) : !SignedUp && !LoggedIn ? (
          <Signup
            handleSignup={handleSignup}
            handleNavigation={handleNavigation}
          />
        ) : !LoggedIn ? (
          <Login
            handleNavigation={handleNavigation}
            handleLogin={handleLogin}
          />
        ) : (
          <>Products </>
        )}
      </div>
    );
  }
}

export default Manufacturer;

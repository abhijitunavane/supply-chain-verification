import React from "react";
import axios from "axios";
import Spinner from "./Spinner";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      LoggedIn: 0,
      email: "",
      password: "",
      incorrectPass: 0,
      emailNotFound: 0,
      loading: false
    };

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    console.log("Login Mounted");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  componentWillUnmount() {
    console.log("Login Unmounted");
    this.setState({
      loading: false
    })
  }
  handleOnChange(event) {
    event.preventDefault();
    this.setState({ [event.target.id]: event.target.value });
  }
  handleSubmit(event) {
    event.preventDefault();
    
    const { password, email } = this.state;
    this.setState({
      confirmPass: 1,
      SignedUp: 1,
      loading: true
    });
    axios
      .post("http://localhost:2000/api/getManufacturer", {
        email: email.toLowerCase(),
        password: password,
      })
      .then((res) => {
        this.setState({
          loading: false
        });
        if (res.data === "User exists, but password is incorrect try again!") {
          this.setState({
            emailNotFound: 0,
            incorrectPass: 1,
          });
        } else if (res.data === "User Not Found!") {
          this.setState({
            emailNotFound: 1,
            incorrectPass: 0,
          });
        } else {
          this.setState({
            emailNotFound: 0,
            incorrectPass: 0,
            email: "",
            password: "",
          });
          localStorage.setItem("user", JSON.stringify(res.data));
          this.props.handleLogin();
        }
      })
      .catch((err) => console.error(err));
      
  }

  render() {
    const { password, email, LoggedIn, emailNotFound, incorrectPass } =
      this.state;
    const { handleSubmit, handleOnChange } = this;
    const { handleNavigation } = this.props;
    if(this.state.loading) {
      return <Spinner text="Logging You in" />;
    }
    return (
      <div className="row d-flex flex-column g-3 flex-md-row flex-column-reverse p-md-5">
        <div className="col-12 col-md-6 p-5 text-center d-flex flex-column justify-content-center bg-warning p-3 animate__animated animate__fadeIn">
          <h1>Welcome!</h1>
          <p className="lead">Don't Have An Account?</p>
          <button
            id="login"
            type="button"
            className="btn btn-outline-dark shadow-none"
            onClick={handleNavigation}
          >
            Sign Up
          </button>
        </div>
        <div className="col-12 col-md-6 p-3 justify-content-center animate__animated animate__fadeIn">
          <h1 className="text-center text-dark p-3">Log In</h1>
          <form className="row g-3" onSubmit={handleSubmit}>
            <div className="col-12">
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input
                className="form-control"
                type="email"
                id="email"
                value={email}
                onChange={handleOnChange}
                autoFocus
                required
              />
              {emailNotFound ? (
                <div className="text-danger">Email Not Found!</div>
              ) : null}
            </div>
            <div className="col-12">
              <label className="form-label" htmlFor="password">
                Password
              </label>
              <input
                className="form-control"
                type="password"
                id="password"
                value={password}
                onChange={handleOnChange}
                autoComplete="on"
                required
              />
              {incorrectPass ? (
                <div className="text-danger">Incorrect Password</div>
              ) : null}
            </div>
            <div className="col-12 text-center">
              <button className="w-100 btn btn-warning p-2" type="submit">
                Log In
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;

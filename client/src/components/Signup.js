import React from "react";
import axios from "axios";
import Spinner from "./Spinner";

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      SignedUp: 0,
      emailExists: false,
      confirmPass: 1,
      loading: false,
      name: "",
      company_name: "",
      email: "",
      password: "",
      confirm_password: "",
    };

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    console.log("Signup Mounted");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  componentWillUnmount() {
    console.log("Signup Will unMounted");
    this.setState({
      loading: false
    });
  }
  handleOnChange(event) {
    event.preventDefault();
    this.setState({ [event.target.id]: event.target.value });
  }
  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      loading: true
    });
    const {
      name,
      company_name,
      password,
      confirm_password,
      email,
    } = this.state;

    if (password !== confirm_password) {
      this.setState({
        loading: false
      });
      this.setState({
        confirmPass: 0,
      });
      console.log("Wrong Password!");
    } else {
      this.setState({
        confirmPass: 1,
        SignedUp: 1,
      });
      axios
        .post("http://localhost:2000/api/addManufacturer", {
          name: name,
          company_name: company_name,
          email: email.toLowerCase(),
          password: password,
        })
        .then((res) => {
          this.setState({
            loading: false
          });
          if (res.data === 'User exists!'){
            this.setState({
              emailExists: true
            });
          }
          else if (res.data === 'User Added Successfully!'){
            this.props.handleSignup();
          } else {
            console.log("Error!");
          }
        })
        .catch((err) => console.error(err));
    }
  }

  render() {
    const {
      name,
      company_name,
      password,
      confirm_password,
      email,
      confirmPass,
      emailExists
    } = this.state;
    const { handleSubmit, handleOnChange } = this;
    const { handleNavigation } = this.props;
    if (this.state.loading) {
      return <Spinner text="Signing you up" />;
    }
    return (
      <div className="row d-flex flex-column g-3 flex-md-row flex-column-reverse">
        <div className="col-12 col-md-6 p-3 bg-light animate__animated animate__fadeIn">
          <h1 className="text-center text-dark p-3">Sign Up</h1>
          <form className="row g-3" onSubmit={handleSubmit}>
            <div className="col-12">
              <label className="form-label" htmlFor="name">
                Name
              </label>
              <input
                className="form-control"
                type="text"
                id="name"
                value={name}
                onChange={handleOnChange}     
                autoFocus           
                required
              />
            </div>
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
                required
              />
              {emailExists ?<div className="text-danger">Email Already Exists!</div>:null}
            </div>
            <div className="col-12">
              <label className="form-label" htmlFor="company_name">
                Company Name
              </label>
              <input
                className="form-control"
                type="text"
                id="company_name"
                value={company_name}
                onChange={handleOnChange}
                required
              />
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
            </div>
            <div className="col-12">
              <label className="form-label" htmlFor="confirm_password">
                Confirm Password
              </label>
              <input
                className="form-control"
                type="password"
                id="confirm_password"
                value={confirm_password}
                onChange={handleOnChange}
                autoComplete="on"
                required
              />
              {!confirmPass ? (
                <div className="text-danger">
                  Please, Enter correct password!
                </div>
              ) : null}
            </div>
            <div className="col-12 text-center">
              <button id="signup" className="w-100 btn btn-warning p-2" type="submit">
                Sign Up
              </button>
            </div>
          </form>
        </div>
        <div className="col-12 col-md-6 p-5 text-center d-flex flex-column justify-content-center bg-warning p-3 animate__animated animate__fadeIn">
          <h1>Welcome!</h1>
          <p className="lead">Already Registered?</p>
          <button
          id="login"
            type="button"
            className="btn btn-outline-dark shadow-none"
            onClick={handleNavigation}
          >
            Login
          </button>
        </div>
      </div>
    );
  }
}

export default Signup;

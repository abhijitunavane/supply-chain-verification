import React from "react";
import axios from "axios";

class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      company_name: "",
      email: "",
      readOnly: true,
      disabled: "disabled"
    };
    this.fetchUser = this.fetchUser.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleMakeChanges = this.handleMakeChanges.bind(this);
    this.handleSaveChanges = this.handleSaveChanges.bind(this);
  }
  componentDidMount() {
    this.fetchUser();
  }
  fetchUser() {
    const user = this.props.user;
    this.setState({
      name: user.name,
      company_name: user.company_name,
      email: user.email
    });
  }
  handleOnChange(event) {
    event.preventDefault();
    this.setState({ [event.target.id]: event.target.value });
  }
  handleSaveChanges(event) {   
    event.preventDefault();
    console.log("Save Changes");

    const update = {
      name: this.state.name,
      company_name: this.state.company_name,
      email: this.state.email
    }

    axios.post("http://localhost:2000/api/updateManufacturer", update)
    .then(res => {
      if (res.data.status === "User Updated") {
        const user = res.data.user;
        this.setState({
          name: user.name,
          company_name: user.company_name,          
          readOnly: true,
          disabled: "disabled"
        });
        this.props.handleUserDetails();
      } else {
        console.log('User not found');
      }
    })
    .catch(err => console.log(err));
    this.setState({
      readOnly: true
    })
  }
  handleMakeChanges(event) {
    event.preventDefault();
    console.log("Make Changes");
    this.setState({
      readOnly: false,
      disabled: "",
    })
  }

  render() {
    return (
      <div className="card my-2">
          <h1 className="m-2 p-2">Update Profile</h1>
        <form className="row g-3 m-2 p-2" onSubmit={this.handleSaveChanges}>
          <div className="col-md-12">
            <label className="form-label" htmlFor="name">Name</label>
            <input

              id="name"
              readOnly={this.state.readOnly}
              className="form-control"
              type="text"
              value={this.state.name}
              onChange={this.handleOnChange}
              required
            />
          </div>
          <div className="col-md-12">
            <label className="form-label" htmlFor="company_name">Company Name</label>
            <input
              id="company_name"
              readOnly={this.state.readOnly}
              className="form-control"
              type="text"
              value={this.state.company_name}
              onChange={this.handleOnChange}
              required
            />
          </div>
          <div  className="col-md-12">
            <label className="form-label" htmlFor="email">Email</label>
            <input
              id="email"              
              className="form-control"
              type="email"
              value={this.state.email} 
              readOnly
              required
            />
          </div>
          <div className="col text-center text-md-end">
            <input
              className="btn btn-warning m-2 ms-0"
              type="button"
              value="Make Changes"
              onClick={this.handleMakeChanges}
            />
            <input
              className="btn btn-success m-2 ms-0"
              type="submit"
              value="Save Changes"
              onClick={this.handleSaveChanges}
              disabled={this.state.disabled}
            />
          </div>
        </form>
      </div>
    );
  }
}

export default EditProfile;

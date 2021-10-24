import React from "react";

class Sidebar extends React.Component {
  render() {
    return (
      <div className="col-auto px-sm-2 px-0 bg-dark min-vh-100">
        <div className=" d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white">
          <div className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white">
            <span className="fs-5 d-none d-sm-inline">Menu</span>
          </div>
          <ul
            className="nav flex-column"
            id="menu"   
          >
            <li className="nav-item my-1">
              <button className="btn btn-secondary bg-transparent border-0" onClick={this.props.handleDashboard}>
                <i className="fas fa-tachometer-alt"></i>{" "}
                <span className="ms-1 d-none d-sm-inline">Dashboard</span>{" "}
              </button>
            </li>
            <li className="nav-item my-1">
              <button className="btn btn-secondary bg-transparent border-0 " onClick={this.props.handleProfile}>
              <i className="fas fa-user-circle"></i>{" "}
                <span className="ms-1 d-none d-sm-inline text-nowrap">Profile</span>
              </button>
            </li>
          </ul>
          <div className="dropdown my-1">
            <button
              className="text-white dropdown-toggle btn btn-secondary border-0 bg-transparent shadow-none"
              id="dropdownUser1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span className="d-none d-sm-inline mx-1 text-small">{this.props.user}</span>
            </button>
            <ul className="dropdown-menu dropdown-menu-dark">
              <li>
                <button className="dropdown-item text-small" onClick={this.props.handleLogout}>
                <i className="fas fa-sign-out-alt"></i> Sign out
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Sidebar;

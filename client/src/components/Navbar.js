import React from "react";
import { NavLink, Link } from "react-router-dom";

class Navbar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light p-3 sticky-top shadow">
        <div className="container-fluid justify-content-center justify-content-sm-between">
          <Link className="navbar-brand user-select-none" to="/">
            Supply Chain Verification
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarLinksList"
            aria-controls="navbarLinksList"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarLinksList">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/manufacturer">
                  Manufacturer
                </NavLink>
              </li>
              {this.props.user ? <><li className="nav-item">
                <NavLink className="nav-link" to="/manufacturer/addproduct">
                  Add Product
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/manufacturer/searchproduct">
                  Search Product
                </NavLink>
              </li></>:null }
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;

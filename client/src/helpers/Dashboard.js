import React from "react";
import moment from "moment";

class Dashboard extends React.Component {
  render() {
    return (
      <div className="card my-2">
        <h1 className="m-2 p-2">Dashboard</h1>
        <div className="row p-1 g-3 m-2 p-2">
          <div className="col-md-3 h-100 card m-1">
            <p className="lead">No. of Products</p>
            <p>{this.props.products.length}</p>
          </div>
          <div className="col-md card m-1">
            <p className="lead">Products Timeline</p>
            {this.props.products.length > 0 ? (
              <ul className="timeline">
                {this.props.products
                  .slice(0)
                  .reverse()
                  .map((a, idx) => (
                    <li className="bg-light p-2" key={idx}>
                      <p className="p-1">
                        {moment(a[4] * 1000).format("DD MMM YYYY, hh:mm:ss a")}
                      </p>
                      <div className="row p-1">
                        <div className="col border-end border-1 border-primary">
                          Product Id{" "}
                        </div>
                        <div className="col">{a[0]}</div>
                      </div>
                      <div className="row p-1">
                        <div className="col border-end border-1 border-primary">
                          Product Name
                        </div>
                        <div className="col">{a[1]}</div>
                      </div>
                      <div className="row p-1">
                        <div className="col border-end border-1 border-primary">
                          Product Brand Name
                        </div>
                        <div className="col">{a[2]}</div>
                      </div>
                      <div className="row p-1">
                        <div className="col border-end border-1 border-primary">
                          Product Price
                        </div>
                        <div className="col">{a[3]}</div>
                      </div>
                    </li>
                  ))}
              </ul>
            ) : (
              <p>No Products</p>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;

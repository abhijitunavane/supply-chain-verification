import React from "react";
import RenderProducts from "./../helpers/RenderProducts";

class ShowProduct extends React.Component {
  constructor(props) {
    super(props);
    this.ShowProductRef = React.createRef();
  }
  componentDidMount() {
    console.log("ShowProduct Mounted ");
    // console.log(this.props.product, this.props.productNotFound);

    if (this.ShowProductRef.current) {      
      this.ShowProductRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }
  render() {
    return (
      <div
        ref={this.ShowProductRef}
        className="container card p-3 table-responsive"
      >
        <h1 className="text-center my-3">{this.props.showProductHeading}</h1>
        {this.props.productNotFound ? null : (
          <table className="table table-hover my-3 p-3">
            <thead className="text-center table-dark">
              <tr className="align-middle">
                <th scope="col">Product Id</th>
                <th scope="col">Product Name</th>
                <th scope="col">Product Brand</th>
                <th scope="col">Product Price</th>
                <th scope="col">Product Manufacturing Date</th>
                <th scope="col">QR code</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {this.props.product && (
                <RenderProducts product={this.props.product} />
              )}
            </tbody>
          </table>
        )}
      </div>
    );
  }
}

export default ShowProduct;

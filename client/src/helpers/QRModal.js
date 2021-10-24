import React from "react";
import $ from "jquery";
import QrReader from "react-qr-reader";
window.jQuery = $;
window.$ = $;
global.jQuery = $;

class QRModal extends React.Component {
  componentDidMount() {
    const { handleModalCloseClick } = this.props;
    $(this.modal).modal("show");
    $(this.modal).on("hidden.bs.modal", handleModalCloseClick);
  }

  render() {
    return (
      <div className="p-2">
        <div
          className="modal fade"
          ref={(modal) => (this.modal = modal)}
          id="exampleModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Search Product By Scanning QR code
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <QrReader
                  className="border border-success border-3"
                  delay={300}
                  onError={this.props.handleError}
                  onScan={this.props.handleScan}
                  style={{ width: "100%" }}
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-success"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default QRModal;

import React from 'react';
import QRCode from "qrcode";

import JSEncrypt from 'jsencrypt';
import _public from "../keys/public.js";

var encrypt = new JSEncrypt();
encrypt.setPublicKey(_public);

function CreateEncryptedQRCode(text) {
  const encrypted = encrypt.encrypt(text);
  return encrypted;
}

const RenderProducts = (props) => {
    const product = props.product;
    const productJsonObj = {
      product_id: product[0],
      product_name: product[1],
      product_brand: product[2],
      product_price: product[3],
      product_manufacturing_date: new Date(product[4] * 1000).toString(),
    };
    
    var productDetails = CreateEncryptedQRCode(JSON.stringify(productJsonObj, null, 2));    

    var imageUrl;
    QRCode.toDataURL(
      productDetails,
      function (err, url) {
        imageUrl = url;
        return url;
      }
    );
  
    return (
      <tr className="align-middle">
        <th scope="row" className="user-select-none">{product[0]}</th>
        <td className="user-select-none">{product[1]}</td>
        <td className="user-select-none">{product[2]}</td>
        <td className="user-select-none">{product[3]}</td>
        <td className="user-select-none">{new Date(product[4] * 1000).toString()}</td>
        <td >
          <a
            href={imageUrl}
            download={`${product[0]}-${product[1]}.jpg`}
          >
            <img src={imageUrl} alt="Qrcode" />
          </a>
          <div className="form-text text-wrap">Download QR Code by clicking on it!</div>
        </td>
      </tr>
    );
  };

  export default RenderProducts;
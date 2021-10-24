// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21;

contract ProductStorage {
  struct Product {
    uint product_id;
    string product_name;
    string product_brand;
    uint product_price;
    uint product_manufacturing_date;
  }

    event ProductCreated(
        uint product_id, 
        string product_name, 
        string product_brand,
        uint product_price,
        uint product_manufacturing_date
    );

  
  mapping (uint=>Product) Products;
  uint[] productIds;

    uint nextId;
    
    constructor() public{
      nextId = 0;
    }

  function createProduct(
    string memory product_name, 
    string memory product_brand,
    uint product_price
    ) public {
        nextId++;
    Products[nextId] = Product(nextId, product_name, product_brand, product_price, block.timestamp);
    productIds.push(nextId);
    emit ProductCreated(nextId, product_name, product_brand, product_price, block.timestamp);
  } 
  
  function getProductIds() public view returns (uint[] memory) {
        return (productIds);
    }

    function getProduct(uint product_id) 
        public 
        view 
        productExits(product_id)
        returns (
        uint,
        string memory,
        string memory,
        uint,
        uint
    ) 
    {
        return (
            product_id, 
            Products[product_id].product_name,
            Products[product_id].product_brand,
            Products[product_id].product_price,
            Products[product_id].product_manufacturing_date
        );
    }

    function getNewlyAddedProduct() 
        public 
        view 
        productExits(nextId)
        returns (
        uint,
        string memory,
        string memory,
        uint,
        uint
    ) {
      return (
        getProduct(nextId)
      );
    }

    modifier productExits(uint id) {
        if (Products[id].product_id == 0 ) {
            revert("Product Id Not Found");
        }
        _;
    }
}

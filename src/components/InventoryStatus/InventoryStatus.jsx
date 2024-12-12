import React from 'react';
import './InventoryStatus.scss';

const InventoryStatus = () => {
  const inventoryData = [
    { productName: 'Laptop', stock: 30, status: 'In Stock' },
    { productName: 'Smartphone', stock: 10, status: 'Low Stock' },
    { productName: 'Headphones', stock: 0, status: 'Out of Stock' },
  ];

  return (
    <div className="inventory-status">
      <h3>Inventory Status</h3>
      {/* <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Stock</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {inventoryData.map((item, index) => (
            <tr key={index}>
              <td>{item.productName}</td>
              <td>{item.stock}</td>
              <td>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </div>
  );
};

export default InventoryStatus;

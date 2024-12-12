import React from 'react';
import './CategoryPerformance.scss';

const CategoryPerformance = () => {
  const categoryData = [
    { name: 'Electronics', sales: 1500, performance: 'Good' },
    { name: 'Fashion', sales: 1200, performance: 'Average' },
    { name: 'Home Appliances', sales: 800, performance: 'Low' },
  ];

  return (
    <div className="category-performance">
      {/* <h3>Category Performance</h3>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Sales</th>
            <th>Performance</th>
          </tr>
        </thead>
        <tbody>
          {categoryData.map((category, index) => (
            <tr key={index}>
              <td>{category.name}</td>
              <td>{category.sales}</td>
              <td>{category.performance}</td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </div>
  );
};

export default CategoryPerformance;

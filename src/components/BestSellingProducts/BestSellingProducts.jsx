import React, { useEffect } from 'react';
import './BestSellingProducts.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBestSellingProducts } from '../../redux/slices/statisticSlice';

const BestSellingProducts = () => {
  const dispatch = useDispatch();
  const param = {
    limit: 10,
  };
  const { bestSellingProducts } = useSelector((state) => state.statistics);

  useEffect(() => {
    dispatch(fetchBestSellingProducts(param));
  }, [dispatch]);

  return (
    <div className="best-selling-products">
      <h3>Best Selling Products</h3>
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Quantity Sold</th>
          </tr>
        </thead>
        <tbody>
          {bestSellingProducts?.map((product, index) => (
            <tr key={index}>
              <td>
                <img
                  src={product?.image} // Assuming there's an imageUrl field
                  alt={product?.name}
                  width={50} // Adjust size as needed
                />
              </td>
              <td>{product?.name}</td>
              <td>{product?.quantitySold} sales</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BestSellingProducts;

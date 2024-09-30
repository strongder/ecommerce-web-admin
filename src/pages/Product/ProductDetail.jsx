import React, { useEffect } from "react";
import "./ProductDetail.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "../../redux/slices/productSlice";
import { Link, useParams } from "react-router-dom";

const ProductDetail = () => {
  const product = useSelector((state) => state.products.product);
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  console.log(product);
  return (
    <div className="product-detail-container">
      <h1>Product Detail</h1>
      {product && (
        <>
          <div className="product-info">
            <div className="product-images">
              {product.imageUrls &&
                product.imageUrls.map((image, index) => (
                  <img
                    key={index}
                    src={image.imageUrl}
                    alt={product.name}
                    className="product-image"
                  />
                ))}
            </div>

            <div className="product-details">
              <h2>{product.name}</h2>
              <p>
                <strong>Code:</strong> {product.id}
              </p>
              <p>
                <strong>Price:</strong>{" "}
                {product.price && product.price.toLocaleString()} VND
              </p>
              <p>
                <strong>Stock:</strong> {product.stock}
              </p>
              <p>
                <strong>Rating:</strong> {product.rating}
              </p>
              <p>
                <strong>Description:</strong> {product.description}
              </p>
              <p>
                <strong>CreateAt:</strong>{" "}
                {new Date(product.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          <h2 style={{ marginTop: "20px" }}>Variant Product</h2>
          <table className="variant-table">
            <thead>
              <tr>
                <th>ID</th>
                {product.varProducts &&
                  product.varProducts.length > 0 &&
                  Object.keys(product.varProducts[0].attribute).map(
                    (attrKey, index) => (
                      <th key={index}>
                        {attrKey.charAt(0).toUpperCase() + attrKey.slice(1)}
                      </th>
                    )
                  )}
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {product.varProducts &&
                product.varProducts.map((variant, index) => (
                  <tr key={index}>
                    <td>{variant.id}</td>
                    {variant.attribute &&
                      Object.values(variant.attribute).map((attrValue, idx) => (
                        <td key={idx}>{attrValue}</td>
                      ))}
                    <td>{variant.stock}</td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div className="btn-action">
            <Link to="/products">
              <button className="btn-cancel">Cancel</button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductDetail;
